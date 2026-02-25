// API Configuration
const API_BASE_URL = 'http://localhost:8081/api';

// Fetch and display notifications
async function loadNotifications() {
    try {
        const response = await fetch(`${API_BASE_URL}/notifications`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch notifications');
        }
        
        const notifications = await response.json();
        displayNotifications(notifications);
        
    } catch (error) {
        console.error('Error loading notifications:', error);
        showError('Failed to load notifications. Please try again later.');
    }
}

// Display notifications on the page
function displayNotifications(notifications) {
    const container = document.querySelector('.notices-container');
    
    if (!container) {
        console.error('Notices container not found');
        return;
    }
    
    // Clear existing notices (except pagination)
    const pagination = container.querySelector('.pagination');
    container.innerHTML = '';
    
    if (notifications.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; color: #6c757d;">No notifications available at the moment.</p>';
        return;
    }
    
    // Create notice cards
    notifications.forEach(notification => {
        const noticeCard = createNoticeCard(notification);
        container.appendChild(noticeCard);
    });
    
    // Re-add pagination if it existed
    if (pagination) {
        container.appendChild(pagination);
    }
}

// Create a single notice card
function createNoticeCard(notification) {
    const card = document.createElement('div');
    card.className = 'notice-item';
    
    // Add classes based on notification properties
    if (isNew(notification.notificationDate)) {
        card.classList.add('new');
    }
    
    // Format date
    const formattedDate = formatDate(notification.notificationDate);
    
    card.innerHTML = `
        <div class="notice-date">📅 Published: ${formattedDate}</div>
        <div>
            ${isNew(notification.notificationDate) ? '<span class="notice-badge badge-new">NEW</span>' : ''}
            ${notification.active ? '<span class="notice-badge badge-important">ACTIVE</span>' : ''}
        </div>
        <h3 class="notice-title">${escapeHtml(notification.title)}</h3>
        <p class="notice-description">
            ${escapeHtml(notification.description || 'No description available.')}
        </p>
        <div class="notice-actions">
            ${notification.link ? `<a href="${escapeHtml(notification.link)}" class="btn btn-primary" target="_blank">View Details</a>` : ''}
            <button class="btn btn-secondary" onclick="shareNotification(${notification.id})">Share</button>
        </div>
    `;
    
    return card;
}

// Check if notification is new (within last 7 days)
function isNew(dateString) {
    if (!dateString) return false;
    
    const notificationDate = new Date(dateString);
    const today = new Date();
    const daysDiff = Math.floor((today - notificationDate) / (1000 * 60 * 60 * 24));
    
    return daysDiff <= 7;
}

// Format date to readable string
function formatDate(dateString) {
    if (!dateString) return 'Date not available';
    
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    return date.toLocaleDateString('en-IN', options);
}

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Show error message
function showError(message) {
    const container = document.querySelector('.notices-container');
    if (container) {
        container.innerHTML = `
            <div style="background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
                <p style="color: #856404; margin: 0;"><strong>⚠️ ${message}</strong></p>
            </div>
        `;
    }
}

// Share notification function
function shareNotification(notificationId) {
    const url = `${window.location.origin}${window.location.pathname}?notification=${notificationId}`;
    
    if (navigator.share) {
        navigator.share({
            title: 'BSPHCL Notification',
            text: 'Check out this notification from BSPHCL',
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
}

// Filter notifications by category (for filter buttons)
function filterNotifications(category) {
    loadNotifications().then(() => {
        const allCards = document.querySelectorAll('.notice-item');
        
        allCards.forEach(card => {
            if (category === 'all') {
                card.style.display = 'block';
            } else {
                // This is a simple implementation
                // You might want to add category data attributes to cards
                card.style.display = 'block';
            }
        });
    });
}

// Initialize filter buttons
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter category from button text
            const category = this.textContent.toLowerCase().trim();
            filterNotifications(category);
        });
    });
}

// Load notifications when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading notifications from backend...');
    loadNotifications();
    initializeFilters();
    
    // Refresh notifications every 5 minutes
    setInterval(loadNotifications, 5 * 60 * 1000);
});
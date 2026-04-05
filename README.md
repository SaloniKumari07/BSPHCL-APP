# BSPHCL Website - Full Stack Web Application

A complete full-stack web application developed for Bihar State Power Holding Company Limited (BSPHCL), featuring a modern admin panel for content management.

![BSPHCL Website](https://via.placeholder.com/800x400/1e3a8a/ffffff?text=BSPHCL+Website)

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About

This project is a full-stack web application that replicates the Bihar State Power Holding Company Limited (BSPHCL) official website. It includes a comprehensive admin panel for managing notifications, notices, publications, and recruitment information dynamically.

## ✨ Features

- 🔐 **Admin Panel** - Secure dashboard for content management
- 📢 **Notifications Management** - Create, read, update, and delete notifications
- 📋 **Notice Board** - Manage official notices and announcements
- 📰 **Publications** - Handle company publications and documents
- 👥 **Recruitment Management** - Post and manage job openings
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Clean and professional user interface
- 📊 **Organizational Chart** - Visual representation of company hierarchy
- 🔄 **Real-time Updates** - Dynamic content loading without page refresh

## 💻 Tech Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Application framework
- **Spring Data JPA** - Data persistence
- **Hibernate** - ORM framework
- **H2 Database** - In-memory database (development)
- **MySQL** - Relational database (production)
- **Maven** - Build and dependency management

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling and layout
- **JavaScript (ES6+)** - Client-side scripting
- **Fetch API** - HTTP requests

### Tools & Others
- **VS Code** - IDE
- **Git** - Version control
- **Postman** - API testing
- **Live Server** - Development server

## 📁 Project Structure
bsphcl-project/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/bsphcl/
│   │       │   ├── model/              # Entity classes
│   │       │   │   ├── Notification.java
│   │       │   │   ├── Notice.java
│   │       │   │   ├── Publication.java
│   │       │   │   ├── Recruitment.java
│   │       │   │   └── User.java
│   │       │   ├── repository/         # JPA repositories
│   │       │   │   ├── NotificationRepository.java
│   │       │   │   ├── NoticeRepository.java
│   │       │   │   ├── PublicationRepository.java
│   │       │   │   ├── RecruitmentRepository.java
│   │       │   │   └── UserRepository.java
│   │       │   ├── service/            # Business logic
│   │       │   │   ├── NotificationService.java
│   │       │   │   ├── NoticeService.java
│   │       │   │   ├── PublicationService.java
│   │       │   │   └── RecruitmentService.java
│   │       │   ├── controller/         # REST controllers
│   │       │   │   ├── NotificationController.java
│   │       │   │   ├── NoticeController.java
│   │       │   │   ├── PublicationController.java
│   │       │   │   └── RecruitmentController.java
│   │       │   └── BsphclBackendApplication.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/
├── index.html                 # Home page
├── overview.html              # Company overview
├── notifications.html         # Notifications page
├── notice-board.html          # Notice board
├── publications.html          # Publications
├── recruitment.html           # Recruitment page
├── admin.html                 # Admin panel
├── css/
│   └── style.css              # Main stylesheet
└── js/
├── main.js                # Home page logic
├── notifications.js       # Notifications logic
└── admin.js               # Admin panel logic

## 🚀 Installation & Setup

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Git
- Any modern web browser

### Backend Setup

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/bsphcl-project.git
   cd bsphcl-project
```

2. **Navigate to backend directory**
```bash
   cd backend
```

3. **Install dependencies and run**
```bash
   mvn clean install
   mvn spring-boot:run
```

4. **Backend will start on:** `http://localhost:8081`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
   cd frontend
```

2. **Option 1 - Using Python**
```bash
   python -m http.server 8000
```

3. **Option 2 - Using VS Code Live Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"

4. **Frontend will be available at:** `http://localhost:8000` or `http://127.0.0.1:5500`

### Database Configuration

**Development (H2 - Default):**
```properties
spring.datasource.url=jdbc:h2:mem:bsphcldb
spring.datasource.username=sa
spring.datasource.password=
```

**Production (MySQL):**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bsphcl_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## 📖 Usage

### Accessing the Website

1. **Home Page:** `http://localhost:8000/index.html`
2. **Admin Panel:** `http://localhost:8000/admin.html`
3. **Notifications:** `http://localhost:8000/notifications.html`

### Adding Content via Admin Panel

1. Navigate to admin panel
2. Fill in the notification form:
   - **Title:** Your notification title
   - **Description:** Brief description
   - **Link:** Related document link
   - **Date:** Publication date
3. Click "Add Notification"
4. View added content on respective pages

## 🔌 API Endpoints

### Base URL: `http://localhost:8081/api`

#### Notifications
- `GET /notifications` - Get all notifications
- `GET /notifications/{id}` - Get notification by ID
- `POST /notifications` - Create new notification
- `PUT /notifications/{id}` - Update notification
- `DELETE /notifications/{id}` - Delete notification

#### Notices
- `GET /notices` - Get all notices
- `POST /notices` - Create new notice
- `PUT /notices/{id}` - Update notice
- `DELETE /notices/{id}` - Delete notice

#### Publications
- `GET /publications` - Get all publications
- `POST /publications` - Create new publication
- `PUT /publications/{id}` - Update publication
- `DELETE /publications/{id}` - Delete publication

#### Recruitments
- `GET /recruitments` - Get all recruitments
- `POST /recruitments` - Create new recruitment
- `PUT /recruitments/{id}` - Update recruitment
- `DELETE /recruitments/{id}` - Delete recruitment

### Example API Request
```javascript
// Create notification
fetch('http://localhost:8081/api/notifications', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'New Power Supply Update',
    description: '24x7 electricity supply',
    link: 'https://example.com',
    notificationDate: '2026-01-28T10:00:00',
    active: true
  })
});

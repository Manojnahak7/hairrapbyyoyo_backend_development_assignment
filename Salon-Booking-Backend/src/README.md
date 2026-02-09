# 💇 Salon Booking Application – Backend Developer Task

Backend Developer Assignment  
**Company:** Hair Rap by Yoyo

This project is developed as part of the **Backend Developer Task** to demonstrate real-world backend development skills using a Salon Booking flow. The UI design is provided only as a reference to understand user flow and data requirements.

---

## 📌 Project Title

Salon Booking Application

---

## 🎯 Objective

The objective of this task is to evaluate backend development skills by building:

- CRUD-based REST APIs
- Booking business logic
- Admin dashboard supported APIs
- Authentication & authorization
- Validation and error handling

---

## 🔁 Application Flow

Service Listing → Book Appointment → My Bookings → Admin Dashboard

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- Multer (Image Upload)

### Frontend (for API integration demo)

- React.js (Vite)
- Axios
- React Router

---

## 🗄 Database Design (Schema Explanation)

### User

- id
- name
- email
- password
- role (ADMIN / CUSTOMER)

### Service

- id
- name
- price
- duration
- location
- rating
- image

### Stylist

- id
- name
- specialization

### Booking

- id
- userId
- serviceId
- stylistId
- date
- time
- status

### Relationships

- User → hasMany → Bookings
- Service → hasMany → Bookings
- Stylist → hasMany → Bookings

---

## 🔐 Authentication

- JWT-based authentication
- Role-based access
  - ADMIN → Admin Dashboard
  - CUSTOMER → Booking & My Bookings
- Protected APIs using middleware

---

## 📦 REST API Endpoints

### Authentication

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register customer |
| POST   | /api/auth/login    | Login user/admin  |

### Services

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| GET    | /api/services           | Get all services       |
| GET    | /api/services/:id       | Get service by ID      |
| POST   | /api/admin/services     | Create service (Admin) |
| PUT    | /api/admin/services/:id | Update service         |
| DELETE | /api/admin/services/:id | Delete service         |

### Stylists

| Method | Endpoint      | Description      |
| ------ | ------------- | ---------------- |
| POST   | /api/stylists | Create stylist   |
| GET    | /api/stylists | Get all stylists |

### Users

| Method | Endpoint      | Description            |
| ------ | ------------- | ---------------------- |
| GET    | /api/users    | Get all users          |
| GET    | /api/users/me | Logged-in user profile |

### Bookings

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| POST   | /api/bookings            | Create booking        |
| GET    | /api/bookings?userId=1   | User bookings         |
| GET    | /api/bookings/my         | My bookings           |
| PUT    | /api/bookings/:id/status | Update booking status |
| DELETE | /api/bookings/:id        | Cancel booking        |

---

## 📜 Business Rules

- Prevent double booking for same stylist, date & time
- Default booking status is CONFIRMED
- Required field validation
- Proper HTTP status codes
- Centralized error handling middleware

---

## 📄 Sample API Request

### Create Booking

```json
POST /api/bookings
{
  "userId": 1,
  "serviceId": 2,
  "stylistId": 1,
  "date": "2026-02-10",
  "time": "11:00"
}


## Response
```

{
"success": true,
"message": "Booking confirmed"
}

## How to Run the Project

Prerequisites

Node.js (v18+)

MySQL

Git

## Clone Repository

git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

## Install Dependencies

npm install

## Create .env File

DB_NAME=salon_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret

## Create Database

CREATE DATABASE salon_db;

## Start Server

npm run dev

## Server Output

Server running on port 5000
MySQL Connected Successfully
All Tables Synced

## Backend URL:

http://localhost:5000

## 📸 Screenshots (UI Reference)

### 🔹 Services Listing

![Services Listing](screenshots/servicespage.png)

### 🔹 Booking Page

![Booking Page](screenshots/userbookingpage.png)

### 🔹 User Dashboard

![User Dashboard](screenshots/userdashboard.png)

### 🔹 Admin Dashboard

![Admin Dashboard](screenshots/admindashboard.png)

### 🔹 Ai Chatbot

![Ai Chatbot](screenshots/aichatbot.png)

### 🔹 Add Service (Admin)

![Add Service](screenshots/addservice.png)

### 🔹 Register Page

![Register Page](screenshots/registerpage.png)

### 🔹 Login Page

![Login Page](screenshots/loginpage.png)

### 🔹 Edit Service (Admin)

![Admin Edit Service](screenshots/admineditservice.png)

## 🎥 Demo Video

### ▶️ Application Demo Video:

▶️ [Watch Demo Video](https://drive.google.com/file/d/1_YQ1AmZd98qIHcEctB9UrtLIBPmuHzJs/view?usp=drive_link)

📁 Deliverables

Source Code (GitHub Repository)

REST APIs (CRUD)

Database schema explanation

Business logic

API documentation

Screenshots

Demo video

👨‍💻 Developer

Name: Manoj Nahak
Role: Backend Developer

🏁 Conclusion

This project demonstrates a real-world backend implementation of a Salon Booking Application with clean REST APIs, booking business logic, authentication, and admin dashboard support. The system is scalable and production-ready.

Thank you for the opportunity.

# Volunteer Management System

A web-based API built with Node.js and MongoDB that allows organizations to manage volunteer events, track signups, and collect feedback from participants.

## Live Deployment Link

https://cse341-final-project-volunteer-mgmt-p4er.onrender.com/


### API Documentation
- [Swagger UI Docs]     (https://cse341-final-project-volunteer-mgmt-9qgz.onrender.com/api-docs)

### Quick Links
render.com
- [Login with GitHub]   (https://cse341-final-project-volunteer-mgmt-9qgz.onrender.com/auth/github)
- [Logout]              (https://cse341-final-project-volunteer-mgmt-9qgz.onrender.com/auth/logout)

### User Features
- [View Users]          (https://cse341-final-project-volunteer-mgmt-9qgz.onrender.com/users) _(Modifications Protected)_
- [View Events]         (https://cse341-final-project-volunteer-mgmt-9qgz.onrender.com/events) _(Modifications Protected)_
- [View Volunteers]     (https://cse341-final-project-volunteer-mgmt-9qgz.onrender.com/volunteers) _(Modifications Protected)_
- [View Feedback]       (https://cse341-final-project-volunteer-mgmt-9qgz.onrender.com/feedback) _(Modifications Protected)_



## 🌟 Features

- OAuth login using GitHub
- Secure user registration and role-based access
- Create, read, update, and delete volunteer events
- Track volunteer signups for events
- Leave feedback for completed events
- RESTful API with Swagger documentation
- MongoDB with Mongoose ODM
- MVC architecture for clean code organization

## 🗂️ Project Structure
volunteer-management-system/
│
├── controllers/ # Business logic
├── models/ # Mongoose schemas
├── routes/ # API endpoints
├── middleware/ # Authentication, error handling
├── database/ # MongoDB connection
├── config/ # OAuth and environment settings
├── tests/ # Unit tests
│
├── .env # Environment variables
├── .gitignore
├── package.json
├── server.js


## 🧠 Collections in MongoDB

- **users** – name, email, role, passwordHash, location, phone, availability
- **events** – title, date, location, description, capacity, organizerId, tags
- **volunteers** – userId, eventId, registrationDate, status
- **feedback** – eventId, userId, rating, comment, date

## 🔐 Authentication

This API uses GitHub OAuth via Passport.js to authenticate users. Access tokens are used to manage session state and user roles.

## 🚀 Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas account
- GitHub OAuth App credentials

### Installation
git clone https://github.com/YOUR_USERNAME/volunteer-management-system.git
cd volunteer-management-system
npm install

## Contributors

This project has been enhanced by the contributions of the following individuals:
- ErikBurton
- ttrampp
- jakepreciado
- Ericevijay12 (Added professional input and support)

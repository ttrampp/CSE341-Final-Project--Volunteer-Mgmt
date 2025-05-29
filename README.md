# Volunteer Management System

A web-based API built with Node.js and MongoDB that allows organizations to manage volunteer events, track signups, and collect feedback from participants.

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

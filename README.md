# 🚗 Vehicle Rental Management System (Backend)

A complete backend API for managing vehicles, bookings, users, and role-based access control.  
Built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **JWT Authentication**.

---

## 🌐 Live Deployment

🔗 **API Base URL:** https://vehicle-rental-system.vercel.app

---

## 🎯 Features

### 👤 **User Management**

- User registration & login
- JWT-based authentication
- Role-based access (`admin`, `customer`)
- Admin can manage users

### 🚘 **Vehicle Management**

- Add, update & delete vehicles (Admin only)
- Vehicles have type, rent price, status, registration number
- Availability tracking: `available` / `booked`

### 📅 **Booking System**

- Customers can book vehicles
- Validates availability
- Calculates total price
- Updates vehicle status automatically
- Customer can cancel before start date
- Admin can mark booking as returned
- System logic prevents invalid actions

### 🔐 **Security**

- Encrypted passwords
- Protected routes using JWT
- Role-based middleware for authorization

---

## 🛠️ Technology Stack

| Layer          | Technology         |
| -------------- | ------------------ |
| Language       | TypeScript         |
| Runtime        | Node.js            |
| Framework      | Express.js         |
| Database       | PostgreSQL         |
| Auth           | JWT                |
| ORM / Querying | pg (node-postgres) |
| Deployment     | Vercel             |

---

## Setup & Usage Instructions

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ **Install Dependencies**

```
npm install
```

### 3️⃣ **Environment Variables**

```
CONNECTION_STR=postgresql://neondb_owner:npg_TpfNinJ9G6sI@ep-curly-rain-a8awigx6-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require
PORT=5000
JWT_SECRET="KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
```

### 4️⃣ **Run the Server**

```
npm run dev
```

### 5️⃣ **API Base URL**

```
http://localhost:5000/api/v1
```

---

## 📦 GitHub Repository

🔗 https://github.com/atikur28/level-2-assignment-02
your-repo-name

---

## 🌐 Live Deployment

🔗 https://vehicle-rental-system.vercel.app

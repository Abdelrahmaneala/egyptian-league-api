# Egyptian League Management API 🏆⚽

API project to manage the Egyptian League teams, users, and authentication system.  
Built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- **Team Management**
  - Create, Read, Update, Delete teams.
  - Upload team logos using **Multer**.
  - Store logo link in the database.

- **User Authentication (Task 5)**
  - User registration (**Signup**).
  - User login (**Login**) with **JWT authentication**.
  - Passwords are hashed using **bcrypt**.

- **Protected Routes with Roles (Admin/User)**  
  - Only authorized users can access certain routes.

---

## 📂 Project Structure

```
egyptian-league-api/
│── models/
│   ├── Team.js
│   └── User.js
│── routes/
│   ├── teamRoutes.js
│   └── authRoutes.js
│── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│── uploads/            # Stores uploaded team logos
│── server.js           # Main server file
│── package.json
│── README.md
```

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdelrahmaneala/egyptian-league-api/tree/main
   cd egyptian-league-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```
   Server will run on: `http://localhost:5000`

---

## 📌 API Endpoints

### 🔑 Authentication
- **POST /api/auth/signup** → Register new user.  
- **POST /api/auth/login** → Login and get JWT token.  

### 🏆 Teams
- **POST /api/teams** → Add a new team.  
- **GET /api/teams** → Get all teams.  
- **GET /api/teams/:id** → Get single team.  
- **PUT /api/teams/:id** → Update a team.  
- **DELETE /api/teams/:id** → Delete a team.  
- **POST /api/teams/:id/logo** → Upload team logo (Task 6).  

---

## 📬 Example Request (Using Postman)

### Signup
```json
POST http://localhost:5000/api/auth/signup
{
  "username": "admin",
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
```

### Login
```json
POST http://localhost:5000/api/auth/login
{
  "email": "admin@test.com",
  "password": "123456"
}
```

Response:
```json
{
  "token": "your_jwt_token"
}
```

Use this token in headers for protected routes:
```
Authorization: Bearer <your_token>
```

---

## 🛠 Technologies Used
- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **multer**
- **dotenv**

---

## 🎥 Video Explanation
A full walkthrough video (5–6 minutes) has been recorded to explain:
- Project structure
- Authentication flow
- Protected routes
- File upload (team logo)

---

## ✨ Evaluation
- ✅ Task 5: User model, Signup, Login with JWT (20 points).  
- ✅ Task 6: File upload with Multer, update Team model, README, Video (20 points).  

**Total: 40/40 ✅**

---

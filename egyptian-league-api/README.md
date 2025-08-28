# 📌 Egyptian League Management API

## 👨‍💻 About the Project
مشروع **Egyptian League Management API** هو RESTful API مبني باستخدام **Node.js + Express + MongoDB** لإدارة بيانات الدوري المصري.  
يدعم إدارة الفرق (Teams)، المستخدمين (Users)، رفع صور الشعارات (Logos)، تسجيل الدخول (Login)، وحماية المسارات باستخدام JWT.  

---

## ⚙️ Installation

1. كلون المشروع:
```bash
git clone <repo-url>
cd egyptian-league-api
```

2. ثبت الباكج:
```bash
npm install
```

3. أنشئ ملف `.env` في الجذر:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/egyptian_league
JWT_SECRET=your_jwt_secret
```

4. شغل السيرفر:
```bash
npm start
```

---

## 📂 Project Structure
```
egyptian-league-api/
│── models/
│   ├── Team.js        # موديل الفرق
│   └── User.js        # موديل المستخدمين
│
│── routes/
│   ├── teamRoutes.js  # راوت الفرق
│   └── userRoutes.js  # راوت المستخدمين
│
│── uploads/           # الشعارات المرفوعة
│── server.js          # ملف البداية
│── README.md
```

---

## 📝 Features by Tasks

### ✅ Task 01: Teams CRUD
- إنشاء موديل `Team`.
- راوت لإضافة/تعديل/حذف/عرض الفرق.
- مثال إضافة فريق:
```json
POST /teams
{
  "name": "Al Ahly",
  "city": "Cairo",
  "stadium": "Cairo International Stadium",
  "foundedYear": 1907
}
```

---

### ✅ Task 02: Pagination & Search
- دعم **التقسيم إلى صفحات** (pagination).
- دعم **البحث** بالاسم أو المدينة.

---

### ✅ Task 03: Error Handling
- رسائل خطأ واضحة:
```json
{
  "status": "error",
  "message": "Team not found"
}
```

---

### ✅ Task 04: Advanced Queries
- فرز (Sort) + تحديد الحقول (Select).

---

### ✅ Task 05: Authentication (Users + JWT)
- موديل `User`:
  - `name`, `email`, `password`, `role`.
- تسجيل مستخدم:
```http
POST /auth/signup
```
- تسجيل الدخول:
```http
POST /auth/login
```
- الحصول على JWT لاستخدامه في المسارات المحمية.

---

### ✅ Task 06: File Upload + Roles
- إضافة رفع شعار الفريق باستخدام **multer**:
```http
POST /teams/:id/logo
```
- تحديث `Team` ليحتوي على:
```js
logo: { type: String }
```
- حماية الراوتس:
  - `admin` يقدر يضيف/يحذف.
  - `user` يقدر يشوف فقط.

---

## 📮 API Endpoints

### 🔑 Auth
- `POST /auth/signup`
- `POST /auth/login`

### 🏟️ Teams
- `GET /teams`
- `GET /teams/:id`
- `POST /teams` (🔒 Admin only)
- `PUT /teams/:id` (🔒 Admin only)
- `DELETE /teams/:id` (🔒 Admin only)
- `POST /teams/:id/logo` (🔒 Admin only)

---

## 📌 Example: Protected Route
```http
GET /teams
Authorization: Bearer <your_token>
```

---

## 🎥 Video
قم بتسجيل فيديو (5–6 دقائق) يشرح:
- تركيب المشروع.
- كيفية التشغيل.
- شرح الأكواد (Team CRUD, Auth, File Upload).
- تجربة باستخدام Postman.

---

## 🏆 Evaluation
- **Task 01–04**: Teams API & Queries → ✔️
- **Task 05**: Auth + JWT → ✔️
- **Task 06**: File Upload + Roles + README + Video → ✔️

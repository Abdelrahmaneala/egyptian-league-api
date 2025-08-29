# Egyptian League Management API

RESTful API to manage Egyptian League football teams and matches.

## Features

- CRUD operations for Teams (Create, Read, Update, Delete)
- Upload team logos
- CRUD operations for Matches
- User authentication (Register & Login) using JWT
- Pagination for Teams and Matches
- All responses in JSend format
- Proper error handling

## Tech Stack

Node.js, Express, MongoDB, Mongoose, JWT, Multer, CORS

## Installation

1. Clone repository:
   git clone <repo-url>
2. Install dependencies:
   npm install
3. Create `.env` file with:
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
4. Start server:
   node server.js

Server runs at `http://localhost:5000`

## Notes

- Use ObjectId of Teams when creating Matches
- Uploaded logos are stored in `uploads/` folder
- Pagination defaults: page=1, limit=10

## Author

AbdUlrahman Elsayed

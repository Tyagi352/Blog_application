# MERN Blog Backend

Express.js backend for the MERN blog application with MongoDB, JWT authentication, and blog CRUD operations.

## Quick Start

1. Install dependencies:
```powershell
npm install
```

2. Create `.env` file with:
```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/blog_db
PORT=8000
JWT_SECRET_KEY=your_secret_key
```

3. Start the server:
```powershell
npm run dev
```

Server runs on `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register
- `POST /api/v1/user/login` - Login
- `GET /api/v1/user/logout` - Logout

### Blogs (Public)
- `GET /api/v1/blog?page=1&limit=6` - List blogs
- `GET /api/v1/blog/:id` - Get blog

### Blogs (Protected)
- `POST /api/v1/blog` - Create blog
- `PUT /api/v1/blog/:id` - Update blog
- `DELETE /api/v1/blog/:id` - Delete blog

## Environment Variables

```
MONGO_URI=MongoDB connection string (Atlas or local)
PORT=8000
JWT_SECRET_KEY=Secret key for JWT signing
CLOUDINARY_URL=Optional for image uploads (not required)
```

## Technologies

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)
- CORS

## Middleware

- `authenticate` - Verifies JWT token from header or cookie

## Development

```powershell
npm run dev    # Start with nodemon
npm run start  # Production start
```

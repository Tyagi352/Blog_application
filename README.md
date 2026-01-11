# MERN Stack Blog Application

A complete, modern blog application built with the MERN stack (MongoDB, Express, React, Node.js) featuring JWT authentication, infinite scrolling, and a clean white/black theme with light/dark mode support.

## Features

✅ **User Authentication** - JWT-based registration and login  
✅ **Create, Edit, Delete Blogs** - Full CRUD operations  
✅ **Infinite Scrolling** - Seamless blog loading as you scroll  
✅ **Responsive Design** - Works perfectly on desktop and mobile  
✅ **Theme Toggle** - Switch between light and dark modes  
✅ **User Profile** - Display logged-in user's name with dropdown menu  
✅ **Image Upload** - Add cover images to blogs  
✅ **Minimal UI** - Clean, modern design with white and black colors only  
✅ **Toast Notifications** - User feedback for all actions  

## Project Structure

```
Blog/
├── Backend/
│   ├── index.js
│   ├── package.json
│   ├── .env
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── blog.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── blog.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── blog.route.js
│   │   └── user.route.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   └── utils/
│       └── cloudinary.js
│
└── Frontend/
    ├── index.html
    ├── package.json
    ├── .env
    ├── vite.config.js
    ├── tailwind.config.cjs
    ├── postcss.config.cjs
    └── src/
        ├── main.jsx
        ├── index.css
        ├── App.jsx
        ├── utils/
        │   └── api.js
        └── pages/
            ├── Home.jsx
            ├── Blogs.jsx
            ├── About.jsx
            ├── Login.jsx
            ├── Register.jsx
            └── CreateBlog.jsx
```

## Prerequisites

- Node.js v16+ and npm
- MongoDB (local or Atlas URI)
- Git (optional)

## Backend Setup

1. Navigate to the Backend folder:
```powershell
cd Backend
```

2. Install dependencies:
```powershell
npm install
```

3. Create or verify `.env` file with:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db?appName=Cluster0
PORT=8000
JWT_SECRET_KEY=your_secret_key_here
```

4. Start the backend server:
```powershell
npm run dev
```

The backend will run on `http://localhost:8000`

## Frontend Setup

1. Open a new terminal and navigate to the Frontend folder:
```powershell
cd Frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Verify `.env` file contains:
```
VITE_API_URL=http://localhost:8000/api/v1
```

4. Start the frontend dev server:
```powershell
npm run dev
```

The frontend will run on `http://localhost:5173`

## Running Both Servers

### Option 1: Separate Terminal Windows (Recommended)

**Terminal 1 (Backend):**
```powershell
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**
```powershell
cd Frontend
npm run dev
```

### Option 2: Using npm-run-all (if installed)

In root directory:
```powershell
npm install -g npm-run-all
npm-run-all --parallel "npm run dev -C Backend" "npm run dev -C Frontend"
```

## API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/logout` - Logout user

### Blogs (Public)
- `GET /api/v1/blog` - Get all blogs (with pagination)
- `GET /api/v1/blog/:id` - Get single blog

### Blogs (Protected - requires JWT token)
- `POST /api/v1/blog` - Create new blog
- `PUT /api/v1/blog/:id` - Update blog
- `DELETE /api/v1/blog/:id` - Delete blog

## Usage

1. **Register**: Click "Register" in the header and create an account with first name, last name, email, and password
2. **Login**: Enter your credentials to log in
3. **View Blogs**: Click "Blogs" to see all blogs with infinite scrolling
4. **Create Blog**: Click your name dropdown and select "Create Blog" to write a new blog with a title, content, and optional cover image
5. **Theme**: Toggle between light and dark modes using the theme button in the header
6. **Logout**: Click your name in the header and select "Logout"

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database (with Mongoose ODM)
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
- **Cookie-parser** - Cookie handling

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Infinite Scroll** - Infinite scrolling
- **React Toastify** - Toast notifications

## Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_uri
PORT=8000
JWT_SECRET_KEY=your_secret_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000/api/v1
```

## Notes

- Images are stored as base64 or URLs in the database. For production, consider using Cloudinary or similar services.
- JWT tokens expire after 7 days
- CORS is configured to allow `http://localhost:5173`
- The frontend stores user info and token in localStorage
- All API responses are properly error-handled with toast notifications

## Troubleshooting

### Port 8000/5173 already in use
Change the port in `.env` (Backend) or `vite.config.js` (Frontend)

### CORS errors
Verify CORS origin in `Backend/index.js` matches your frontend URL

### MongoDB connection errors
Check your `MONGO_URI` in `.env` and ensure your IP is whitelisted in MongoDB Atlas

### Infinite scroll not working
Ensure the backend returns `hasMore` flag in the response. Check browser console for API errors.

## Production Build

### Backend
```powershell
npm run start
```

### Frontend
```powershell
npm run build
npm run preview
```

## License

MIT

## Support

For issues or questions, check the error messages in the browser console and server logs.

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

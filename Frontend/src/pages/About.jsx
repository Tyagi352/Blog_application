import React from 'react'

export default function About(){
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">About This Blog</h1>
      <div className="space-y-4">
        <p className="text-lg">
          Welcome to our MERN Stack Blog Application. This is a modern, user-friendly blogging platform built with the latest web technologies.
        </p>
        <h2 className="text-2xl font-bold">Features</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>User authentication with JWT tokens</li>
          <li>Create, edit, and delete your own blogs</li>
          <li>View all blogs with infinite scrolling</li>
          <li>Each blog displays author name and featured image</li>
          <li>Light and dark theme support</li>
          <li>Responsive design for mobile and desktop</li>
          <li>Clean, minimal white and black design</li>
        </ul>
        <h2 className="text-2xl font-bold">Technology Stack</h2>
        <p>
          <strong>Backend:</strong> Node.js, Express, MongoDB, JWT Authentication<br/>
          <strong>Frontend:</strong> React, Tailwind CSS, Vite<br/>
          <strong>Features:</strong> Infinite scroll, theme toggle, responsive UI
        </p>
      </div>
    </div>
  )
}

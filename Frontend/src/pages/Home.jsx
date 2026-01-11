import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Share your thoughts, stories, and ideas with the world
        </p>
        
        <div className="flex justify-center gap-4">
          <Link to="/blogs" className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 dark:hover:bg-gray-700">
            📖 Read Blogs
          </Link>
          {user ? (
            <Link to="/create" className="px-6 py-3 border-2 border-black rounded hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
              ✍️ Write Blog
            </Link>
          ) : (
            <Link to="/register" className="px-6 py-3 border-2 border-black rounded hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black">
              🚀 Get Started
            </Link>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="border rounded-lg p-6 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-2">🔐 Secure</h3>
          <p className="text-gray-600 dark:text-gray-400">JWT-based authentication keeps your account safe</p>
        </div>
        <div className="border rounded-lg p-6 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-2">∞ Infinite</h3>
          <p className="text-gray-600 dark:text-gray-400">Seamless infinite scroll to explore endless content</p>
        </div>
        <div className="border rounded-lg p-6 dark:border-gray-700">
          <h3 className="text-2xl font-bold mb-2">🎨 Minimal</h3>
          <p className="text-gray-600 dark:text-gray-400">Clean, modern design with light and dark modes</p>
        </div>
      </div>
    </div>
  )
}

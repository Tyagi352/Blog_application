import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateBlog from './pages/CreateBlog'
import About from './pages/About'
import BlogDetail from './pages/BlogDetail'
import EditBlog from './pages/EditBlog'
import { ToastContainer } from 'react-toastify'
import GlobalSpinner from './components/GlobalSpinner'

function Header({user, dark, setDark, onLogout}){
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <header className="w-full border-b py-4 px-6 flex items-center justify-between bg-white text-black dark:bg-black dark:text-white">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold">📝 Blog</Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:font-semibold">Home</Link>
          <Link to="/blogs" className="hover:font-semibold">Blogs</Link>
          <Link to="/about" className="hover:font-semibold">About</Link>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={()=>setDark(d=>!d)} 
          className="px-3 py-1 border rounded hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {dark? '☀️ Light':'🌙 Dark'}
        </button>
        
        {user ? (
          <div className="relative">
            <button 
              onClick={()=>setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center space-x-1"
            >
              <span>{user.firstName} {user.lastName}</span>
              <span>▼</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black border shadow-lg dark:bg-gray-900 dark:text-white dark:border-gray-700 z-10">
                <Link to="/create" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 border-b">
                  ✍️ Create Blog
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-2">
            <Link to="/login" className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-900">Login</Link>
            <Link to="/register" className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-900">Register</Link>
          </div>
        )}
      </div>
    </header>
  )
}

function App(){
  const [user, setUser] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem('user')) }catch(e){return null}
  })
  const [dark, setDark] = useState(()=> localStorage.getItem('theme') === 'dark')
  const location = useLocation()

  useEffect(()=>{
    if(dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  },[dark])

  const onLogout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  return (
    <div className={`app-container min-h-screen bg-white text-black ${dark ? 'dark bg-black text-white' : ''}`}>
      {!isAuthPage && <Header user={user} dark={dark} setDark={setDark} onLogout={onLogout} />}
      <GlobalSpinner />

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/blog/:id" element={<BlogDetail/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login onLogin={setUser}/>} />
          <Route path="/register" element={<Register onRegister={setUser}/>} />
          <Route path="/create" element={user ? <CreateBlog/> : <Login onLogin={setUser}/>} />
          <Route path="/edit/:id" element={user ? <EditBlog/> : <Login onLogin={setUser}/>} />
        </Routes>
      </main>

      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default App

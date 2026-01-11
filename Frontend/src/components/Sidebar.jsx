import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import api from '../utils/api'
import { toast } from 'react-toastify'

export default function Sidebar({ currentBlogId }){
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const navigate = useNavigate()

  const location = useLocation()

  const onLogout = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleDelete = async ()=>{
    if(!currentBlogId) return
    if(!window.confirm('Delete this blog?')) return
    try{
      await api.delete(`/blog/${currentBlogId}`)
      toast.success('Blog deleted')
      // notify any listeners (e.g., Blogs page) so they can refresh in-place
      window.dispatchEvent(new CustomEvent('blogDeleted', { detail: { id: currentBlogId } }))
      // navigate to blogs only if not already there
      if (location.pathname !== '/blogs') navigate('/blogs')
    }catch(e){
      toast.error(e?.response?.data?.message || 'Delete failed')
    }
  }

  return (
    <div className="border p-4 rounded-md sticky top-20 dark:border-gray-700">
      <div className="mb-4">
        <h3 className="font-bold mb-2">Actions</h3>
        <Link to="/create" className="block px-3 py-2 border rounded mb-2">Create Blog</Link>
        {currentBlogId && (
          <>
            <Link to={`/edit/${currentBlogId}`} className="block px-3 py-2 border rounded mb-2">Edit Blog</Link>
            <button onClick={handleDelete} className="w-full px-3 py-2 border rounded mb-2 text-red-600">Delete Blog</button>
          </>
        )}
      </div>

      <div>
        <h3 className="font-bold mb-2">Settings</h3>
        <div className="flex flex-col gap-2">
          <button onClick={onLogout} className="px-3 py-2 border rounded text-left">Logout</button>
        </div>
      </div>
    </div>
  )
}

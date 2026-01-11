import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../utils/api'
import { toast } from 'react-toastify'
import Sidebar from '../components/Sidebar'

export default function BlogDetail(){
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  useEffect(()=>{
    const fetch = async ()=>{
      setLoading(true)
      try{
        const res = await api.get(`/blog/${id}`)
        setBlog(res.data)
      }catch(e){
        toast.error('Failed to load blog')
      }finally{
        setLoading(false)
      }
    }
    fetch()
  },[id])

  const handleDelete = async ()=>{
    if(!window.confirm('Delete this blog?')) return
    try{
      await api.delete(`/blog/${id}`)
      toast.success('Blog deleted')
      navigate('/blogs')
    }catch(e){
      toast.error(e?.response?.data?.message || 'Delete failed')
    }
  }

  if(loading) return <div className="text-center py-12">Loading...</div>
  if(!blog) return <div className="text-center py-12">No blog found</div>

  const isAuthor = user && blog.author && (user.id === blog.author._id || user.id === blog.author)

  return (
    <div className="max-w-4xl mx-auto md:flex md:gap-8">
      <div className="flex-1">
        {blog.image && <img src={blog.image} alt="cover" className="w-full h-64 object-cover rounded mb-4" />}
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">By {blog.author?.firstName} {blog.author?.lastName} • {new Date(blog.createdAt).toLocaleString()}</p>
        <div className="prose dark:prose-invert">
          <p>{blog.content}</p>
        </div>
        {isAuthor && (
          <div className="flex gap-3 mt-6">
            <Link to={`/edit/${id}`} className="px-4 py-2 border rounded">Edit</Link>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
          </div>
        )}
      </div>

      <aside className="w-72 mt-6 md:mt-0">
        <Sidebar currentBlogId={id} />
      </aside>
    </div>
  )
}

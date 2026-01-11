import React, { useState } from 'react'
import api from '../utils/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CreateBlog(){
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(file){
      const reader = new FileReader()
      reader.onload = (event) => setImage(event.target.result)
      reader.readAsDataURL(file)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(!token){
      toast.error('You must be logged in to create a blog')
      navigate('/login')
      return
    }
    if(!title || !content){
      toast.error('Title and content are required')
      return
    }
    setLoading(true)
    try{
      const res = await api.post('/blog', { title, content, image })
      const created = res.data.blog || null
      toast.success('Blog created successfully')
      // notify other pages (prepend to list)
      if(created) window.dispatchEvent(new CustomEvent('blogCreated', { detail: { blog: created } }))
      navigate('/blogs')
    }catch(e){
      const status = e?.response?.status
      if(status === 401){
        toast.error('Not authenticated — please log in')
        navigate('/login')
      }else{
        toast.error(e?.response?.data?.message || 'Failed to create blog')
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Create New Blog</h2>
      <form onSubmit={submit} className="space-y-4 border p-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input 
            className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Blog title"
            value={title}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <textarea 
            className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black h-40"
            placeholder="Write your blog content here..."
            value={content}
            onChange={e=>setContent(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Cover Image</label>
          <input 
            type="file"
            accept="image/*"
            className="w-full border px-3 py-2"
            onChange={handleImageChange}
          />
          {image && <img src={image} alt="preview" className="mt-3 h-40 object-cover" />}
        </div>
        <button 
          className="w-full bg-black text-white py-2 font-semibold hover:bg-gray-800 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>
    </div>
  )
}

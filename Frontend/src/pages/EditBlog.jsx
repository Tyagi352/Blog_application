import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function EditBlog(){
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const fetch = async ()=>{
      try{
        const res = await api.get(`/blog/${id}`)
        const b = res.data
        setTitle(b.title)
        setContent(b.content)
        setImage(b.image || '')
      }catch(e){
        toast.error('Failed to load blog')
      }
    }
    fetch()
  },[id])

  const handleImageChange = (e)=>{
    const file = e.target.files[0]
    if(file){
      const reader = new FileReader()
      reader.onload = (ev)=> setImage(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  const submit = async (e)=>{
    e.preventDefault()
    const token = localStorage.getItem('token')
    if(!token){
      toast.error('You must be logged in to edit a blog')
      navigate('/login')
      return
    }
    if(!title || !content){
      toast.error('Title and content required')
      return
    }
    setLoading(true)
    try{
      const res = await api.put(`/blog/${id}`, { title, content, image })
      const updated = res.data.blog || null
      toast.success('Blog updated')
      if(updated) window.dispatchEvent(new CustomEvent('blogUpdated', { detail: { blog: updated } }))
      navigate(`/blogs`)
    }catch(e){
      const status = e?.response?.status
      if(status === 401){
        toast.error('Not authenticated — please log in')
        navigate('/login')
      } else {
        toast.error(e?.response?.data?.message || 'Update failed')
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Edit Blog</h2>
      <form onSubmit={submit} className="space-y-4 border p-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Title</label>
          <input className="w-full border px-3 py-2" value={title} onChange={e=>setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Content</label>
          <textarea className="w-full border px-3 py-2 h-40" value={content} onChange={e=>setContent(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="preview" className="mt-3 h-40 object-cover" />}
        </div>
        <button className="w-full bg-black text-white py-2" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  )
}

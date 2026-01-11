import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'

function BlogCard({b}){
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow p-4 mb-4 dark:border-gray-700">
      {b.image && <img src={b.image} alt="cover" className="w-full h-48 object-cover rounded mb-3" />}
      <h2 className="text-xl font-bold mb-1">{b.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        By <span className="font-semibold">{b.author?.firstName} {b.author?.lastName}</span>
      </p>
      <p className="text-sm line-clamp-3">{b.content}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{new Date(b.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default function Blogs(){
  const [blogs, setBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  // fetch page (p). If not provided, use current `page` state
  const fetchBlogs = async (p = page)=>{
    if(loading) return
    setLoading(true)
    try{
      const res = await api.get(`/blog?page=${p}&limit=6`)
      const newBlogs = res.data.blogs || []
      // if loading first page, replace; otherwise append
      if(p === 1) setBlogs(newBlogs)
      else setBlogs(prev=>[...prev, ...newBlogs])
      setHasMore(res.data.hasMore)
      setPage(p+1)
    }catch(e){
      console.error(e)
      toast.error('Failed to load blogs')
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ 
    fetchBlogs(1)

    const onDeleted = (e) => {
      // reset and reload first page when a blog is deleted elsewhere
      setBlogs([])
      setPage(1)
      setHasMore(true)
      fetchBlogs(1)
    }

    const onCreated = (e) => {
      const created = e?.detail?.blog
      if(created){
        // prepend created blog to current list
        setBlogs(prev=> [created, ...prev])
      }
    }

    const onUpdated = (e) => {
      const updated = e?.detail?.blog
      if(updated){
        setBlogs(prev => prev.map(b => (b._id === updated._id ? updated : b)))
      }
    }

    window.addEventListener('blogDeleted', onDeleted)
    window.addEventListener('blogCreated', onCreated)
    window.addEventListener('blogUpdated', onUpdated)
    return ()=>{
      window.removeEventListener('blogDeleted', onDeleted)
      window.removeEventListener('blogCreated', onCreated)
      window.removeEventListener('blogUpdated', onUpdated)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <InfiniteScroll 
        dataLength={blogs.length} 
        next={fetchBlogs} 
        hasMore={hasMore} 
        loader={<div className="text-center py-4"><div className="inline-block animate-spin">⏳</div> Loading more...</div>}
        endMessage={blogs.length > 0 ? <p className="text-center py-4 text-gray-600">No more blogs to load</p> : null}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs.map(b=> (
            <div key={b._id}>
              <BlogCard b={b} />
              <div className="text-right mt-1">
                <a href={`/blog/${b._id}`} className="text-sm underline">Read more</a>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
      {blogs.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">No blogs found. Start creating one!</p>
        </div>
      )}
    </div>
  )
}

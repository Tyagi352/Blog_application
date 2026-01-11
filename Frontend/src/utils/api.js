import axios from 'axios'

const base = (import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: base,
  withCredentials: true,
})

api.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  // global loading counter: increment and dispatch event
  try{
    if(typeof window !== 'undefined'){
      window.__globalLoadingCount = (window.__globalLoadingCount || 0) + 1
      window.dispatchEvent(new CustomEvent('globalLoading', { detail: { loading: true } }))
    }
  }catch(e){/* ignore */}
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// response interceptor to decrement global loading counter
api.interceptors.response.use(
  (response) => {
    try{
      if(typeof window !== 'undefined'){
        window.__globalLoadingCount = Math.max((window.__globalLoadingCount || 1) - 1, 0)
        const loading = (window.__globalLoadingCount || 0) > 0
        window.dispatchEvent(new CustomEvent('globalLoading', { detail: { loading } }))
      }
    }catch(e){/* ignore */}
    return response
  },
  (error) => {
    try{
      if(typeof window !== 'undefined'){
        window.__globalLoadingCount = Math.max((window.__globalLoadingCount || 1) - 1, 0)
        const loading = (window.__globalLoadingCount || 0) > 0
        window.dispatchEvent(new CustomEvent('globalLoading', { detail: { loading } }))
      }
    }catch(e){/* ignore */}
    return Promise.reject(error)
  }
)  

export default api

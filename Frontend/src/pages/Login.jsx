import React, { useState } from 'react'
import api from '../utils/api'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login({onLogin}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    if(!email || !password){
      toast.error('Please fill all fields')
      return
    }
    setLoading(true)
    try{
      const res = await api.post('/user/login', { email, password })
      const { token, user } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      onLogin && onLogin(user)
      toast.success('Logged in successfully')
      navigate('/')
    }catch(e){
      toast.error(e?.response?.data?.message || 'Login failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full border p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input 
              className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your email" 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input 
              className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your password"
              type="password" 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
            />
          </div>
          <button 
            className="w-full bg-black text-white py-2 font-semibold hover:bg-gray-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account? <Link to="/register" className="font-semibold underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

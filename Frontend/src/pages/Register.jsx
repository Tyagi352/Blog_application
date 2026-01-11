import React, { useState } from 'react'
import api from '../utils/api'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register({onRegister}){
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e)=>{
    e.preventDefault()
    if(!firstName || !lastName || !email || !password){
      toast.error('Please fill all fields')
      return
    }
    if(password.length < 6){
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try{
      const res = await api.post('/user/register', { firstName, lastName, email, password })
      const { user } = res.data
      toast.success('Registration successful! Please login.')
      navigate('/login')
    }catch(e){
      toast.error(e?.response?.data?.message || 'Registration failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full border p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input 
              className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="First name"
              value={firstName}
              onChange={e=>setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input 
              className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Last name"
              value={lastName}
              onChange={e=>setLastName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input 
              className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input 
              className="w-full border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Password (min 6 chars)"
              type="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <button 
            className="w-full bg-black text-white py-2 font-semibold hover:bg-gray-800 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="font-semibold underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

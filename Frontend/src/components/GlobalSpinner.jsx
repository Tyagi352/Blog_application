import React, { useEffect, useState } from 'react'

export default function GlobalSpinner(){
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    const handler = (e) => {
      const l = e?.detail?.loading
      setLoading(!!l)
    }
    window.addEventListener('globalLoading', handler)
    return ()=> window.removeEventListener('globalLoading', handler)
  }, [])

  if(!loading) return null

  return (
    <div style={{position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999}}>
      <div style={{position:'absolute', inset:0, backgroundColor: 'rgba(0,0,0,0.4)'}} />
      <div style={{position:'relative', padding:20, borderRadius:8, backgroundColor:'#000', color:'#fff', display:'flex', alignItems:'center', gap:12}}>
        <div className="animate-spin" style={{width:20, height:20, border:'3px solid #fff', borderTopColor:'transparent', borderRadius:'50%'}} />
        <div>Loading…</div>
      </div>
    </div>
  )
}

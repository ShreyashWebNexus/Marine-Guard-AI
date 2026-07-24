import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [focused, setFocused] = useState('')

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    setTimeout(() => { setLoading(false); navigate('/dashboard') }, 950)
  }

  return (
    <div className="page" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', paddingTop:'5rem' }}>
      <Navbar />

      <div className="wrap-sm" style={{ width:'100%', paddingTop:'2rem', paddingBottom:'3rem' }}>

        {/* Card */}
        <div className="glass a-scalein" style={{ padding:'3rem 2.5rem', border:'1px solid rgba(6,182,212,.15)' }}>

          {/* Logo mark */}
          <div style={{ textAlign:'center', marginBottom:'2.2rem' }}>
            <div className="a-float" style={{ display:'inline-block', marginBottom:'1.1rem' }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="30" fill="rgba(6,182,212,.07)" stroke="rgba(6,182,212,.22)" strokeWidth=".8"/>
                <circle cx="32" cy="32" r="20" fill="rgba(6,32,56,.6)" stroke="rgba(6,182,212,.2)" strokeWidth=".6" strokeDasharray="3 4"/>
                {/* Sonar waves */}
                <circle cx="32" cy="32" r="8"  fill="none" stroke="rgba(6,182,212,.55)" strokeWidth=".8"/>
                <circle cx="32" cy="32" r="13" fill="none" stroke="rgba(6,182,212,.3)"  strokeWidth=".6"/>
                <circle cx="32" cy="32" r="18" fill="none" stroke="rgba(6,182,212,.15)" strokeWidth=".5"/>
                {/* Center dot */}
                <circle cx="32" cy="32" r="3" fill="var(--c-aqua)" opacity=".9"/>
                {/* Scan line */}
                <line x1="32" y1="32" x2="44" y2="20" stroke="rgba(6,182,212,.6)" strokeWidth="1" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 style={{
              fontFamily:'var(--font-disp)', fontSize:'2rem', fontWeight:300,
              color:'var(--c-foam)', marginBottom:'.4rem',
            }}>
              Welcome back
            </h1>
            <p style={{ fontSize:'.85rem', color:'rgba(103,232,249,.45)' }}>
              Sign in to access the species classifier
            </p>
          </div>

          {/* Divider */}
          <div className="divider" style={{ marginBottom:'2rem' }} />

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>

            {/* Email */}
            <div>
              <label style={{
                display:'block', fontFamily:'var(--font-mono)', fontSize:'.68rem',
                letterSpacing:'.14em', textTransform:'uppercase',
                color: focused === 'email' ? 'var(--c-aqua)' : 'rgba(103,232,249,.45)',
                marginBottom:'.5rem', transition:'color .2s',
              }}>
                Email Address
              </label>
              <div style={{ position:'relative' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
                  position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)',
                  pointerEvents:'none', opacity:.4,
                }}>
                  <rect x="1" y="3" width="14" height="10" rx="2" stroke="rgba(103,232,249,1)" strokeWidth=".8"/>
                  <path d="M1 5.5l7 4.5 7-4.5" stroke="rgba(103,232,249,1)" strokeWidth=".8"/>
                </svg>
                <input
                  name="email" type="email" value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  placeholder="researcher@marine.io"
                  className="input"
                  style={{ paddingLeft:'2.6rem' }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{
                display:'block', fontFamily:'var(--font-mono)', fontSize:'.68rem',
                letterSpacing:'.14em', textTransform:'uppercase',
                color: focused === 'password' ? 'var(--c-aqua)' : 'rgba(103,232,249,.45)',
                marginBottom:'.5rem', transition:'color .2s',
              }}>
                Password
              </label>
              <div style={{ position:'relative' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{
                  position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)',
                  pointerEvents:'none', opacity:.4,
                }}>
                  <rect x="3" y="6" width="10" height="8" rx="1.5" stroke="rgba(103,232,249,1)" strokeWidth=".8"/>
                  <path d="M5 6V5a3 3 0 016 0v1" stroke="rgba(103,232,249,1)" strokeWidth=".8" fill="none"/>
                  <circle cx="8" cy="10" r="1.2" fill="rgba(103,232,249,.8)"/>
                </svg>
                <input
                  name="password" type="password" value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocused('password')}
                  onBlur={() => setFocused('')}
                  placeholder="••••••••••"
                  className="input"
                  style={{ paddingLeft:'2.6rem' }}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.25)',
                borderRadius:'var(--r-sm)', padding:'.7rem 1rem',
                fontSize:'.82rem', color:'#fca5a5', display:'flex', alignItems:'center', gap:'.5rem',
              }}>
                <span style={{ fontSize:'1rem' }}>⚠</span> {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit" disabled={loading} className="btn"
              style={{ marginTop:'.5rem', justifyContent:'center', width:'100%', padding:'1rem' }}
            >
              {loading ? (
                <><div className="spinner" /> Authenticating…</>
              ) : (
                <>Sign In →</>
              )}
            </button>
          </form>

          {/* Footer */}
          <p style={{ textAlign:'center', fontSize:'.82rem', color:'rgba(103,232,249,.35)', marginTop:'1.5rem' }}>
            No account?{' '}
            <Link to="/dashboard" style={{ color:'rgba(103,232,249,.7)', textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e => e.target.style.color='var(--c-aqua)'}
              onMouseLeave={e => e.target.style.color='rgba(103,232,249,.7)'}
            >
              Continue as guest
            </Link>
          </p>
        </div>

        {/* Tech pills */}
        <div style={{ display:'flex', justifyContent:'center', gap:'.5rem', marginTop:'1.5rem', flexWrap:'wrap' }}>
          {['FastAPI','PyTorch','ViT','EfficientNetV2'].map(t => (
            <span key={t} style={{
              fontFamily:'var(--font-mono)', fontSize:'.65rem', letterSpacing:'.1em',
              color:'rgba(103,232,249,.3)', background:'rgba(4,21,37,.6)',
              border:'1px solid rgba(6,182,212,.1)', borderRadius:'100px', padding:'3px 10px',
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
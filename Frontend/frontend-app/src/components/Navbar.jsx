import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const onDash = pathname === '/dashboard'

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.7rem', textDecoration:'none' }}>
        {/* Inline SVG fish icon */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <ellipse cx="14" cy="14" rx="10" ry="7" fill="url(#fg)" opacity=".9"/>
          <path d="M24 14c3-3 5-7 5-7s-2 0-5 3v-3s-2 4-2 7 2 7 2 7v-3c3 3 5 3 5 3s-2-4-5-7z" fill="url(#fg)" opacity=".7"/>
          <circle cx="8" cy="12.5" r="1.5" fill="#cffafe" opacity=".9"/>
          <defs>
            <linearGradient id="fg" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#67e8f9"/>
              <stop offset="1" stopColor="#0891b2"/>
            </linearGradient>
          </defs>
        </svg>
        <span style={{ fontFamily:'var(--font-disp)', fontWeight:400, fontSize:'1.15rem', letterSpacing:'0.02em' }} className="text-ocean">
          MarineAI
        </span>
      </Link>

      {/* Right side */}
      <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
        {pathname !== '/' && (
          <Link to="/" className="btn-ghost" style={{ padding:'0.5rem 1.1rem', fontSize:'.82rem' }}>
            Home
          </Link>
        )}
        {onDash ? (
          <Link to="/" className="btn" style={{ padding:'0.5rem 1.3rem', fontSize:'.82rem' }}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="btn" style={{ padding:'0.5rem 1.3rem', fontSize:'.82rem' }}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
import { useEffect, useState } from 'react'

export default function PredictionResult({ result }) {
  const [barW, setBarW] = useState(0)
  const pct = Math.round(result.confidence * 100)

  useEffect(() => {
    const t = setTimeout(() => setBarW(pct), 120)
    return () => clearTimeout(t)
  }, [pct])

  const confColor = pct >= 75 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#ef4444'
  const label = result.class_label.replace(/_/g, ' ')

  return (
    <div className="glass a-scalein" style={{ padding:'1.6rem 1.75rem' }}>
      {/* Header row */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'1.2rem' }}>
        <div>
          <p className="label-xs" style={{ marginBottom:'.5rem' }}>Identified Species</p>
          <h3 style={{
            fontFamily:'var(--font-disp)', fontSize:'1.85rem', fontWeight:400,
            color:'var(--c-foam)', textTransform:'capitalize', lineHeight:1.1,
          }}>
            {label}
          </h3>
        </div>
        {/* Circular confidence badge */}
        <div style={{ position:'relative', flexShrink:0, marginLeft:'1rem' }}>
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="30" fill="rgba(4,21,37,.8)" stroke="rgba(6,182,212,.1)" strokeWidth="1"/>
            <circle
              cx="36" cy="36" r="30"
              fill="none"
              stroke={confColor}
              strokeWidth="4"
              strokeDasharray={`${(barW / 100) * 188.5} 188.5`}
              strokeLinecap="round"
              transform="rotate(-90 36 36)"
              style={{ transition:'stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)', opacity:.85 }}
            />
            <text x="36" y="37" textAnchor="middle" dominantBaseline="middle"
              fill={confColor}
              style={{ fontFamily:'var(--font-mono)', fontSize:'13px', fontWeight:500 }}
            >
              {barW}%
            </text>
            <text x="36" y="49" textAnchor="middle"
              fill="rgba(103,232,249,.4)"
              style={{ fontFamily:'var(--font-mono)', fontSize:'7px', letterSpacing:'.1em' }}
            >
              CONF.
            </text>
          </svg>
        </div>
      </div>

      {/* Confidence bar */}
      <div style={{ marginBottom:'1.1rem' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.45rem' }}>
          <span style={{ fontSize:'.78rem', color:'rgba(103,232,249,.55)', fontFamily:'var(--font-mono)' }}>
            Confidence Score
          </span>
          <span style={{ fontSize:'.78rem', color: confColor, fontFamily:'var(--font-mono)' }}>
            {pct}%
          </span>
        </div>
        <div className="conf-track">
          <div className="conf-fill" style={{ width:`${barW}%`, background:`linear-gradient(90deg,#0891b2,${confColor})` }} />
        </div>
      </div>

      {/* Footer chips */}
      <div style={{ display:'flex', alignItems:'center', gap:'.6rem', flexWrap:'wrap', paddingTop:'.9rem', borderTop:'1px solid rgba(6,182,212,.1)' }}>
        <span style={{
          fontFamily:'var(--font-mono)', fontSize:'.7rem', letterSpacing:'.1em',
          color:'rgba(103,232,249,.6)', background:'rgba(6,32,56,.7)',
          border:'1px solid rgba(6,182,212,.18)', borderRadius:'100px', padding:'3px 10px',
        }}>
          {result.model_used}
        </span>
        <span style={{
          fontFamily:'var(--font-mono)', fontSize:'.7rem', letterSpacing:'.1em',
          color: pct >= 75 ? 'rgba(16,185,129,.8)' : 'rgba(245,158,11,.8)',
          background: pct >= 75 ? 'rgba(16,185,129,.08)' : 'rgba(245,158,11,.08)',
          border:`1px solid ${pct >= 75 ? 'rgba(16,185,129,.25)' : 'rgba(245,158,11,.25)'}`,
          borderRadius:'100px', padding:'3px 10px',
        }}>
          {pct >= 75 ? 'High confidence' : pct >= 50 ? 'Medium confidence' : 'Low confidence'}
        </span>
      </div>
    </div>
  )
}
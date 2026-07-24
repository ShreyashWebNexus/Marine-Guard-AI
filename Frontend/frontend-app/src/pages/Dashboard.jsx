import { useState } from 'react'
import Navbar          from '../components/Navbar'
import ImageUploader   from '../components/ImageUploader'
import ModelSelector   from '../components/ModelSelector'
import PredictionResult from '../components/PredictionResult'
import AlertCard       from '../components/AlertCard'
import GradCamPanel    from '../components/GradCamPanel'
import { predictSpecies } from '../services/api'

export default function Dashboard() {
  const [file, setFile]       = useState(null)
  const [preview, setPreview] = useState(null)
  const [model, setModel]     = useState('vit')
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [history, setHistory] = useState([])

  async function handlePredict() {
    if (!file) { setError('Please upload an image first.'); return }
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const data = await predictSpecies(file, model)
      setResult(data)
      setHistory(h => [{ ...data, ts: new Date().toLocaleTimeString() }, ...h].slice(0, 5))
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        'Cannot reach backend. Ensure FastAPI is running at http://127.0.0.1:8000'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <Navbar />

      <div className="wrap" style={{ paddingTop:'5.5rem', paddingBottom:'4rem' }}>

        {/* ── Page header ─────────────────────── */}
        <div className="a-fadeup" style={{ marginBottom:'2rem', display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <p className="label-xs" style={{ marginBottom:'.5rem' }}>Marine Species Classifier</p>
            <h1 className="disp-lg" style={{ color:'var(--c-foam)' }}>
              Deep-sea <span className="text-ocean" style={{ fontStyle:'italic' }}>identification</span>
            </h1>
          </div>
          {/* Model badge */}
          <div style={{
            display:'flex', alignItems:'center', gap:'.6rem',
            padding:'.5rem 1rem', borderRadius:'100px',
            background:'rgba(6,32,56,.5)', border:'1px solid rgba(6,182,212,.18)',
          }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--c-aqua)', boxShadow:'0 0 6px var(--c-aqua)' }}/>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'.72rem', color:'rgba(103,232,249,.7)', letterSpacing:'.1em' }}>
              {model === 'vit' ? 'VISION TRANSFORMER' : 'EFFICIENTNETV2'} · ACTIVE
            </span>
          </div>
        </div>

        {/* ── Main grid ───────────────────────── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', alignItems:'start' }}>

          {/* ── Left column ─────────────────── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>

            {/* Upload card */}
            <div className="glass a-fadeup d1" style={{ padding:'1.6rem' }}>
              <p className="label-xs" style={{ marginBottom:'1rem' }}>Upload Image</p>
              <ImageUploader onFileSelect={setFile} preview={preview} setPreview={setPreview} />
            </div>

            {/* Model selector card */}
            <div className="glass a-fadeup d2" style={{ padding:'1.6rem' }}>
              <ModelSelector value={model} onChange={setModel} />
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.28)',
                borderRadius:'var(--r-md)', padding:'1rem 1.2rem',
                display:'flex', gap:'.7rem', alignItems:'flex-start',
              }}>
                <span style={{ fontSize:'1.1rem', flexShrink:0 }}>⚠</span>
                <p style={{ fontSize:'.83rem', color:'#fca5a5', lineHeight:1.55 }}>{error}</p>
              </div>
            )}

            {/* Predict button */}
            <button
              onClick={handlePredict}
              disabled={loading || !file}
              className="btn a-fadeup d3"
              style={{ justifyContent:'center', padding:'1.05rem', fontSize:'1rem', borderRadius:'var(--r-md)', width:'100%' }}
            >
              {loading ? (
                <><div className="spinner" /> Analysing specimen…</>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink:0 }}>
                    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth=".9"/>
                    <circle cx="9" cy="9" r="4"   stroke="currentColor" strokeWidth=".9"/>
                    <circle cx="9" cy="9" r="1.3" fill="currentColor"/>
                    <line x1="9" y1="1.5" x2="9" y2="4"    stroke="currentColor" strokeWidth=".9"/>
                    <line x1="9" y1="14"  x2="9" y2="16.5" stroke="currentColor" strokeWidth=".9"/>
                    <line x1="1.5" y1="9" x2="4"    y2="9" stroke="currentColor" strokeWidth=".9"/>
                    <line x1="14"  y1="9" x2="16.5" y2="9" stroke="currentColor" strokeWidth=".9"/>
                  </svg>
                  Classify Species
                </>
              )}
            </button>

            {/* History */}
            {history.length > 0 && (
              <div className="glass-sm a-fadeup" style={{ padding:'1.1rem 1.3rem' }}>
                <p className="label-xs" style={{ marginBottom:'.75rem' }}>Recent Scans</p>
                <div style={{ display:'flex', flexDirection:'column', gap:'.45rem' }}>
                  {history.map((h, i) => (
                    <div key={i} style={{
                      display:'flex', alignItems:'center', justifyContent:'space-between',
                      padding:'.45rem .65rem', borderRadius:'var(--r-sm)',
                      background:'rgba(4,21,37,.5)', border:'1px solid rgba(6,182,212,.08)',
                    }}>
                      <span style={{ fontFamily:'var(--font-body)', fontSize:'.8rem', color:'rgba(207,250,254,.7)', textTransform:'capitalize' }}>
                        {h.class_label.replace(/_/g,' ')}
                      </span>
                      <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'.68rem', color:'var(--c-aqua)' }}>
                          {Math.round(h.confidence * 100)}%
                        </span>
                        <span style={{ fontFamily:'var(--font-mono)', fontSize:'.62rem', color:'rgba(103,232,249,.3)' }}>
                          {h.ts}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right column ────────────────── */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>

            {/* Result or placeholder */}
            {result ? (
              <>
                <PredictionResult result={result} />
                <AlertCard classLabel={result.class_label} />
              </>
            ) : (
              <div className="glass a-fadeup d1" style={{
                padding:'3rem 2rem', textAlign:'center',
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                minHeight:'220px', border:'1px solid rgba(6,182,212,.08)',
              }}>
                <div className="a-float-slow" style={{ display:'inline-block', marginBottom:'1.1rem', opacity:.3 }}>
                  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="28" stroke="rgba(6,182,212,.8)" strokeWidth=".7" strokeDasharray="3 5"/>
                    <circle cx="30" cy="30" r="18" stroke="rgba(6,182,212,.6)" strokeWidth=".6"/>
                    <circle cx="30" cy="30" r="8"  stroke="rgba(6,182,212,.5)" strokeWidth=".6"/>
                    <circle cx="30" cy="30" r="2"  fill="rgba(6,182,212,.8)"/>
                    <line x1="30" y1="2"  x2="30" y2="12" stroke="rgba(6,182,212,.5)" strokeWidth=".6"/>
                    <line x1="30" y1="48" x2="30" y2="58" stroke="rgba(6,182,212,.5)" strokeWidth=".6"/>
                    <line x1="2"  y1="30" x2="12" y2="30" stroke="rgba(6,182,212,.5)" strokeWidth=".6"/>
                    <line x1="48" y1="30" x2="58" y2="30" stroke="rgba(6,182,212,.5)" strokeWidth=".6"/>
                  </svg>
                </div>
                <p style={{ fontFamily:'var(--font-disp)', fontSize:'1.1rem', color:'rgba(103,232,249,.35)', marginBottom:'.4rem' }}>
                  Awaiting specimen
                </p>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'.7rem', color:'rgba(103,232,249,.22)', letterSpacing:'.08em' }}>
                  Upload an image and click classify
                </p>
              </div>
            )}

            {/* Grad-CAM Panel */}
            <GradCamPanel preview={result ? preview : null} result={result} />
          </div>
        </div>

        {/* ── Stats footer ────────────────────── */}
        <div className="glass a-fadeup" style={{
          marginTop:'1.5rem', padding:'1.25rem 2rem',
          display:'grid', gridTemplateColumns:'repeat(4,1fr)',
          border:'1px solid rgba(6,182,212,.1)',
        }}>
          {[
            { val:'2',          label:'Models' },
            { val:'100+',       label:'Species' },
            { val:':8000',      label:'Backend port' },
            { val:result ? '✓' : '—', label:'Last result' },
          ].map((s, i) => (
            <div key={s.label} style={{
              textAlign:'center', padding:'0 1rem',
              borderRight: i < 3 ? '1px solid rgba(6,182,212,.1)' : 'none',
            }}>
              <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.25rem', color:'var(--c-aqua)', fontWeight:500 }}>
                {s.val}
              </div>
              <div style={{ fontSize:'.7rem', color:'rgba(103,232,249,.38)', letterSpacing:'.08em', marginTop:'.2rem', textTransform:'uppercase', fontFamily:'var(--font-mono)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive grid fix */}
      <style>{`
        @media(max-width:768px){
          .dash-grid{grid-template-columns:1fr !important}
        }
      `}</style>
    </div>
  )
}
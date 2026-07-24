import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SPECIES = ['Humpback Whale','Great White Shark','Blue Ringed Octopus','Clownfish','Manta Ray','Bottlenose Dolphin','Hammerhead Shark','Sea Turtle','Lionfish','Narwhal']

const FEATURES = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="12" height="12" rx="2.5" fill="rgba(6,182,212,.25)" stroke="rgba(6,182,212,.6)" strokeWidth=".7"/>
        <rect x="18" y="2" width="12" height="12" rx="2.5" fill="rgba(6,182,212,.15)" stroke="rgba(6,182,212,.4)" strokeWidth=".7"/>
        <rect x="2" y="18" width="12" height="12" rx="2.5" fill="rgba(6,182,212,.15)" stroke="rgba(6,182,212,.4)" strokeWidth=".7"/>
        <rect x="18" y="18" width="12" height="12" rx="2.5" fill="rgba(6,182,212,.25)" stroke="rgba(6,182,212,.6)" strokeWidth=".7"/>
        <line x1="14" y1="8" x2="18" y2="8" stroke="rgba(103,232,249,.5)" strokeWidth=".8" strokeDasharray="1.5 1"/>
        <line x1="14" y1="24" x2="18" y2="24" stroke="rgba(103,232,249,.5)" strokeWidth=".8" strokeDasharray="1.5 1"/>
        <line x1="8" y1="14" x2="8" y2="18" stroke="rgba(103,232,249,.5)" strokeWidth=".8" strokeDasharray="1.5 1"/>
        <line x1="24" y1="14" x2="24" y2="18" stroke="rgba(103,232,249,.5)" strokeWidth=".8" strokeDasharray="1.5 1"/>
      </svg>
    ),
    title: 'Dual AI Models',
    body: 'Choose between Vision Transformer for global attention or EfficientNetV2 for high-speed CNN inference — both fine-tuned on marine datasets.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" fill="rgba(251,146,60,.08)" stroke="rgba(251,146,60,.4)" strokeWidth=".7"/>
        <circle cx="16" cy="16" r="7" fill="rgba(251,146,60,.1)" stroke="rgba(251,146,60,.5)" strokeWidth=".7"/>
        <circle cx="16" cy="16" r="2.5" fill="rgba(251,146,60,.5)"/>
        <line x1="16" y1="3" x2="16" y2="8" stroke="rgba(251,146,60,.4)" strokeWidth=".8"/>
        <line x1="16" y1="24" x2="16" y2="29" stroke="rgba(251,146,60,.4)" strokeWidth=".8"/>
        <line x1="3" y1="16" x2="8" y2="16" stroke="rgba(251,146,60,.4)" strokeWidth=".8"/>
        <line x1="24" y1="16" x2="29" y2="16" stroke="rgba(251,146,60,.4)" strokeWidth=".8"/>
      </svg>
    ),
    title: 'Grad-CAM XAI',
    body: 'Explainable AI heatmaps reveal exactly which image regions influenced the model\'s decision — full transparency, zero black box.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" fill="rgba(239,68,68,.08)" stroke="rgba(239,68,68,.45)" strokeWidth=".7"/>
        <path d="M16 10L22 13V19L16 22L10 19V13L16 10Z" fill="rgba(239,68,68,.12)" stroke="rgba(239,68,68,.5)" strokeWidth=".7"/>
        <circle cx="16" cy="16" r="2.5" fill="rgba(239,68,68,.6)"/>
        <line x1="16" y1="4" x2="16" y2="10" stroke="rgba(239,68,68,.3)" strokeWidth=".6"/>
        <line x1="16" y1="22" x2="16" y2="28" stroke="rgba(239,68,68,.3)" strokeWidth=".6"/>
      </svg>
    ),
    title: 'Danger Detection',
    body: 'Automatic red/green safety alerts instantly flag dangerous species like sharks, lionfish, or box jellyfish versus safe ones.',
  },
]

export default function Landing() {
  return (
    <div className="page">
      <Navbar />

      {/* ── Hero ───────────────────────────────── */}
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', paddingTop:'5rem' }}>
        <div className="wrap" style={{ paddingTop:'4rem', paddingBottom:'5rem' }}>
          <div style={{ maxWidth:'820px' }}>

            {/* Eyebrow */}
            <div className="a-fadeup" style={{ display:'inline-flex', alignItems:'center', gap:'.6rem', marginBottom:'2rem',
              padding:'.4rem 1rem', borderRadius:'100px',
              background:'rgba(6,182,212,.07)', border:'1px solid rgba(6,182,212,.2)',
            }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:'var(--c-aqua)', boxShadow:'0 0 8px var(--c-aqua)' }}/>
              <span className="label-xs">Deep learning · Marine biology · AI</span>
            </div>

            {/* Headline */}
            <h1 className="disp-xl a-fadeup d1" style={{ marginBottom:'1.5rem' }}>
              <span style={{ display:'block', color:'var(--c-foam)' }}>Identify ocean</span>
              <span className="text-ocean" style={{ display:'block', fontStyle:'italic' }}>life instantly</span>
            </h1>

            {/* Sub */}
            <p className="a-fadeup d2" style={{
              fontSize:'1.05rem', color:'rgba(207,250,254,.6)', lineHeight:1.75,
              maxWidth:'540px', marginBottom:'2.5rem',
            }}>
              Upload any underwater photograph and our Vision Transformer or
              EfficientNetV2 models will identify the species, explain its decision
              through Grad-CAM, and alert you to dangerous fauna — in seconds.
            </p>

            {/* CTA Row */}
            <div className="a-fadeup d3" style={{ display:'flex', gap:'1rem', flexWrap:'wrap', alignItems:'center' }}>
              <Link to="/login" className="btn" style={{ fontSize:'.95rem', padding:'.95rem 2.4rem' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}>
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 11.5a4.5 4.5 0 110-9 4.5 4.5 0 010 9zm2.5-5.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" fill="currentColor"/>
                </svg>
                Get Started
              </Link>
              <Link to="/dashboard" className="btn-ghost" style={{ fontSize:'.95rem', padding:'.95rem 2.4rem' }}>
                Try Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink:0 }}>
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </Link>
            </div>

            {/* Stats row */}
            <div className="a-fadeup d4" style={{ display:'flex', gap:'2.5rem', marginTop:'3.5rem', flexWrap:'wrap' }}>
              {[
                { val:'100+', label:'Species classes' },
                { val:'2',    label:'AI models' },
                { val:'<1s',  label:'Inference time' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily:'var(--font-mono)', fontSize:'1.4rem', color:'var(--c-aqua)', fontWeight:500 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize:'.75rem', color:'rgba(103,232,249,.45)', letterSpacing:'.06em', marginTop:'.1rem' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating illustration */}
          <div className="a-float" style={{
            position:'absolute', right:'8%', top:'50%', transform:'translateY(-50%)',
            opacity:.18, pointerEvents:'none',
            display:'flex',
          }}>
            <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
              <circle cx="170" cy="170" r="165" stroke="rgba(6,182,212,1)" strokeWidth=".5" strokeDasharray="4 8"/>
              <circle cx="170" cy="170" r="120" stroke="rgba(6,182,212,.8)" strokeWidth=".5" strokeDasharray="2 6"/>
              <circle cx="170" cy="170" r="75" stroke="rgba(6,182,212,.6)" strokeWidth=".5"/>
              <circle cx="170" cy="170" r="30" fill="rgba(6,182,212,.15)" stroke="rgba(6,182,212,.8)" strokeWidth=".5"/>
              {/* Cross hairs */}
              <line x1="5" y1="170" x2="335" y2="170" stroke="rgba(6,182,212,.3)" strokeWidth=".4"/>
              <line x1="170" y1="5" x2="170" y2="335" stroke="rgba(6,182,212,.3)" strokeWidth=".4"/>
              {/* Dots at compass */}
              {[0,90,180,270].map(a => {
                const r = 165, rad = (a-90)*Math.PI/180
                return <circle key={a} cx={170+r*Math.cos(rad)} cy={170+r*Math.sin(rad)} r="3" fill="rgba(103,232,249,.8)"/>
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* ── Ticker ─────────────────────────────── */}
      <div style={{
        overflow:'hidden', padding:'.9rem 0',
        borderTop:'1px solid rgba(6,182,212,.1)',
        borderBottom:'1px solid rgba(6,182,212,.1)',
        background:'rgba(4,21,37,.5)',
        backdropFilter:'blur(10px)',
      }}>
        <div className="ticker-inner">
          {[...SPECIES, ...SPECIES].map((s, i) => (
            <span key={i} style={{
              fontFamily:'var(--font-mono)', fontSize:'.7rem', letterSpacing:'.15em',
              color:'rgba(103,232,249,.45)', padding:'0 2rem', flexShrink:0,
            }}>
              ◆ {s.toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* ── Features ───────────────────────────── */}
      <section style={{ padding:'6rem 0' }}>
        <div className="wrap">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }}>
            <p className="label-xs" style={{ marginBottom:'1rem' }}>Capabilities</p>
            <h2 className="disp-lg text-ocean">Built for marine researchers</h2>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'1.25rem' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`glass feat-card a-fadeup d${i+2}`}
                style={{ padding:'2rem 1.75rem', border:'1px solid rgba(6,182,212,.1)' }}>
                <div style={{ marginBottom:'1.25rem' }}>{f.icon}</div>
                <h3 style={{ fontFamily:'var(--font-disp)', fontSize:'1.3rem', fontWeight:400, color:'var(--c-foam)', marginBottom:'.6rem' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize:'.85rem', color:'rgba(103,232,249,.5)', lineHeight:1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section style={{ padding:'5rem 0 7rem' }}>
        <div className="wrap" style={{ textAlign:'center' }}>
          <div className="glass" style={{
            padding:'4rem 3rem', border:'1px solid rgba(6,182,212,.15)',
            maxWidth:'640px', margin:'0 auto',
            background:'rgba(4,21,37,.5)',
          }}>
            <div className="a-float-slow" style={{ display:'inline-block', marginBottom:'1.5rem' }}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="28" fill="rgba(6,182,212,.07)" stroke="rgba(6,182,212,.25)" strokeWidth=".8"/>
                {/* Simplified whale */}
                <ellipse cx="30" cy="30" rx="18" ry="10" fill="rgba(8,145,178,.4)" stroke="rgba(6,182,212,.5)" strokeWidth=".7"/>
                <path d="M12 30c-4 0-8 4-8 4s4-2 8 0" fill="rgba(8,145,178,.5)" stroke="rgba(6,182,212,.4)" strokeWidth=".6"/>
                <circle cx="38" cy="27" r="1.5" fill="rgba(207,250,254,.6)"/>
              </svg>
            </div>
            <h2 className="disp-md" style={{ color:'var(--c-foam)', marginBottom:'.9rem' }}>
              Ready to dive in?
            </h2>
            <p style={{ color:'rgba(103,232,249,.5)', fontSize:'.9rem', marginBottom:'2rem', lineHeight:1.65 }}>
              Upload your first marine photograph and discover what's living beneath the surface.
            </p>
            <Link to="/login" className="btn" style={{ fontSize:'.95rem', padding:'1rem 2.6rem' }}>
              Start Classifying
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
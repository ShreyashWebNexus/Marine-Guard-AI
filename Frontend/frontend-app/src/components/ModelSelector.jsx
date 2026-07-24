const MODELS = [
  {
    id: 'vit',
    name: 'Vision Transformer',
    short: 'ViT',
    tag: 'Attention-based',
    desc: 'Global context via self-attention across image patches',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="1" width="7" height="7" rx="1.5" fill="rgba(6,182,212,.5)" stroke="rgba(6,182,212,.7)" strokeWidth=".6"/>
        <rect x="12" y="1" width="7" height="7" rx="1.5" fill="rgba(6,182,212,.35)" stroke="rgba(6,182,212,.5)" strokeWidth=".6"/>
        <rect x="1" y="12" width="7" height="7" rx="1.5" fill="rgba(6,182,212,.35)" stroke="rgba(6,182,212,.5)" strokeWidth=".6"/>
        <rect x="12" y="12" width="7" height="7" rx="1.5" fill="rgba(6,182,212,.5)" stroke="rgba(6,182,212,.7)" strokeWidth=".6"/>
        <line x1="8" y1="4.5" x2="12" y2="4.5" stroke="rgba(103,232,249,.5)" strokeWidth=".8" strokeDasharray="1.5 1"/>
        <line x1="8" y1="15.5" x2="12" y2="15.5" stroke="rgba(103,232,249,.5)" strokeWidth=".8" strokeDasharray="1.5 1"/>
        <line x1="4.5" y1="8" x2="4.5" y2="12" stroke="rgba(103,232,249,.5)" strokeWidth=".8" strokeDasharray="1.5 1"/>
        <line x1="15.5" y1="8" x2="15.5" y2="12" stroke="rgba(103,232,249,.5)" strokeWidth=".8" strokeDasharray="1.5 1"/>
      </svg>
    ),
  },
  {
    id: 'efficientnetv2',
    name: 'EfficientNetV2',
    short: 'ENv2',
    tag: 'CNN-based',
    desc: 'Faster & accurate hierarchical feature extraction',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="rgba(6,182,212,.5)" strokeWidth=".7"/>
        <circle cx="10" cy="10" r="5.5" stroke="rgba(6,182,212,.45)" strokeWidth=".7"/>
        <circle cx="10" cy="10" r="2.5" fill="rgba(6,182,212,.4)" stroke="rgba(6,182,212,.7)" strokeWidth=".7"/>
        <line x1="10" y1="1.5" x2="10" y2="4.5" stroke="rgba(103,232,249,.4)" strokeWidth=".8"/>
        <line x1="10" y1="15.5" x2="10" y2="18.5" stroke="rgba(103,232,249,.4)" strokeWidth=".8"/>
        <line x1="1.5" y1="10" x2="4.5" y2="10" stroke="rgba(103,232,249,.4)" strokeWidth=".8"/>
        <line x1="15.5" y1="10" x2="18.5" y2="10" stroke="rgba(103,232,249,.4)" strokeWidth=".8"/>
      </svg>
    ),
  },
]

export default function ModelSelector({ value, onChange }) {
  return (
    <div>
      <p className="label-xs" style={{ marginBottom:'.75rem' }}>Select Model</p>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.65rem' }}>
        {MODELS.map(m => (
          <button
            key={m.id}
            className={`model-card ${value === m.id ? 'sel' : ''}`}
            onClick={() => onChange(m.id)}
            style={{ textAlign:'left', background:'none', cursor:'pointer', border:'none', padding:0 }}
          >
            <div className="model-card" style={{ padding:'.95rem 1.1rem', margin:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'.5rem' }}>
                {m.icon}
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
                    <span style={{ fontFamily:'var(--font-mono)', fontSize:'.78rem', color:'var(--c-aqua)', fontWeight:500 }}>
                      {m.short}
                    </span>
                    {value === m.id && (
                      <span style={{
                        fontFamily:'var(--font-mono)', fontSize:'.6rem', letterSpacing:'.1em',
                        color:'rgba(103,232,249,.7)', background:'rgba(6,182,212,.1)',
                        padding:'1px 6px', borderRadius:'100px',
                        border:'1px solid rgba(6,182,212,.2)',
                      }}>active</span>
                    )}
                  </div>
                </div>
              </div>
              <p style={{ fontSize:'.82rem', color:'var(--c-foam)', fontWeight:500, marginBottom:'.25rem' }}>
                {m.name}
              </p>
              <p style={{ fontSize:'.73rem', color:'rgba(103,232,249,.45)', lineHeight:1.4 }}>
                {m.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
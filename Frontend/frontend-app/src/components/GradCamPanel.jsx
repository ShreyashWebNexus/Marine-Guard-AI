export default function GradCamPanel({ preview, result }) {
  const hasResult = !!preview && !!result

  return (
    <div className="glass" style={{ padding:'1.5rem 1.6rem' }}>
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1rem' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.6rem' }}>
          <div style={{
            width:8, height:8, borderRadius:'50%',
            background:'#fb923c',
            boxShadow:'0 0 8px rgba(251,146,60,.8)',
          }}/>
          <p className="label-xs">Grad-CAM Visualization</p>
        </div>
        {hasResult && (
          <span style={{
            fontFamily:'var(--font-mono)', fontSize:'.62rem', letterSpacing:'.1em',
            color:'rgba(103,232,249,.6)', background:'rgba(6,182,212,.08)',
            border:'1px solid rgba(6,182,212,.18)', borderRadius:'100px', padding:'2px 8px',
          }}>
            XAI Active
          </span>
        )}
      </div>

      {/* Heatmap area */}
      <div style={{
        borderRadius:'var(--r-md)', overflow:'hidden',
        background:'rgba(4,21,37,.7)', border:'1px solid rgba(6,182,212,.1)',
        position:'relative', minHeight:'160px',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        {hasResult ? (
          <>
            <img
              src={preview} alt="Grad-CAM base"
              style={{ width:'100%', maxHeight:'230px', objectFit:'contain', display:'block', opacity:.75 }}
            />
            {/* Heatmap overlay */}
            <div className="heatmap-layer" />
            {/* Scan line */}
            <div className="scan-line" />
            {/* Corner brackets */}
            {[
              { top:8, left:8, borderTop:'1.5px solid rgba(6,182,212,.5)', borderLeft:'1.5px solid rgba(6,182,212,.5)' },
              { top:8, right:8, borderTop:'1.5px solid rgba(6,182,212,.5)', borderRight:'1.5px solid rgba(6,182,212,.5)' },
              { bottom:8, left:8, borderBottom:'1.5px solid rgba(6,182,212,.5)', borderLeft:'1.5px solid rgba(6,182,212,.5)' },
              { bottom:8, right:8, borderBottom:'1.5px solid rgba(6,182,212,.5)', borderRight:'1.5px solid rgba(6,182,212,.5)' },
            ].map((s, i) => (
              <div key={i} style={{ position:'absolute', width:16, height:16, ...s, borderRadius:2 }} />
            ))}
          </>
        ) : (
          <div style={{ textAlign:'center', padding:'2.5rem 1.5rem' }}>
            <div className="a-float-slow" style={{ display:'inline-block', marginBottom:'.8rem' }}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" opacity=".35">
                <circle cx="24" cy="24" r="22" stroke="rgba(6,182,212,.5)" strokeWidth=".8"/>
                <path d="M16 28c2-4 6-8 8-8s6 4 8 8" stroke="rgba(6,182,212,.6)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                <circle cx="24" cy="20" r="4" stroke="rgba(6,182,212,.5)" strokeWidth=".8"/>
                <circle cx="24" cy="20" r="1.5" fill="rgba(6,182,212,.3)"/>
              </svg>
            </div>
            <p style={{ fontSize:'.8rem', color:'rgba(103,232,249,.35)', fontFamily:'var(--font-mono)' }}>
              Run prediction to see heatmap
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{
        display:'flex', alignItems:'center', gap:'1rem', marginTop:'.9rem',
        padding:'.7rem .9rem', background:'rgba(4,21,37,.5)', borderRadius:'var(--r-sm)',
        border:'1px solid rgba(6,182,212,.07)', flexWrap:'wrap',
      }}>
        {[
          { color:'#ef4444', label:'High attention' },
          { color:'#f97316', label:'Medium' },
          { color:'#eab308', label:'Low' },
          { color:'#22c55e', label:'Background' },
        ].map(l => (
          <div key={l.label} style={{ display:'flex', alignItems:'center', gap:'.35rem' }}>
            <div style={{ width:10, height:10, borderRadius:2, background:l.color, opacity:.8 }}/>
            <span style={{ fontSize:'.7rem', color:'rgba(103,232,249,.45)', fontFamily:'var(--font-mono)' }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>

      <p style={{
        fontSize:'.73rem', color:'rgba(103,232,249,.35)',
        fontStyle:'italic', marginTop:'.65rem', lineHeight:1.5,
        fontFamily:'var(--font-body)',
      }}>
        Highlighted regions show where the model focused to make this prediction.
      </p>
    </div>
  )
}
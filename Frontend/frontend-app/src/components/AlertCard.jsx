const DANGEROUS = [
  'shark','great white','bull shark','tiger shark','hammerhead','whale shark',
  'barracuda','moray eel','lionfish','stonefish','box jellyfish','jellyfish',
  'stingray','electric eel','blue ringed octopus','fire coral','sea snake',
  'cone snail','portuguese man of war','stone fish',
]

function isDangerous(label) {
  const lower = label.toLowerCase()
  return DANGEROUS.some(d => lower.includes(d))
}

export default function AlertCard({ classLabel }) {
  const danger  = isDangerous(classLabel)
  const name    = classLabel.replace(/_/g, ' ')

  return (
    <div className={`a-fadeup ${danger ? 'alert-danger' : 'alert-safe'}`} style={{ padding:'1.2rem 1.4rem' }}>
      <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
        {/* Icon */}
        <div style={{
          width:44, height:44, borderRadius:'50%', flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center',
          background: danger ? 'rgba(239,68,68,.12)' : 'rgba(16,185,129,.12)',
          border: `1px solid ${danger ? 'rgba(239,68,68,.3)' : 'rgba(16,185,129,.3)'}`,
          fontSize:'1.3rem',
        }}>
          {danger ? '⚠' : '✓'}
        </div>

        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'.6rem', marginBottom:'.35rem' }}>
            <p style={{
              fontFamily:'var(--font-disp)', fontSize:'1.1rem', fontWeight:400,
              color: danger ? '#fca5a5' : '#6ee7b7',
            }}>
              {danger ? 'Danger Alert' : 'Safe Species'}
            </p>
            <span style={{
              fontFamily:'var(--font-mono)', fontSize:'.62rem', letterSpacing:'.12em',
              padding:'2px 8px', borderRadius:'100px', textTransform:'uppercase',
              color: danger ? 'rgba(252,165,165,.8)' : 'rgba(110,231,183,.8)',
              background: danger ? 'rgba(239,68,68,.1)' : 'rgba(16,185,129,.1)',
              border: `1px solid ${danger ? 'rgba(239,68,68,.2)' : 'rgba(16,185,129,.2)'}`,
            }}>
              {danger ? 'hazardous' : 'non-toxic'}
            </span>
          </div>

          <p style={{ fontSize:'.85rem', color:'rgba(224,242,254,.7)', lineHeight:1.55, textTransform:'capitalize' }}>
            {danger
              ? `${name} is classified as potentially dangerous. Maintain safe distance and do not approach in the wild.`
              : `${name} poses no known threat to humans. This species is safe to observe in its natural habitat.`
            }
          </p>
        </div>
      </div>
    </div>
  )
}
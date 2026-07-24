import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function ImageUploader({ onFileSelect, preview, setPreview }) {
  const [isDrag, setIsDrag] = useState(false)

  const onDrop = useCallback((accepted) => {
    const file = accepted[0]
    if (!file) return
    onFileSelect(file)
    setPreview(URL.createObjectURL(file))
    setIsDrag(false)
  }, [onFileSelect, setPreview])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDrag(true),
    onDragLeave: () => setIsDrag(false),
    accept: { 'image/*': [] },
    maxFiles: 1,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className={`dropzone ${isDrag ? 'active' : ''}`}
        style={{ padding: preview ? '0.75rem' : '2.5rem 1.5rem', textAlign: 'center' }}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div style={{ position:'relative' }}>
            <div style={{ borderRadius:'var(--r-md)', overflow:'hidden', background:'rgba(4,21,37,.8)' }}>
              <img
                src={preview} alt="Preview"
                style={{ width:'100%', maxHeight:'230px', objectFit:'contain', display:'block' }}
              />
            </div>
            <div style={{
              position:'absolute', inset:0, borderRadius:'var(--r-md)',
              background:'linear-gradient(to top,rgba(2,11,20,.7) 0%,transparent 50%)',
              display:'flex', alignItems:'flex-end', justifyContent:'center',
              padding:'0.75rem',
            }}>
              <span className="label-xs" style={{ color:'rgba(103,232,249,.7)' }}>
                Drop to replace
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* SVG Underwater illustration */}
            <div className="a-float-slow" style={{ display:'inline-block', marginBottom:'1.2rem' }}>
              <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
                <circle cx="36" cy="36" r="34" fill="rgba(6,182,212,0.07)" stroke="rgba(6,182,212,0.2)" strokeWidth=".5"/>
                <circle cx="36" cy="36" r="24" fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.15)" strokeWidth=".5" strokeDasharray="3 3"/>
                {/* Camera body */}
                <rect x="20" y="27" width="32" height="22" rx="4" fill="rgba(8,145,178,0.35)" stroke="rgba(6,182,212,.45)" strokeWidth=".8"/>
                {/* Lens */}
                <circle cx="36" cy="38" r="8" fill="rgba(4,21,37,.8)" stroke="rgba(6,182,212,.5)" strokeWidth=".8"/>
                <circle cx="36" cy="38" r="5" fill="rgba(6,32,56,.9)" stroke="rgba(103,232,249,.3)" strokeWidth=".5"/>
                <circle cx="36" cy="38" r="2.5" fill="rgba(103,232,249,.25)"/>
                {/* Flash bump */}
                <rect x="26" y="23" width="7" height="5" rx="2" fill="rgba(8,145,178,.4)" stroke="rgba(6,182,212,.3)" strokeWidth=".6"/>
                {/* Upload arrow */}
                <path d="M44 18 L44 22 M42 20 L44 18 L46 20" stroke="rgba(103,232,249,.6)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                {/* Bubbles */}
                <circle cx="55" cy="26" r="2" fill="none" stroke="rgba(103,232,249,.3)" strokeWidth=".7"/>
                <circle cx="60" cy="35" r="1.3" fill="none" stroke="rgba(103,232,249,.25)" strokeWidth=".6"/>
                <circle cx="52" cy="42" r="1.6" fill="none" stroke="rgba(103,232,249,.2)" strokeWidth=".6"/>
              </svg>
            </div>

            <p style={{ fontSize:'1rem', fontWeight:500, color:'var(--c-foam)', marginBottom:'.4rem' }}>
              {isDrag ? 'Release to analyse' : 'Drag & drop your marine photo'}
            </p>
            <p style={{ fontSize:'.82rem', color:'rgba(103,232,249,.45)' }}>
              or click to browse · JPG, PNG, WEBP
            </p>
          </>
        )}
      </div>

      {preview && (
        <button
          onClick={() => { setPreview(null); onFileSelect(null) }}
          style={{
            background:'none', border:'none', cursor:'pointer',
            color:'rgba(103,232,249,.4)', fontSize:'.75rem',
            fontFamily:'var(--font-mono)', letterSpacing:'.08em',
            marginTop:'.6rem', display:'block', width:'100%', textAlign:'center',
            transition:'color .2s',
          }}
          onMouseEnter={e => e.target.style.color='rgba(103,232,249,.8)'}
          onMouseLeave={e => e.target.style.color='rgba(103,232,249,.4)'}
        >
          ✕ clear image
        </button>
      )}
    </div>
  )
}
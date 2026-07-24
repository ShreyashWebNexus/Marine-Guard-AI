import { useEffect, useState } from 'react'

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left:     `${Math.random() * 100}%`,
      size:     `${6 + Math.random() * 20}px`,
      duration: `${10 + Math.random() * 20}s`,
      delay:    `${Math.random() * 15}s`,
      bottom:   `-${20 + Math.random() * 20}px`,
    }))
    setBubbles(generated)
  }, [])

  return (
    <>
      {bubbles.map(b => (
        <div
          key={b.id}
          className="bubble"
          style={{
            left:            b.left,
            width:           b.size,
            height:          b.size,
            bottom:          b.bottom,
            animationDuration: b.duration,
            animationDelay:  b.delay,
          }}
        />
      ))}
    </>
  )
}   
import { useEffect, useRef } from 'react'
import './GlitchText.css'

export default function GlitchText({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = '',
}) {
  const containerRef = useRef(null)

  return (
    <span
      ref={containerRef}
      className={`glitch-text ${enableShadows ? 'glitch-shadows' : ''} ${className}`}
    >
      <span className="glitch-original">{children}</span>
      <span className="glitch-clip glitch-r" aria-hidden="true">{children}</span>
      <span className="glitch-clip glitch-g" aria-hidden="true">{children}</span>
      <span className="glitch-clip glitch-b" aria-hidden="true">{children}</span>
    </span>
  )
}

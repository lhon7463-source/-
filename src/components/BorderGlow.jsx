import React, { useEffect, useRef, useState, useCallback } from 'react'
import './BorderGlow.css'

/**
 * BorderGlow — emits a colored light bloom from the cursor position when
 * the cursor is near the container's edge. Color cycles through `colors`
 * while the cursor stays near the edge.
 *
 * Props match the React Bits / docx signature:
 *   - edgeSensitivity: how close (px) the cursor must be to an edge to trigger
 *   - glowColor: "R G B" string for the base light tint (mixed with colors[])
 *   - backgroundColor: optional solid background fill
 *   - borderRadius: rounded corner radius
 *   - glowRadius: bloom radius in px
 *   - glowIntensity: bloom alpha multiplier
 *   - coneSpread: extra spread added to the bloom
 *   - animated: whether the bloom itself drifts (auto)
 *   - colors: cycle of accent colors for the bloom
 */
export default function BorderGlow({
  children,
  edgeSensitivity = 30,
  glowColor = '255 255 255',
  backgroundColor,
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  className = '',
  style = {},
}) {
  const containerRef = useRef(null)
  const [pos, setPos] = useState({ x: -9999, y: -9999, active: false, colorIdx: 0 })
  const colorIdxRef = useRef(0)
  const lastEdgeHitRef = useRef(0)

  const handleMove = useCallback((e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const distLeft = x
    const distRight = rect.width - x
    const distTop = y
    const distBottom = rect.height - y
    const minDist = Math.min(distLeft, distRight, distTop, distBottom)
    const isInside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
    if (!isInside) {
      setPos((p) => (p.active ? { ...p, active: false } : p))
      return
    }
    if (minDist < edgeSensitivity) {
      const now = performance.now()
      if (now - lastEdgeHitRef.current > 220) {
        lastEdgeHitRef.current = now
        colorIdxRef.current = (colorIdxRef.current + 1) % colors.length
      }
    }
    setPos({ x, y, active: true, colorIdx: colorIdxRef.current })
  }, [edgeSensitivity, colors.length])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', () =>
      setPos((p) => (p.active ? { ...p, active: false } : p))
    )
    return () => el.removeEventListener('mousemove', handleMove)
  }, [handleMove])

  const color = colors[pos.colorIdx] || colors[0]
  const totalRadius = glowRadius + coneSpread

  return (
    <div
      ref={containerRef}
      className={`border-glow ${className}`.trim()}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        background: backgroundColor,
        ...style,
      }}
    >
      <div
        className="border-glow-overlay"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${borderRadius}px`,
          pointerEvents: 'none',
          opacity: pos.active ? glowIntensity : 0,
          background: `radial-gradient(circle ${totalRadius}px at ${pos.x}px ${pos.y}px, ${color}, rgba(${glowColor}, 0) 70%)`,
          mixBlendMode: 'screen',
          transition: animated ? 'opacity 0.6s ease' : 'opacity 0.25s ease',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  )
}

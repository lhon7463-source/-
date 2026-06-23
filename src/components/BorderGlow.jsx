import React from 'react'

export default function BorderGlow({
  children,
  className = '',
  containerClassName = '',
  borderWidth = 1.5,
  glowRadius = 80,
  glowIntensity = 0.4,
  hoverIntensity = 0.9,
  gradientColors = ['#4f7cff', '#7c3aed', '#4f7cff'],
  animationSpeed = 4,
  borderRadius = 14,
}) {
  return (
    <div
      className={containerClassName}
      style={{
        position: 'relative',
        borderRadius: `${borderRadius}px`,
        isolation: 'isolate',
      }}
    >
      {/* 发光边框层 */}
      <div
        style={{
          position: 'absolute',
          inset: `-${borderWidth}px`,
          borderRadius: `${borderRadius + borderWidth}px`,
          background: `conic-gradient(from var(--border-angle, 0deg), ${gradientColors.join(', ')}, ${gradientColors[0]})`,
          mask: `radial-gradient(circle ${glowRadius}px at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent 30%, black 100%)`,
          WebkitMask: `radial-gradient(circle ${glowRadius}px at var(--mouse-x, 50%) var(--mouse-y, 50%), transparent 30%, black 100%)`,
          opacity: glowIntensity,
          transition: 'opacity 0.4s ease',
          animation: `borderGlowSpin ${animationSpeed}s linear infinite`,
          pointerEvents: 'none',
          zIndex: -1,
        }}
        className="border-glow-layer"
      />
      {/* 静态边框 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${borderRadius}px`,
          border: `${borderWidth}px solid rgba(79, 124, 255, 0.12)`,
          pointerEvents: 'none',
          zIndex: -1,
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        }}
        className="border-glow-static"
      />
      {children}
      <style>{`
        @property --border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes borderGlowSpin {
          to { --border-angle: 360deg; }
        }
        .border-glow-container:hover .border-glow-layer {
          opacity: ${hoverIntensity} !important;
        }
        .border-glow-container:hover .border-glow-static {
          border-color: rgba(79, 124, 255, 0.4) !important;
          box-shadow: 0 0 20px rgba(79, 124, 255, 0.12) !important;
        }
      `}</style>
    </div>
  )
}

// 鼠标跟随 hook
export function useBorderGlow(containerRef) {
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--mouse-x', `${x}%`)
      el.style.setProperty('--mouse-y', `${y}%`)
    }
    const handleMouseLeave = () => {
      el.style.setProperty('--mouse-x', '50%')
      el.style.setProperty('--mouse-y', '50%')
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    el.style.setProperty('--mouse-x', '50%')
    el.style.setProperty('--mouse-y', '50%')

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [containerRef])
}

// 封装好的带光效卡片
export function GlowCard({ children, className = '', style = {}, ...props }) {
  const ref = React.useRef(null)
  useBorderGlow(ref)

  return (
    <div ref={ref} className={`border-glow-container ${className}`} style={style} {...props}>
      <BorderGlow>
        {children}
      </BorderGlow>
    </div>
  )
}

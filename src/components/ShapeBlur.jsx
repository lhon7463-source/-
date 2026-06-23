import React from 'react'

// 简化版毛玻璃发光卡片
export function ShapeBlurCard({ children }) {
  return (
    <div className="shape-blur-wrap" style={{
      position: 'relative',
      borderRadius: '14px',
      isolation: 'isolate',
    }}>
      {/* 毛玻璃发光层 */}
      <div style={{
        position: 'absolute',
        inset: '-4px',
        borderRadius: '16px',
        background: 'radial-gradient(circle 100px at var(--sb-x, 50%) var(--sb-y, 50%), rgba(79,124,255,0.3) 0%, rgba(79,124,255,0.08) 40%, transparent 70%)',
        opacity: 'var(--sb-opacity, 0)',
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
        zIndex: -1,
        filter: 'blur(8px)',
        WebkitFilter: 'blur(8px)',
      }} />
      {children}
      <style>{`
        .shape-blur-wrap:hover { --sb-opacity: 1; }
      `}</style>
    </div>
  )
}

// 容器级鼠标跟踪
export function ShapeBlurContainer({ children }) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--sb-x', `${((e.clientX - r.left) / r.width) * 100}%`)
      el.style.setProperty('--sb-y', `${((e.clientY - r.top) / r.height) * 100}%`)
    }
    const onLeave = () => {
      el.style.setProperty('--sb-x', '50%')
      el.style.setProperty('--sb-y', '50%')
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <div ref={ref} className="shape-blur-container">{children}</div>
}

export default function ShapeBlur({ children }) {
  return <ShapeBlurContainer><ShapeBlurCard>{children}</ShapeBlurCard></ShapeBlurContainer>
}

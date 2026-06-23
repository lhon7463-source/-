import React, { useEffect, useRef } from 'react'

const BlackHole = ({ children }) => {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')

    const getSize = () => {
      const rect = container.getBoundingClientRect()
      return [rect.width || window.innerWidth, rect.height || window.innerHeight]
    }

    let [w, h] = getSize()
    canvas.width = w
    canvas.height = h

    let animId
    const mouse = { x: w/2, y: h/2 }

    const PARTICLE_COUNT = 400
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 40 + Math.random() * 400
      particles.push({
        angle,
        radius,
        speed: (0.3 + Math.random()) / (radius * 0.06) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 2 + 0.5,
        opacity: 0.2 + Math.random() * 0.7,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.003 + Math.random() * 0.01,
        wobbleAmp: 10 + Math.random() * 50,
      })
    }

    const CORE = 150
    const core = []
    for (let i = 0; i < CORE; i++) {
      core.push({ angle: Math.random()*Math.PI*2, r: Math.random()*30, speed: (0.5+Math.random()*2)*(Math.random()>0.5?1:-1), size: Math.random()*1.5+0.2, alpha: 0.3+Math.random()*0.7 })
    }

    let time = 0

    const draw = () => {
      time++
      const cx = w/2 + (mouse.x - w/2) * 0.1
      const cy = h/2 + (mouse.y - h/2) * 0.1

      ctx.fillStyle = 'rgba(10,10,10,0.15)'
      ctx.fillRect(0, 0, w, h)

      // 外光晕
      const g1 = ctx.createRadialGradient(cx, cy, 10, cx, cy, 350)
      g1.addColorStop(0, 'rgba(255,255,255,0.06)')
      g1.addColorStop(0.5, 'rgba(180,180,180,0.03)')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(cx-400,cy-400,800,800)

      // 吸积盘粒子
      for (const p of particles) {
        p.angle += p.speed * 0.005
        const wobble = Math.sin(time * p.wobbleSpeed + p.wobble) * p.wobbleAmp
        const r = p.radius + wobble
        const px = cx + Math.cos(p.angle) * r
        const py = cy + Math.sin(p.angle) * r * 0.55
        const dist = Math.hypot(px-cx, py-cy)
        const bright = 1 - Math.min(dist/350, 1)
        ctx.beginPath()
        ctx.arc(px, py, p.size*(1+bright*0.5), 0, Math.PI*2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity*(0.2+bright*0.8)})`
        ctx.fill()
      }

      // 核心粒子
      ctx.globalCompositeOperation = 'lighter'
      for (const cp of core) { cp.angle+=cp.speed*0.01; const x=cx+Math.cos(cp.angle)*cp.r; const y=cy+Math.sin(cp.angle)*cp.r*0.6; ctx.beginPath(); ctx.arc(x,y,cp.size,0,Math.PI*2); ctx.fillStyle=`rgba(170,210,255,${cp.alpha})`; ctx.fill() }
      ctx.globalCompositeOperation = 'source-over'

      // 光子环
      for (let i=0;i<3;i++){ ctx.beginPath(); ctx.arc(cx,cy,38+i*7,0,Math.PI*2); ctx.strokeStyle=`rgba(140,200,255,${0.08-i*0.02})`; ctx.lineWidth=1.2; ctx.stroke() }

      // 核心亮光
      const g2 = ctx.createRadialGradient(cx,cy,0,cx,cy,40)
      g2.addColorStop(0,'rgba(255,255,255,0.25)')
      g2.addColorStop(0.5,'rgba(180,180,180,0.08)')
      g2.addColorStop(1,'transparent')
      ctx.fillStyle=g2; ctx.fillRect(cx-60,cy-60,120,120)

      animId = requestAnimationFrame(draw)
    }

    const onMouse = (e) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
    }
    window.addEventListener('mousemove', onMouse)

    const ro = new ResizeObserver(() => {
      const [nw, nh] = getSize()
      if (nw > 0 && nh > 0) { canvas.width = nw; canvas.height = nh; w = nw; h = nh }
    })
    ro.observe(container)

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'flow-root' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}

export default BlackHole

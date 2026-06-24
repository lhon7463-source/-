import React, { useState, useEffect, useRef } from 'react'
import GlitchText from './GlitchText'
import Threads from './Threads'
import './Hero.css'

const NAV_ITEMS = [
  { id: 'about', label: '关于我' },
  { id: 'projects', label: '作品' },
  { id: 'skills', label: '优势' },
  { id: 'contact', label: '联系我', contact: true },
]

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const logoRef = useRef(null)

  // Ref 快照避免 useEffect 反复绑定/解绑
  const stateRef = useRef({ scrolled, activeIndex })
  stateRef.current = { scrolled, activeIndex }

  useEffect(() => {
    const lastScroll = { t: 0 }
    let raf = 0
    // 缓存 sections 引用，避免每次 scroll 都 getElementById
    const sections = NAV_ITEMS.map(i => document.getElementById(i.id))
    const onTick = () => {
      const { scrolled: wasScrolled, activeIndex: wasActive } = stateRef.current
      const y = window.scrollY
      if (y > 40 !== wasScrolled) setScrolled(y > 40)

      const vh = window.innerHeight
      let bestIdx = wasActive, bestRatio = -1
      sections.forEach((sec, i) => {
        if (!sec) return
        const r = sec.getBoundingClientRect()
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0))
        const ratio = visible / Math.min(r.height, vh)
        if (ratio > bestRatio) { bestRatio = ratio; bestIdx = i }
      })
      if (bestIdx !== wasActive) setActiveIndex(bestIdx)
    }
    onTick.current = onTick
    const onScroll = () => {
      const now = performance.now()
      if (now - lastScroll.t < 80) {
        if (!raf) raf = requestAnimationFrame(() => { raf = 0; onTick.current() })
        return
      }
      lastScroll.t = now
      onTick.current()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onTick.current()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  const scrollTo = (id, idx) => {
    setActiveIndex(idx)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const onLogoEnter = () => { if (logoRef.current) logoRef.current.classList.add('spin') }
  const onLogoLeave = () => { if (logoRef.current) logoRef.current.classList.remove('spin') }

  return (
    <section className="hero">
      <div className="hero-fluid">
        <Threads
          color={[1, 1, 1]}
          amplitude={1}
          distance={0}
          enableMouseInteraction
        />
      </div>
      <div className="hero-vignette" />

      <nav className={`hero-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <div
            ref={logoRef}
            className="nav-logo"
            onMouseEnter={onLogoEnter}
            onMouseLeave={onLogoLeave}
          >
            Lllhccc
          </div>
          <ul className="pill-nav">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id}>
                <button
                  className={`pill ${item.contact ? 'pill--contact' : ''} ${activeIndex === i ? 'pill--active' : ''}`}
                  onClick={() => scrollTo(item.id, i)}
                >
                  <span className="pill-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="hero-content container">
        <p className="hero-label">AI DESIGNER · AIGC CREATOR</p>
        <h1 className="hero-title">
          <GlitchText
            speed={1}
            enableShadows
            enableOnHover={false}
          >
            陆鸿成
          </GlitchText>
          <span className="hero-title-accent">.</span>
        </h1>
        <p className="hero-subtitle">
          用 AI 重新定义视觉创作边界
        </p>
        <div className="hero-actions">
          <button className="btn-pill btn-pill--primary" onClick={() => scrollTo('projects', 1)}>
            <span>开始</span>
          </button>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <span />
      </div>
    </section>
  )
}
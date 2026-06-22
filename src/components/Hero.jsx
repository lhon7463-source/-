import React, { useState, useEffect } from 'react'
import './Hero.css'

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      {/* 视频背景 */}
      <video
        className="hero-video"
        src="/works/%E5%8F%8C%E9%9B%84%E5%86%B3/%E5%8F%8C%E9%9B%84%E5%86%B3%E7%9F%AD%E7%89%87.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="hero-overlay" />

      {/* 导航栏 */}
      <nav className={`hero-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <div className="nav-logo">LHC</div>
          <ul className="nav-links">
            <li><button onClick={() => scrollTo('about')}>关于我</button></li>
            <li><button onClick={() => scrollTo('projects')}>作品</button></li>
            <li><button onClick={() => scrollTo('skills')}>优势</button></li>
            <li>
              <button className="nav-contact" onClick={() => scrollTo('contact')}>
                联系我
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="hero-content container">
        <p className="hero-label">AI DESIGNER · AIGC CREATOR</p>
        <h1 className="hero-title">
          陆鸿成
          <span className="hero-title-accent">.</span>
        </h1>
        <p className="hero-subtitle">
          用 AI 重新定义视觉创作边界
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('projects')}>
            查看作品
          </button>
          <button className="btn-ghost" onClick={() => scrollTo('contact')}>
            联系我
          </button>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="hero-scroll-hint">
        <span />
      </div>
    </section>
  )
}

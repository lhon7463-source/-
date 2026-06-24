import React from 'react'
import GlitchText from './GlitchText'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-inner">
        <div className="about-image-wrap">
          <GlitchText className="glitch-img" enableShadows={false}>
            <img
              src="/f30b8756.jpg"
              alt="陆鸿成"
              className="about-avatar"
              loading="lazy"
              decoding="async"
              onError={e => { e.target.style.display = 'none' }}
            />
          </GlitchText>
        </div>

        <div className="about-content">
          <p className="section-tag">ABOUT ME</p>
          <h2 className="about-title">陆鸿成</h2>
          <p className="about-role">AI 设计师 · AIGC 内容创作者</p>
          <p className="about-bio">
            专注于用 AI 技术进行视觉内容创作，涵盖 AI 视频生成、角色设计、分镜创作与壁纸设计。
            擅长将前沿 AI 工具与设计思维融合，创作出具有叙事感和视觉冲击力的 AIGC 作品。
          </p>
          <div className="about-contacts">
            <a href="mailto:2608222300@qq.com" className="contact-item">
              <span className="contact-icon">✉</span>
              2608222300@qq.com
            </a>
            <a href="tel:+8613324843575" className="contact-item">
              <span className="contact-icon">✆</span>
              +86 133 2484 3575
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

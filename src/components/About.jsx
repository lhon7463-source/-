import React from 'react'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about-inner">
        <div className="about-image-wrap">
          <img
            src="/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E4%B8%89%E8%A7%86%E5%9B%BE.jpg"
            alt="陆鸿成"
            className="about-avatar"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="about-image-glow" />
        </div>

        <div className="about-content">
          <p className="about-tag">ABOUT ME</p>
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

import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-bg" />
      <div className="container footer-inner">
        <p className="footer-tag">GET IN TOUCH</p>
        <h2 className="footer-title">
          有项目想聊？<br />
          <span>随时联系我。</span>
        </h2>
        <div className="footer-contacts">
          <a href="mailto:2608222300@qq.com" className="footer-link">
            <span className="footer-link-label">邮箱</span>
            <span className="footer-link-value">2608222300@qq.com</span>
          </a>
          <div className="footer-divider" />
          <a href="tel:+8613324843575" className="footer-link">
            <span className="footer-link-label">电话</span>
            <span className="footer-link-value">+86 133 2484 3575</span>
          </a>
          <div className="footer-divider" />
          <div className="footer-link">
            <span className="footer-link-label">小红书</span>
            <span className="footer-link-value">@陆鸿成</span>
          </div>
        </div>
        <p className="footer-copy">© 2026 陆鸿成 · AI Designer</p>
      </div>
    </footer>
  )
}

import React from 'react'
import './Skills.css'

const skills = [
  {
    icon: '◈',
    title: 'AI 视频创作',
    desc: '熟练运用 Kling、Runway、Pika 等主流 AI 视频工具，独立完成从脚本到成片的全流程创作。',
  },
  {
    icon: '◉',
    title: '角色设计',
    desc: '具备完整的 AI 角色三视图设计能力，风格统一、细节丰富，可用于动画和游戏场景。',
  },
  {
    icon: '◇',
    title: '分镜叙事',
    desc: '将故事转化为清晰的分镜脚本，节奏把控强，画面感突出，善于用视觉语言讲述情感故事。',
  },
  {
    icon: '◈',
    title: 'AIGC 图像创作',
    desc: '掌握 Midjourney、Stable Diffusion 等工具，擅长风格化壁纸与概念图创作，作品已在小红书发布。',
  },
  {
    icon: '◉',
    title: '提示词工程',
    desc: '深度理解 AI 模型的语言逻辑，精准撰写提示词，高效实现预期创作效果。',
  },
  {
    icon: '◇',
    title: '全流程整合',
    desc: '能够整合多种 AI 工具协同工作，独立完成从概念策划到最终输出的端到端 AIGC 项目。',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <p className="section-tag">EXPERTISE</p>
        <h2 className="section-title">个人优势</h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill-card">
              <div className="skill-icon">{s.icon}</div>
              <h3 className="skill-title">{s.title}</h3>
              <p className="skill-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

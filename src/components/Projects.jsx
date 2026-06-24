import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import PixelCard from './PixelCard'
import BorderGlow from './BorderGlow'
import './Projects.css'

const projects = [
  {
    id: 0,
    title: '夏日回音',
    type: 'video',
    tag: 'AI 短片',
    video: '/ai-works/summer/short-film.mp4',
    poster: '/ai-works/summer/video-cover.jpg',
    storyboards: [
      '/ai-works/summer/cover.jpg',
      '/ai-works/summer/storyboard-2.jpg',
      '/ai-works/summer/storyboard-3.jpg',
      '/ai-works/summer/storyboard-4.jpg',
      '/ai-works/summer/storyboard-5.jpg',
      '/ai-works/summer/scene-2.png',
    ],
  },
  {
    id: 1,
    title: '救命！玉米星君的周末也太像我本人了',
    type: 'video',
    tag: 'AI 短片',
    video: '/ai-works/cornstar/short-film.mp4',
    poster: '/ai-works/cornstar/character-views.jpg',
    storyboards: [
      '/ai-works/cornstar/storyboard-1.jpg',
      '/ai-works/cornstar/storyboard-2.jpg',
      '/ai-works/cornstar/storyboard-3.jpg',
      '/ai-works/cornstar/storyboard-4.jpg',
      '/ai-works/cornstar/storyboard-5.jpg',
      '/ai-works/cornstar/storyboard-6.jpg',
      '/ai-works/cornstar/storyboard-7.jpg',
      '/ai-works/cornstar/storyboard-8.jpg',
    ],
  },
  {
    id: 2,
    title: '小红书原创AIGC壁纸账号',
    type: 'images',
    tag: 'AI 壁纸',
    images: [
      '/f30b8756.jpg',
      '/ai-works/xiaohongshu/original/wallpaper-20260507004321.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260508171611.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260511165938.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260511170705.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260513161443.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260513163653.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260514113352.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260516035633.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260516040011.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260516040624.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260516041236.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260516042454.png',
      '/ai-works/xiaohongshu/original/wallpaper-20260516042638.png',
      '/ai-works/xiaohongshu/original/No.018.png',
      '/ai-works/xiaohongshu/original/No.019.png',
      '/ai-works/xiaohongshu/original/No.020.png',
      '/ai-works/xiaohongshu/original/No.021.png',
      '/ai-works/xiaohongshu/original/No.022.png',
      '/ai-works/xiaohongshu/original/No.023.png',
      '/ai-works/xiaohongshu/original/No.024.png',
      '/ai-works/xiaohongshu/original/No.025.png',
      '/ai-works/xiaohongshu/original/No.026.png',
      '/ai-works/xiaohongshu/original/No.027.png',
      '/ai-works/xiaohongshu/original/No.028.png',
      '/ai-works/xiaohongshu/original/No.029.png',
      '/ai-works/xiaohongshu/original/No.030.png',
      '/ai-works/xiaohongshu/original/No.031.png',
      '/ai-works/xiaohongshu/original/No.032.png',
      '/ai-works/xiaohongshu/original/No.033.png',
      '/ai-works/xiaohongshu/original/No.034.png',
      '/ai-works/xiaohongshu/original/No.035.png',
      '/ai-works/xiaohongshu/original/No.036.png',
      '/ai-works/xiaohongshu/original/No.037.png',
      '/ai-works/xiaohongshu/original/No.038.png',
      '/ai-works/xiaohongshu/original/No.039.png',
      '/ai-works/xiaohongshu/original/No.040.png',
      '/ai-works/xiaohongshu/original/No.wx001.png',
      '/ai-works/xiaohongshu/original/No.wx002.png',
      '/ai-works/xiaohongshu/original/No.wx003.png',
      '/ai-works/xiaohongshu/original/No.wx004.png',
      '/ai-works/xiaohongshu/original/No.wx005.png',
    ],
  },
  {
    id: 3,
    title: '雨中相遇',
    type: 'video',
    tag: 'AI 短片',
    video: '/ai-works/rainy/short-film.mp4',
    poster: '/ai-works/rainy/cover.jpg',
    storyboards: [
      '/ai-works/rainy/cover.jpg',
    ],
  },
  {
    id: 4,
    title: '打斗演示',
    type: 'video',
    tag: 'AI 动作',
    video: '/ai-works/combat/demo.mp4',
    storyboards: [
      '/ai-works/combat/character-design.png',
      '/ai-works/combat/boss-design.png',
    ],
  },
  {
    id: 5,
    title: '双雄决',
    type: 'video',
    tag: 'AI 短片',
    video: '/ai-works/shuangxiong/short-film.mp4',
    poster: '/ai-works/shuangxiong/cover.jpg',
    storyboards: [
      '/ai-works/shuangxiong/lingyun.png',
      '/ai-works/shuangxiong/storyboard-1.png',
      '/ai-works/shuangxiong/storyboard-2.png',
      '/ai-works/shuangxiong/storyboard-3.png',
      '/ai-works/shuangxiong/fight-storyboard.png',
      '/ai-works/shuangxiong/crack-mountain.png',
    ],
  },
]

function ImageGallery({ images }) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const close = useCallback(() => setLightbox(false), [])
  const prev = useCallback((e) => { e?.stopPropagation(); setIndex(i => (i === 0 ? images.length - 1 : i - 1)) }, [images.length])
  const next = useCallback((e) => { e?.stopPropagation(); setIndex(i => (i === images.length - 1 ? 0 : i + 1)) }, [images.length])

  // Only preload neighbors (±2) when lightbox opens — saves bandwidth
  useEffect(() => {
    if (!lightbox) return
    const preload = (i) => {
      const img = new window.Image()
      img.src = images[i]
    }
    for (let d = -2; d <= 2; d++) {
      const i = (index + d + images.length) % images.length
      if (i !== index) preload(i)
    }
  }, [lightbox, index, images])

  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev(e)
      else if (e.key === 'ArrowRight') next(e)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [lightbox, close, prev, next])

  return (
    <>
      <div className="gallery">
        <img
          src={images[index]} alt="" className="gallery-img"
          onClick={(e) => { e.stopPropagation(); setLightbox(true) }}
          style={{ cursor: 'pointer' }}
        />
        <div className="gallery-controls">
          <button onClick={prev}>‹</button>
          <span>{index + 1} / {images.length}</span>
          <button onClick={next}>›</button>
        </div>
      </div>
      {lightbox && createPortal(
        <div className="image-modal" onClick={close} onMouseDown={(e) => e.stopPropagation()}>
          <button className="image-modal-close" onClick={(e) => { e.stopPropagation(); close() }}>×</button>
          <button className="image-modal-nav image-modal-nav--prev" onClick={(e) => { e.stopPropagation(); prev(e) }}>‹</button>
          <button className="image-modal-nav image-modal-nav--next" onClick={(e) => { e.stopPropagation(); next(e) }}>›</button>
          <div className="image-modal-stage" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
            {images.map((src, i) => {
              // 只渲染当前及 ±1 邻居（环形距离），避免一次性下载全部图片
              const dist = Math.min(
                Math.abs(i - index),
                images.length - Math.abs(i - index)
              )
              if (dist > 1) return null
              return (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="image-modal-img"
                  draggable={false}
                  style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
                />
              )
            })}
          </div>
          <p className="image-modal-title" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>{index + 1} / {images.length}</p>
        </div>,
        document.body
      )}
    </>
  )
}

function StoryboardStrip({ images }) {
  const [lightbox, setLightbox] = useState(false)
  const [index, setIndex] = useState(0)

  const openLightbox = (i) => {
    setIndex(i)
    setLightbox(true)
  }
  const closeLightbox = () => setLightbox(false)
  const prev = (e) => { e?.stopPropagation(); setIndex(i => (i === 0 ? images.length - 1 : i - 1)) }
  const next = (e) => { e?.stopPropagation(); setIndex(i => (i === images.length - 1 ? 0 : i + 1)) }

  useEffect(() => {
    if (!lightbox) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [lightbox, index])

  return (
    <>
      <div className="storyboard-strip">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`分镜${i + 1}`}
            className="storyboard-thumb"
            loading="lazy"
            decoding="async"
            onClick={(e) => { e.stopPropagation(); openLightbox(i) }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      {lightbox && createPortal(
        <div className="image-modal" onClick={closeLightbox} onMouseDown={(e) => e.stopPropagation()}>
          <button className="image-modal-close" onClick={(e) => { e.stopPropagation(); closeLightbox() }}>×</button>
          <button className="image-modal-nav image-modal-nav--prev" onClick={(e) => { e.stopPropagation(); prev(e) }}>‹</button>
          <button className="image-modal-nav image-modal-nav--next" onClick={(e) => { e.stopPropagation(); next(e) }}>›</button>
          <div className="image-modal-stage" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
            {images.map((src, i) => {
              // 只渲染当前及 ±1 邻居（环形距离），避免一次性下载全部图片
              const dist = Math.min(
                Math.abs(i - index),
                images.length - Math.abs(i - index)
              )
              if (dist > 1) return null
              return (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="image-modal-img"
                  draggable={false}
                  style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
                />
              )
            })}
          </div>
          <p className="image-modal-title" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>{index + 1} / {images.length}</p>
        </div>,
        document.body
      )}
    </>
  )
}

// 点击视频后弹出的全屏播放器
function VideoModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="video-modal" onClick={onClose}>
      <button className="video-modal-close" onClick={onClose}>×</button>
      <div className="video-modal-inner" onClick={(e) => e.stopPropagation()}>
        <video
          src={project.video}
          poster={project.poster}
          className="video-modal-player"
          controls
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          muted
          autoPlay
          playsInline
          onContextMenu={(e) => e.preventDefault()}
        />
        <p className="video-modal-title">{project.title}</p>
      </div>
    </div>
  )
}

function ProjectCard({ project, onOpen }) {
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect() } },
      { rootMargin: '400px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleMouseEnter = () => {
    if (videoRef.current) {
      // 移到 hover 才播放，避免 5 个 video 一起下载
      videoRef.current.play().catch(() => {})
    }
  }
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  // 标记用户偏好减弱动画 — 关掉视频预览以节省流量
  const reduceMotion = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  if (project.type === 'images') {
    return (
      <div ref={cardRef}>
        <PixelCard className="project-card" colors="#ffffff,#cccccc">
          <div
            style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16, textAlign: 'left', alignItems: 'flex-start', width: '100%' }}
          >
            <div className="card-tag">{project.tag}</div>
            <h3 className="card-title" style={{ textAlign: 'left' }}>{project.title}</h3>
            <BorderGlow
              className="card-media-glow"
              borderRadius={12}
              edgeSensitivity={36}
              glowRadius={70}
              glowIntensity={0.95}
              coneSpread={30}
              colors={['#c084fc', '#f472b6', '#38bdf8', '#fde68a']}
            >
              <div className="card-video-wrap">
                <ImageGallery images={project.images} />
              </div>
            </BorderGlow>
            <div className="storyboard-strip" aria-hidden="true" />
          </div>
        </PixelCard>
      </div>
    )
  }

  return (
    <div ref={cardRef}>
      <PixelCard className="project-card" colors="#ffffff,#cccccc">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onOpen(project)}
          style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}
        >
          <div className="card-tag">{project.tag}</div>
          <h3 className="card-title">{project.title}</h3>
          <BorderGlow
            className="card-media-glow"
            borderRadius={12}
            edgeSensitivity={36}
            glowRadius={70}
            glowIntensity={0.95}
            coneSpread={30}
            colors={['#c084fc', '#f472b6', '#38bdf8', '#fde68a']}
          >
            <div className="card-video-wrap">
              {inView && (
                <video
                  ref={videoRef}
                  src={project.video}
                  poster={project.poster}
                  className="card-video"
                  muted
                  loop
                  playsInline
                  preload="none"
                />
            )}
            <div className="card-video-overlay">
              <span className="play-icon">▶</span>
            </div>
          </div>
          </BorderGlow>
          <StoryboardStrip images={project.storyboards} />
        </div>
      </PixelCard>
    </div>
  )
}

export default function Projects() {
  const [active, setActive] = useState(null)
  return (
    <section id="projects" className="projects">
      <div className="container">
        <p className="section-tag">SELECTED WORKS</p>
        <h2 className="section-title">精选项目</h2>
        <div className="projects-grid">
          {projects.map(p => <ProjectCard key={p.id} project={p} onOpen={setActive} />)}
        </div>
      </div>
      {active && <VideoModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}

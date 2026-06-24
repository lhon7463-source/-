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
    video: '/ai-works/夏日回音/夏日回音.mp4',
    poster: '/ai-works/夏日回音/视频封面.jpg',
    storyboards: [
      '/ai-works/夏日回音/封面.jpg',
      '/ai-works/夏日回音/No.2木.jpg',
      '/ai-works/夏日回音/No.3青.jpg',
      '/ai-works/夏日回音/No.4晨.jpg',
      '/ai-works/夏日回音/No.5雨.jpg',
      '/ai-works/夏日回音/场景2.png',
    ],
  },
  {
    id: 1,
    title: '救命！玉米星君的周末也太像我本人了',
    type: 'video',
    tag: 'AI 短片',
    video: '/ai-works/救命！玉米星君的周末也太像我本人了/救命！玉米星君的周末也太像我本人了.mp4',
    poster: '/ai-works/救命！玉米星君的周末也太像我本人了/玉米星君三视图.jpg',
    storyboards: [
      '/ai-works/救命！玉米星君的周末也太像我本人了/分镜1.jpg',
      '/ai-works/救命！玉米星君的周末也太像我本人了/分镜2.jpg',
      '/ai-works/救命！玉米星君的周末也太像我本人了/分镜3.jpg',
      '/ai-works/救命！玉米星君的周末也太像我本人了/分镜4.jpg',
      '/ai-works/救命！玉米星君的周末也太像我本人了/分镜5.jpg',
      '/ai-works/救命！玉米星君的周末也太像我本人了/分镜6.jpg',
      '/ai-works/救命！玉米星君的周末也太像我本人了/分镜7.jpg',
      '/ai-works/救命！玉米星君的周末也太像我本人了/分镜8.jpg',
    ],
  },
  {
    id: 2,
    title: '小红书原创AIGC壁纸账号',
    type: 'images',
    tag: 'AI 壁纸',
    images: [
      '/f30b8756.jpg',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260507004321.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260508171611.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260511165938.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260511170705.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260513161443.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260513163653.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260514113352.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260516035633.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260516040011.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260516040624.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260516041236.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260516042454.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/wallpaper-20260516042638.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.018.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.019.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.020.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.021.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.022.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.023.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.024.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.025.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.026.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.027.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.028.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.029.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.030.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.031.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.032.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.033.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.034.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.035.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.036.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.037.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.038.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.039.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.040.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.wx001.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.wx002.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.wx003.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.wx004.png',
      '/ai-works/小红书原创AIGC壁纸账号/原创AI壁纸作品/No.wx005.png',
    ],
  },
  {
    id: 3,
    title: '雨中相遇',
    type: 'video',
    tag: 'AI 短片',
    video: '/ai-works/雨中相遇/雨中相遇.mp4',
    poster: '/ai-works/雨中相遇/雨中相遇-封面.jpg',
    storyboards: [
      '/ai-works/雨中相遇/雨中相遇-封面.jpg',
    ],
  },
  {
    id: 4,
    title: '打斗演示',
    type: 'video',
    tag: 'AI 动作',
    video: '/ai-works/打斗演示/打斗演示.mp4',
    storyboards: [
      '/ai-works/打斗演示/主角设定图.png',
      '/ai-works/打斗演示/boos设定图.png',
    ],
  },
  {
    id: 5,
    title: '双雄决',
    type: 'video',
    tag: 'AI 短片',
    video: '/ai-works/双雄决/双雄决短片.mp4',
    poster: '/ai-works/双雄决/封面.jpg',
    storyboards: [
      '/ai-works/双雄决/凌云.png',
      '/ai-works/双雄决/分镜图1.png',
      '/ai-works/双雄决/分镜图2.png',
      '/ai-works/双雄决/分镜图3.png',
      '/ai-works/双雄决/打斗分镜.png',
      '/ai-works/双雄决/裂山.png',
    ],
  },
]

function ImageGallery({ images }) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const close = useCallback(() => setLightbox(false), [])
  const prev = useCallback((e) => { e?.stopPropagation(); setIndex(i => (i === 0 ? images.length - 1 : i - 1)) }, [images.length])
  const next = useCallback((e) => { e?.stopPropagation(); setIndex(i => (i === images.length - 1 ? 0 : i + 1)) }, [images.length])

  // Preload all images into browser cache when lightbox opens
  useEffect(() => {
    if (!lightbox) return
    images.forEach(src => {
      const img = new window.Image()
      img.src = src
    })
  }, [lightbox, images])

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
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className="image-modal-img"
                draggable={false}
                style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
              />
            ))}
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
            {images.map((src, i) => (
              <img
                key={src}
                src={src}
                alt=""
                className="image-modal-img"
                draggable={false}
                style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
              />
            ))}
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
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {})
  }
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

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

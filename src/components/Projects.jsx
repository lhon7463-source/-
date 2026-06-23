import React, { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import PixelCard from './PixelCard'
import './Projects.css'

const projects = [
  {
    id: 0,
    title: '夏日回音',
    type: 'video',
    tag: 'AI 短片',
    video: '/works/%E5%A4%8F%E6%97%A5%E5%9B%9E%E9%9F%B3/%E5%A4%8F%E6%97%A5%E5%9B%9E%E9%9F%B3.mp4',
    poster: '/works/%E5%A4%8F%E6%97%A5%E5%9B%9E%E9%9F%B3/%E5%B0%81%E9%9D%A2.jpg',
    storyboards: [
      '/works/%E5%A4%8F%E6%97%A5%E5%9B%9E%E9%9F%B3/%232%E6%9C%A8.jpg',
      '/works/%E5%A4%8F%E6%97%A5%E5%9B%9E%E9%9F%B3/%233%E9%9D%92.jpg',
      '/works/%E5%A4%8F%E6%97%A5%E5%9B%9E%E9%9F%B3/%234%E6%99%A8.jpg',
      '/works/%E5%A4%8F%E6%97%A5%E5%9B%9E%E9%9F%B3/%235%E9%9B%A8.jpg',
    ],
  },
  {
    id: 1,
    title: '救命！玉米星君的周末也太像我本人了',
    type: 'video',
    tag: 'AI 短片',
    video: '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86.mp4',
    storyboards: [
      '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E5%88%86%E9%95%9C1.jpg',
      '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E5%88%86%E9%95%9C2.jpg',
      '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E5%88%86%E9%95%9C3.jpg',
      '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E5%88%86%E9%95%9C4.jpg',
      '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E5%88%86%E9%95%9C5.jpg',
      '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E5%88%86%E9%95%9C6.jpg',
      '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E5%88%86%E9%95%9C7.jpg',
      '/works/%E6%95%91%E5%91%BD%EF%BC%81%E7%8E%89%E7%B1%B3%E6%98%9F%E5%90%9B%E7%9A%84%E5%91%A8%E6%9C%AB%E4%B9%9F%E5%A4%AA%E5%83%8F%E6%88%91%E6%9C%AC%E4%BA%BA%E4%BA%86/%E5%88%86%E9%95%9C8.jpg',
    ],
  },
  {
    id: 2,
    title: '小红书原创AIGC壁纸账号',
    type: 'images',
    tag: 'AI 壁纸',
    images: [
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%E9%A6%96%E5%9B%BE_%E4%B8%8A%E4%BC%A0.jpg',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23018.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23019.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23020.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23021.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23022.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23023.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23024.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23025.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23026.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23027.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23028.png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23029%20(2).png',
      '/works/%E5%B0%8F%E7%BA%A2%E4%B9%A6%E5%8E%9F%E5%88%9BAIGC%E5%A3%81%E7%BA%B8%E8%B4%A6%E5%8F%B7/%E5%8E%9F%E5%88%9BAI%E5%A3%81%E7%BA%B8%E4%BD%9C%E5%93%81/%23030%20(2).png',
    ],
  },
  {
    id: 3,
    title: '雨中相遇',
    type: 'video',
    tag: 'AI 短片',
    video: '/works/%E9%9B%A8%E4%B8%AD%E7%9B%B8%E9%81%87/%E9%9B%A8%E4%B8%AD%E7%9B%B8%E9%81%87.mp4',
    poster: '/works/%E9%9B%A8%E4%B8%AD%E7%9B%B8%E9%81%87/%E9%9B%A8%E4%B8%AD%E7%9B%B8%E9%81%87-%E5%B0%81%E9%9D%A2.jpg',
    storyboards: [
      '/works/%E9%9B%A8%E4%B8%AD%E7%9B%B8%E9%81%87/%E9%9B%A8%E4%B8%AD%E7%9B%B8%E9%81%87-%E5%B0%81%E9%9D%A2.jpg',
    ],
  },
  {
    id: 4,
    title: '打斗演示',
    type: 'video',
    tag: 'AI 动作',
    video: '/works/%E6%89%93%E6%96%97%E6%BC%94%E7%A4%BA/%E6%89%93%E6%96%97%E6%BC%94%E7%A4%BA.mp4',
    storyboards: [
      '/works/%E6%89%93%E6%96%97%E6%BC%94%E7%A4%BA/boos%E8%AE%BE%E5%AE%9A%E5%9B%BE.png',
      '/works/%E6%89%93%E6%96%97%E6%BC%94%E7%A4%BA/%E4%B8%BB%E8%A7%92%E8%AE%BE%E5%AE%9A%E5%9B%BE.png',
    ],
  },
  {
    id: 5,
    title: '双雄决',
    type: 'video',
    tag: 'AI 短片',
    video: '/works/%E5%8F%8C%E9%9B%84%E5%86%B3/%E5%8F%8C%E9%9B%84%E5%86%B3%E7%9F%AD%E7%89%87.mp4',
    storyboards: [
      '/works/%E5%8F%8C%E9%9B%84%E5%86%B3/%E5%87%8C%E4%BA%91.png',
      '/works/%E5%8F%8C%E9%9B%84%E5%86%B3/%E5%88%86%E9%95%9C%E5%9B%BE1.png',
      '/works/%E5%8F%8C%E9%9B%84%E5%86%B3/%E5%88%86%E9%95%9C%E5%9B%BE2.png',
      '/works/%E5%8F%8C%E9%9B%84%E5%86%B3/%E8%A3%82%E5%B1%B1.png',
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
  if (!images || images.length === 0) return null
  const [load, setLoad] = useState(false)
  const stripRef = useRef(null)

  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLoad(true); io.disconnect() } },
      { rootMargin: '200px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={stripRef} className="storyboard-strip">
      {images.map((src, i) => (
        load ? <img key={i} src={src} alt={`分镜${i + 1}`} className="storyboard-thumb" loading="lazy" /> : <div key={i} className="storyboard-thumb storyboard-thumb--placeholder" />
      ))}
    </div>
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
            <div className="card-video-wrap">
              <ImageGallery images={project.images} />
            </div>
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

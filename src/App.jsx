import React from 'react'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'
import Grainient from './components/Grainient'

export default function App() {
  return (
    <>
      <Hero />
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(8, 8, 16, 0.95) 0%, rgba(8, 8, 16, 0.85) 40%, rgba(8, 8, 16, 0.4) 75%, rgba(8, 8, 16, 0) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <Grainient
            color1="#8e8e8f"
            color2="#09031e"
            color3="#5e6578"
            timeSpeed={0.25}
            colorBalance={-0.38}
            warpStrength={0.35}
            warpFrequency={2.2}
            warpSpeed={0.4}
            warpAmplitude={80}
            blendAngle={-8}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.04}
            grainScale={4}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
            randomBurst
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <About />
          <Projects />
          <Skills />
          <Footer />
        </div>
      </div>
    </>
  )
}

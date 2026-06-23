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
          height: 200,
          zIndex: 1,
          pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(8, 8, 16, 1) 0%, rgba(8, 8, 16, 0) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}>
          <Grainient
            color1="#5f5f5f"
            color2="#08021a"
            color3="#555c71"
            timeSpeed={0.25}
            colorBalance={0.04}
            warpStrength={1.25}
            warpFrequency={3.4}
            warpSpeed={1.8}
            warpAmplitude={50}
            blendAngle={-8}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={1.25}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={2.45}
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

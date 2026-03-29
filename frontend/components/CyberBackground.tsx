'use client'
import { useEffect, useRef } from 'react'

export default function CyberBackground() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    let renderer: import('three').WebGLRenderer | null = null
    let animId: number
    let cleanup: (() => void) | null = null

    const init = async () => {
      // Verify WebGL support
      const testCanvas = document.createElement('canvas')
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')
      if (!gl) {
        // Fallback: CSS gradient
        if (canvasRef.current) {
          canvasRef.current.style.background =
            'radial-gradient(ellipse at 20% 50%, #0a0f1f 0%, #0a0a0f 60%)'
        }
        return
      }

      try {
        const THREE = await import('three')

        const scene  = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        camera.position.z = 30

        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setClearColor(0x000000, 0)
        canvasRef.current?.appendChild(renderer.domElement)

        // Particle field
        const count = 1500
        const positions = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++) {
          positions[i] = (Math.random() - 0.5) * 100
        }
        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

        const mat = new THREE.PointsMaterial({
          color: 0x00ffcc,
          size: 0.15,
          transparent: true,
          opacity: 0.6,
        })
        const points = new THREE.Points(geo, mat)
        scene.add(points)

        let frameCount = 0
        const animate = () => {
          animId = requestAnimationFrame(animate)
          frameCount++
          points.rotation.y = frameCount * 0.0003
          points.rotation.x = frameCount * 0.0001
          renderer!.render(scene, camera)
        }
        animate()

        const onResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer!.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', onResize)

        cleanup = () => {
          cancelAnimationFrame(animId)
          window.removeEventListener('resize', onResize)
          renderer!.dispose()
          geo.dispose()
          mat.dispose()
          if (renderer!.domElement.parentNode) {
            renderer!.domElement.parentNode.removeChild(renderer!.domElement)
          }
        }
      } catch {
        // Three.js failed — fallback to CSS
        if (canvasRef.current) {
          canvasRef.current.style.background =
            'radial-gradient(ellipse at 20% 50%, #0a0f1f 0%, #0a0a0f 60%)'
        }
      }
    }

    init()

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <div
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}

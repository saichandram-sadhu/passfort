'use client'
import { useEffect, useRef } from 'react'
import AnalyzerPanel from '@/components/AnalyzerPanel'
import GeneratorPanel from '@/components/generator/GeneratorPanel'
import StatsPanel from '@/components/dashboard/StatsPanel'

export default function Home() {
  const heroRef    = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const initGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Hero entrance animation (immediate on load)
        if (heroRef.current) {
          gsap.fromTo(
            heroRef.current.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
          )
        }

        // Scroll-triggered sections
        if (contentRef.current) {
          const sections = contentRef.current.querySelectorAll('section')
          sections.forEach(section => {
            gsap.fromTo(
              section,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            )
          })
        }
      })
    }

    initGsap()

    return () => {
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <section
        ref={heroRef}
        id="hero"
        className="max-w-2xl mx-auto px-4 pt-24 pb-8 text-center space-y-4"
      >
        <div className="inline-block px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono mb-4">
          100% Client-Side Analysis
        </div>
        <h1 className="text-5xl font-bold text-white leading-tight">
          Pass<span className="text-[var(--accent)]">Fort</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Real-time password strength analysis. Your password never leaves your device.
        </p>
      </section>

      <div ref={contentRef}>
        <AnalyzerPanel />
        <GeneratorPanel />
        <StatsPanel />
      </div>

      <footer className="text-center py-8 text-gray-600 text-sm">
        PassFort — Passwords analyzed locally · Stats are anonymous
      </footer>
    </main>
  )
}

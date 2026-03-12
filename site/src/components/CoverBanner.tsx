import { useEffect, useRef } from 'react'
import './CoverBanner.css'

const CoverBanner = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const vh = window.innerHeight

        // Centro do banner em relação ao centro da viewport
        // -1 = topo da viewport, 0 = centralizado, 1 = base da viewport
        const center = (rect.top + rect.height / 2) / vh - 0.5

        // Fator de parallax: quanto maior, mais forte o efeito
        const PARALLAX = 160
        const offset = center * PARALLAX * 2

        section.style.backgroundPositionY = `calc(50% + ${offset}px)`
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="cover-banner"
      aria-label="A nossa meta é aprender. O nosso objetivo é impactar."
    />
  )
}

export default CoverBanner

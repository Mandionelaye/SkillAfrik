// components/AdSense.js
import React, { useEffect, useRef } from 'react'

const AdSenses = ({ slot, format = 'auto', responsive = true, style = {}, layout = '' }) => {
  const adRef = useRef(null)
  const adInitialized = useRef(false)

  useEffect(() => {
    // Vérifie si l'annonce a déjà été initialisée ou si window n'est pas défini
    if (adInitialized.current || typeof window === 'undefined') return

    // Vérifie si l'élément existe dans le DOM
    if (adRef.current) {
      try {
        // Initialise l'annonce une seule fois
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        adInitialized.current = true
      } catch (e) {
        console.error('AdSense error:', e)
      }
    }
  }, [])

  return (
    <div style={{ ...style, overflow: 'hidden', margin: '20px 0' }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2510660773997180"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  )
}

export default AdSenses
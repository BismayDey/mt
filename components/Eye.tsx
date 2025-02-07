"use client"

import { useState, useEffect } from "react"
import styles from "./Eye.module.css"

const Eye = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const eye = document.getElementById("eye")
      if (eye) {
        const eyeRect = eye.getBoundingClientRect()
        const eyeCenterX = eyeRect.left + eyeRect.width / 2
        const eyeCenterY = eyeRect.top + eyeRect.height / 2

        const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX)
        const distance = Math.min(
          eyeRect.width / 4,
          Math.hypot(event.clientX - eyeCenterX, event.clientY - eyeCenterY) / 5,
        )

        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance

        setEyePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div id="eye" className={styles.eye}>
      <div
        className={styles.iris}
        style={{
          transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
        }}
      >
        <div className={styles.pupil} />
      </div>
    </div>
  )
}

export default Eye


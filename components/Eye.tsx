"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Eye.module.css";

const Eye = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  const handleMovement = useCallback((clientX: number, clientY: number) => {
    const eye = document.getElementById("eye");
    if (eye) {
      const eyeRect = eye.getBoundingClientRect();
      const eyeCenterX = eyeRect.left + eyeRect.width / 2;
      const eyeCenterY = eyeRect.top + eyeRect.height / 2;

      const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
      const distance = Math.min(
        eyeRect.width / 4,
        Math.hypot(clientX - eyeCenterX, clientY - eyeCenterY) / 5
      );

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setEyePosition({ x, y });
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      handleMovement(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        handleMovement(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleMovement]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      id="eye"
      className={`${styles.eye} ${isBlinking ? styles.blink : ""} ${
        isTouching ? styles.touched : ""
      }`}
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => setIsTouching(false)}
    >
      <div className={styles.eyelid} />
      <div
        className={styles.iris}
        style={{
          transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
        }}
      >
        <div className={styles.pupil}>
          <div className={styles.reflection} />
        </div>
      </div>
    </div>
  );
};

export default Eye;

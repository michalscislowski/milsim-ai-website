"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import Link from "next/link";
import styles from "./page.module.css";

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  { id: 1, title: "Origin", subtitle: "Where it begins", color: "#0a0a0a", accent: "#ffffff" },
  { id: 2, title: "Threshold", subtitle: "Cross the boundary", color: "#1a0a2e", accent: "#a855f7" },
  { id: 3, title: "Depths", subtitle: "Into the unknown", color: "#0a1a2e", accent: "#3b82f6" },
  { id: 4, title: "Core", subtitle: "The center holds", color: "#0a2e1a", accent: "#10b981" },
  { id: 5, title: "Emergence", subtitle: "Rise renewed", color: "#2e1a0a", accent: "#f59e0b" },
];

export default function ZoomPage() {
  const containerRef = useRef(null);
  const layersRef = useRef([]);
  const progressRef = useRef(null);
  const currentLayerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const layers = layersRef.current;
      const totalLayers = layers.length;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (totalLayers + 1)}px`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const layerProgress = progress * totalLayers;
          const currentIndex = Math.min(Math.floor(layerProgress), totalLayers - 1);

          // Update progress bar
          if (progressRef.current) {
            progressRef.current.style.setProperty("--progress", `${progress * 100}%`);
          }

          // Update current layer indicator
          if (currentLayerRef.current) {
            currentLayerRef.current.textContent = `${currentIndex + 1} / ${totalLayers}`;
          }

          layers.forEach((layer, index) => {
            if (!layer) return;

            const frame = layer.querySelector(`.${styles.frame}`);
            const content = layer.querySelector(`.${styles.layerContent}`);
            const glow = layer.querySelector(`.${styles.frameGlow}`);

            // Calculate how far we are into this layer's animation
            const layerStart = index / totalLayers;
            const layerEnd = (index + 1) / totalLayers;
            const localProgress = Math.max(0, Math.min(1, (progress - layerStart) / (layerEnd - layerStart)));

            // Zoom calculation - exponential for dramatic effect
            const baseScale = Math.pow(3, index);
            const zoomMultiplier = Math.pow(3, localProgress);
            const scale = baseScale * zoomMultiplier;

            // Apply transforms
            gsap.set(frame, {
              scale: scale,
              opacity: localProgress < 0.95 ? 1 : 1 - (localProgress - 0.95) / 0.05,
            });

            // Content fades based on scale
            if (content) {
              let contentOpacity = 0;
              if (scale > 0.8 && scale < 2) {
                // Fade in when approaching, fade out when passing
                if (scale < 1.2) {
                  contentOpacity = (scale - 0.8) / 0.4;
                } else {
                  contentOpacity = 1 - (scale - 1.2) / 0.8;
                }
              }
              gsap.set(content, { opacity: Math.max(0, Math.min(1, contentOpacity)) });
            }

            // Glow intensifies as we approach center
            if (glow) {
              const glowIntensity = scale > 0.5 && scale < 1.5
                ? 1 - Math.abs(scale - 1) * 2
                : 0;
              gsap.set(glow, { opacity: glowIntensity * 0.6 });
            }
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div className={styles.page}>
        <Link href="/parallax" className={styles.backLink}>
          <span className={styles.arrow}>&larr;</span> Back to Parallax
        </Link>

        <div ref={containerRef} className={styles.container}>
          {/* Background gradient */}
          <div className={styles.background}></div>

          {/* Zoom layers */}
          <div className={styles.zoomContainer}>
            {LAYERS.map((layer, index) => (
              <div
                key={layer.id}
                ref={(el) => (layersRef.current[index] = el)}
                className={styles.layer}
                style={{
                  "--layer-color": layer.color,
                  "--layer-accent": layer.accent,
                  zIndex: LAYERS.length - index,
                }}
              >
                <div className={styles.frame}>
                  <div className={styles.frameGlow}></div>
                  <div className={styles.frameBorder}>
                    <div className={styles.cornerTL}></div>
                    <div className={styles.cornerTR}></div>
                    <div className={styles.cornerBL}></div>
                    <div className={styles.cornerBR}></div>
                  </div>
                  <div className={styles.frameInner}>
                    <div className={styles.layerContent}>
                      <span className={styles.layerNumber}>0{layer.id}</span>
                      <h2 className={styles.layerTitle}>{layer.title}</h2>
                      <p className={styles.layerSubtitle}>{layer.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center crosshair */}
          <div className={styles.crosshair}>
            <div className={styles.crosshairH}></div>
            <div className={styles.crosshairV}></div>
            <div className={styles.crosshairCenter}></div>
          </div>

          {/* Title overlay */}
          <div className={styles.titleOverlay}>
            <h1>Zoom Journey</h1>
            <p>Scroll to dive deeper</p>
          </div>

          {/* Progress indicator */}
          <div className={styles.progressContainer}>
            <div className={styles.progressLabel}>DEPTH</div>
            <div ref={progressRef} className={styles.progressTrack}>
              <div className={styles.progressFill}></div>
            </div>
            <div ref={currentLayerRef} className={styles.layerIndicator}>1 / 5</div>
          </div>

          {/* Navigation hint */}
          <div className={styles.navHint}>
            <Link href="/" className={styles.homeLink}>
              Return to Origin &rarr;
            </Link>
          </div>
        </div>

        <div className={styles.spacer}></div>
      </div>
    </ReactLenis>
  );
}

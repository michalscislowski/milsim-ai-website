"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import Link from "next/link";
import styles from "./page.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxPage() {
  const containerRef = useRef(null);
  const starsRef = useRef(null);
  const moonRef = useRef(null);
  const mountainsBackRef = useRef(null);
  const mountainsMidRef = useRef(null);
  const mountainsFrontRef = useRef(null);
  const treesRef = useRef(null);
  const fogRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const content1Ref = useRef(null);
  const content2Ref = useRef(null);
  const content3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main parallax timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
        },
      });

      // Stars - slowest movement
      tl.to(starsRef.current, {
        y: -100,
        ease: "none",
      }, 0);

      // Moon rises and crosses
      tl.to(moonRef.current, {
        y: -400,
        x: 200,
        scale: 0.8,
        ease: "none",
      }, 0);

      // Mountains back - slow
      tl.to(mountainsBackRef.current, {
        y: -200,
        ease: "none",
      }, 0);

      // Mountains mid - medium
      tl.to(mountainsMidRef.current, {
        y: -350,
        ease: "none",
      }, 0);

      // Mountains front - faster
      tl.to(mountainsFrontRef.current, {
        y: -500,
        ease: "none",
      }, 0);

      // Trees - fastest
      tl.to(treesRef.current, {
        y: -700,
        ease: "none",
      }, 0);

      // Fog drifts
      tl.to(fogRef.current, {
        y: -300,
        opacity: 0.3,
        ease: "none",
      }, 0);

      // Title fades and rises
      tl.to(titleRef.current, {
        y: -600,
        opacity: 0,
        ease: "none",
      }, 0);

      // Subtitle follows
      tl.to(subtitleRef.current, {
        y: -500,
        opacity: 0,
        ease: "none",
      }, 0);

      // Content sections appear and disappear
      tl.fromTo(content1Ref.current,
        { y: 200, opacity: 0 },
        { y: -400, opacity: 0, ease: "none" },
        0
      );

      tl.fromTo(content2Ref.current,
        { y: 400, opacity: 0 },
        { y: -200, opacity: 0, ease: "none" },
        0
      );

      tl.fromTo(content3Ref.current,
        { y: 600, opacity: 0 },
        { y: 0, opacity: 1, ease: "none" },
        0
      );

      // Content visibility keyframes
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // Content 1: visible 15-45%
          if (progress > 0.15 && progress < 0.45) {
            const localProgress = (progress - 0.15) / 0.3;
            const opacity = localProgress < 0.5
              ? localProgress * 2
              : 2 - localProgress * 2;
            gsap.set(content1Ref.current, { opacity });
          }

          // Content 2: visible 40-70%
          if (progress > 0.40 && progress < 0.70) {
            const localProgress = (progress - 0.40) / 0.3;
            const opacity = localProgress < 0.5
              ? localProgress * 2
              : 2 - localProgress * 2;
            gsap.set(content2Ref.current, { opacity });
          }

          // Content 3: visible 65-100%
          if (progress > 0.65) {
            const localProgress = (progress - 0.65) / 0.35;
            const opacity = Math.min(localProgress * 2, 1);
            gsap.set(content3Ref.current, { opacity });
          }
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root>
      <div className={styles.page}>
        <Link href="/" className={styles.backLink}>
          <span className={styles.arrow}>&larr;</span> Back to Inversa
        </Link>

        <div ref={containerRef} className={styles.container}>
          {/* Stars layer */}
          <div ref={starsRef} className={styles.layer + " " + styles.stars}>
            <img src="/parallax-stars.svg" alt="" />
          </div>

          {/* Moon */}
          <div ref={moonRef} className={styles.moon}>
            <div className={styles.moonGlow}></div>
            <div className={styles.moonBody}></div>
          </div>

          {/* Aurora effect */}
          <div className={styles.aurora}>
            <div className={styles.auroraWave}></div>
            <div className={styles.auroraWave}></div>
            <div className={styles.auroraWave}></div>
          </div>

          {/* Mountain layers */}
          <div ref={mountainsBackRef} className={styles.layer + " " + styles.mountainsBack}>
            <img src="/parallax-layer-mountains-back.svg" alt="" />
          </div>

          <div ref={mountainsMidRef} className={styles.layer + " " + styles.mountainsMid}>
            <img src="/parallax-layer-mountains-mid.svg" alt="" />
          </div>

          <div ref={mountainsFrontRef} className={styles.layer + " " + styles.mountainsFront}>
            <img src="/parallax-layer-mountains-front.svg" alt="" />
          </div>

          {/* Fog layer */}
          <div ref={fogRef} className={styles.fog}></div>

          {/* Trees layer */}
          <div ref={treesRef} className={styles.layer + " " + styles.trees}>
            <img src="/parallax-layer-trees.svg" alt="" />
          </div>

          {/* Text content */}
          <div ref={titleRef} className={styles.title}>
            <h1>Parallax Depth</h1>
            <p className={styles.tagline}>Scroll to journey through layers</p>
          </div>

          <div ref={subtitleRef} className={styles.subtitle}>
            <span className={styles.label}>DEPTH SYSTEM</span>
            <span className={styles.version}>v2.0</span>
          </div>

          <div ref={content1Ref} className={styles.content + " " + styles.content1}>
            <h2>Layer One</h2>
            <p>The distant mountains hold ancient secrets, their peaks touching the realm of stars.</p>
          </div>

          <div ref={content2Ref} className={styles.content + " " + styles.content2}>
            <h2>Layer Two</h2>
            <p>Between shadow and light, the mid-ground reveals paths yet untraveled.</p>
          </div>

          <div ref={content3Ref} className={styles.content + " " + styles.content3}>
            <h2>Layer Three</h2>
            <p>The forest floor awaits. Your journey through depth is complete.</p>
            <Link href="/zoom" className={styles.nextLink}>
              Continue to Zoom Journey &rarr;
            </Link>
          </div>

          {/* Progress indicator */}
          <div className={styles.depthMeter}>
            <div className={styles.depthLabel}>DEPTH</div>
            <div className={styles.depthTrack}>
              <div className={styles.depthFill}></div>
            </div>
            <div className={styles.depthMarkers}>
              <span>SKY</span>
              <span>PEAK</span>
              <span>VALLEY</span>
              <span>FOREST</span>
            </div>
          </div>
        </div>

        <div className={styles.spacer}></div>
      </div>
    </ReactLenis>
  );
}

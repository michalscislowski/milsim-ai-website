"use client";

import { useRef } from "react";
import Link from "next/link";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroImgElementRef = useRef(null);
  const heroMaskRef = useRef(null);
  const smartphoneMaskRef = useRef(null);
  const heroGridOverlayRef = useRef(null);
  const marker1Ref = useRef(null);
  const marker2Ref = useRef(null);
  const marker3Ref = useRef(null);
  const marker4Ref = useRef(null);
  const marker5Ref = useRef(null);
  const marker6Ref = useRef(null);
  const marker7Ref = useRef(null);
  const marker8Ref = useRef(null);
  const marker9Ref = useRef(null);
  const marker10Ref = useRef(null);
  const geofence2Ref = useRef(null);
  const heroContentRef = useRef(null);
  const progressBarRef = useRef(null);
  const hudCornersRef = useRef(null);
  const geofenceRef = useRef(null);
  const playerMarkerRef = useRef(null);
  const tacticalHudRef = useRef(null);

  useGSAP(
    () => {
      const heroContent = heroContentRef.current;
      const heroImg = heroImgRef.current;
      const heroImgElement = heroImgElementRef.current;
      const heroMask = heroMaskRef.current;
      const smartphoneMask = smartphoneMaskRef.current;
      const heroGridOverlay = heroGridOverlayRef.current;
      const marker1 = marker1Ref.current;
      const marker2 = marker2Ref.current;
      const marker3 = marker3Ref.current;
      const marker4 = marker4Ref.current;
      const marker5 = marker5Ref.current;
      const marker6 = marker6Ref.current;
      const marker7 = marker7Ref.current;
      const marker8 = marker8Ref.current;
      const marker9 = marker9Ref.current;
      const marker10 = marker10Ref.current;
      const geofence2 = geofence2Ref.current;
      const progressBar = progressBarRef.current;
      const hudCorners = hudCornersRef.current;
      const geofence = geofenceRef.current;
      const playerMarker = playerMarkerRef.current;
      const tacticalHud = tacticalHudRef.current;

      const heroContentHeight = heroContent.offsetHeight;
      const viewportHeight = window.innerHeight;
      const heroContentMovedistance = heroContentHeight - viewportHeight;

      const heroImgHeight = heroImg.offsetHeight;
      const heroImgMovedistance = heroImgHeight - viewportHeight;

      const ease = (x) => x * x * (3 - 2 * x);

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `+=${window.innerHeight * 6}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(progressBar, {
            "--progress": self.progress,
          });

          gsap.set(heroContent, {
            y: -self.progress * heroContentMovedistance,
          });

          // Hero image parallax - adjusted for 6 sections
          let heroImgProgress;
          if (self.progress <= 0.3) {
            heroImgProgress = ease(self.progress / 0.3) * 0.5;
          } else if (self.progress <= 0.7) {
            heroImgProgress = 0.5;
          } else {
            heroImgProgress = 0.5 + ease((self.progress - 0.7) / 0.3) * 0.5;
          }

          gsap.set(heroImg, {
            y: heroImgProgress * heroImgMovedistance,
          });

          // Mask scale, saturation, overlay - adjusted for 6 sections
          // Phase 1 (0-30%): Initial state, mask hidden
          // Phase 2 (30-40%): Mask reveals, desaturation begins
          // Phase 3 (40-70%): Core features revealed, markers appear sequentially
          // Phase 4 (70-80%): Mask closes, resaturation
          // Phase 5 (80-100%): Final state, CTA transition
          let heroMaskScale;
          let heroImgSaturation;
          let heroImgOverlayOpacity;

          if (self.progress <= 0.3) {
            heroMaskScale = 2.5;
            heroImgSaturation = 1;
            heroImgOverlayOpacity = 0.35;
          } else if (self.progress <= 0.4) {
            const phaseProgress = ease((self.progress - 0.3) / 0.1);
            heroMaskScale = 2.5 - phaseProgress * 1.5;
            heroImgSaturation = 1 - phaseProgress;
            heroImgOverlayOpacity = 0.35 + phaseProgress * 0.35;
          } else if (self.progress <= 0.7) {
            heroMaskScale = 1;
            heroImgSaturation = 0;
            heroImgOverlayOpacity = 0.7;
          } else if (self.progress <= 0.8) {
            const phaseProgress = ease((self.progress - 0.7) / 0.1);
            heroMaskScale = 1 + phaseProgress * 1.5;
            heroImgSaturation = phaseProgress;
            heroImgOverlayOpacity = 0.7 - phaseProgress * 0.35;
          } else {
            heroMaskScale = 2.5;
            heroImgSaturation = 1;
            heroImgOverlayOpacity = 0.35;
          }

          gsap.set(heroMask, {
            scale: heroMaskScale,
          });

          gsap.set(heroImgElement, {
            filter: `saturate(${heroImgSaturation})`,
          });

          gsap.set(heroImg, {
            "--overlay-opacity": heroImgOverlayOpacity,
          });

          // Grid overlay - visible during phases 2-4 (30%-80%)
          let heroGridOpacity;
          if (self.progress <= 0.35) {
            heroGridOpacity = 0;
          } else if (self.progress <= 0.4) {
            heroGridOpacity = ease((self.progress - 0.35) / 0.05);
          } else if (self.progress <= 0.7) {
            heroGridOpacity = 1;
          } else if (self.progress <= 0.75) {
            heroGridOpacity = 1 - ease((self.progress - 0.7) / 0.05);
          } else {
            heroGridOpacity = 0;
          }

          gsap.set(heroGridOverlay, {
            opacity: heroGridOpacity,
          });

          // Marker 1 (HQ Active) - appears at section 2 (~33%)
          // Point stays visible, label fades out at Tactical HUD
          let marker1Opacity;
          let marker1LabelOpacity;
          if (self.progress <= 0.33) {
            marker1Opacity = 0;
            marker1LabelOpacity = 0;
          } else if (self.progress <= 0.36) {
            marker1Opacity = ease((self.progress - 0.33) / 0.03);
            marker1LabelOpacity = ease((self.progress - 0.33) / 0.03);
          } else if (self.progress <= 0.50) {
            marker1Opacity = 1;
            marker1LabelOpacity = 1;
          } else if (self.progress <= 0.55) {
            // Label fades out with geofence, point stays
            marker1Opacity = 1;
            marker1LabelOpacity = 1 - ease((self.progress - 0.50) / 0.05);
          } else {
            // Point stays visible for rest of scroll
            marker1Opacity = 1;
            marker1LabelOpacity = 0;
          }

          // Calculate marker Y offset relative to when they first appeared
          // This keeps them anchored to the same spot on the background image
          const currentBgOffset = heroImgProgress * heroImgMovedistance;

          // Marker 1 appears at progress ~0.33, when heroImgProgress = 0.5
          const marker1BaseOffset = 0.5 * heroImgMovedistance;
          const marker1YOffset = currentBgOffset - marker1BaseOffset;

          gsap.set(marker1, {
            opacity: marker1Opacity,
            y: marker1YOffset,
          });

          gsap.set(marker1.querySelector(".marker-label"), {
            opacity: marker1LabelOpacity,
          });

          // Marker 2 (Alpha Squad) - appears at section 5 (~66%)
          // Stays visible for rest of scroll
          let marker2Opacity;
          if (self.progress <= 0.66) {
            marker2Opacity = 0;
          } else if (self.progress <= 0.69) {
            marker2Opacity = ease((self.progress - 0.66) / 0.03);
          } else {
            marker2Opacity = 1;
          }

          // Marker 2 appears at progress ~0.66, when heroImgProgress = 0.5
          const marker2BaseOffset = 0.5 * heroImgMovedistance;
          const marker2YOffset = currentBgOffset - marker2BaseOffset;

          gsap.set(marker2, {
            opacity: marker2Opacity,
            y: marker2YOffset,
          });

          // Marker 3 (OBJ Bravo) - appears at section 6 (~83%)
          // Stays visible for rest of scroll
          let marker3Opacity;
          if (self.progress <= 0.83) {
            marker3Opacity = 0;
          } else if (self.progress <= 0.86) {
            marker3Opacity = ease((self.progress - 0.83) / 0.03);
          } else {
            marker3Opacity = 1;
          }

          // Marker 3 appears at progress ~0.83, when heroImgProgress ≈ 0.7
          const marker3BaseOffset = 0.7 * heroImgMovedistance;
          const marker3YOffset = currentBgOffset - marker3BaseOffset;

          gsap.set(marker3, {
            opacity: marker3Opacity,
            y: marker3YOffset,
          });

          // Marker 9 (OBJ Charlie) - appears after OBJ Bravo (~90%)
          // Stays visible for rest of scroll
          let marker9Opacity;
          if (self.progress <= 0.90) {
            marker9Opacity = 0;
          } else if (self.progress <= 0.93) {
            marker9Opacity = ease((self.progress - 0.90) / 0.03);
          } else {
            marker9Opacity = 1;
          }

          // Marker 9 appears at progress ~0.85, when heroImgProgress ≈ 0.75
          const marker9BaseOffset = 0.75 * heroImgMovedistance;
          const marker9YOffset = currentBgOffset - marker9BaseOffset;

          gsap.set(marker9, {
            opacity: marker9Opacity,
            y: marker9YOffset,
          });

          // Marker 4 (Delta Team) - appears shortly after Alpha Squad (~70%)
          // Stays visible for rest of scroll
          let marker4Opacity;
          if (self.progress <= 0.70) {
            marker4Opacity = 0;
          } else if (self.progress <= 0.73) {
            marker4Opacity = ease((self.progress - 0.70) / 0.03);
          } else {
            marker4Opacity = 1;
          }

          // Marker 4 appears at progress ~0.70, when heroImgProgress = 0.5
          const marker4BaseOffset = 0.5 * heroImgMovedistance;
          const marker4YOffset = currentBgOffset - marker4BaseOffset;

          gsap.set(marker4, {
            opacity: marker4Opacity,
            y: marker4YOffset,
          });

          // Marker 5 (Bravo Team) - appears shortly after Delta Team (~73%)
          // Stays visible for rest of scroll
          let marker5Opacity;
          if (self.progress <= 0.73) {
            marker5Opacity = 0;
          } else if (self.progress <= 0.76) {
            marker5Opacity = ease((self.progress - 0.73) / 0.03);
          } else {
            marker5Opacity = 1;
          }

          // Marker 5 appears at progress ~0.73, when heroImgProgress ≈ 0.5
          const marker5BaseOffset = 0.5 * heroImgMovedistance;
          const marker5YOffset = currentBgOffset - marker5BaseOffset;

          gsap.set(marker5, {
            opacity: marker5Opacity,
            y: marker5YOffset,
          });

          // Marker 6 (Charlie Team) - appears after Bravo Team (~75%)
          // Stays visible for rest of scroll
          let marker6Opacity;
          if (self.progress <= 0.75) {
            marker6Opacity = 0;
          } else if (self.progress <= 0.78) {
            marker6Opacity = ease((self.progress - 0.75) / 0.03);
          } else {
            marker6Opacity = 1;
          }

          const marker6BaseOffset = 0.5 * heroImgMovedistance;
          const marker6YOffset = currentBgOffset - marker6BaseOffset;

          gsap.set(marker6, {
            opacity: marker6Opacity,
            y: marker6YOffset,
          });

          // Marker 7 (Echo Team) - appears after Charlie Team (~77%)
          // Stays visible for rest of scroll
          let marker7Opacity;
          if (self.progress <= 0.77) {
            marker7Opacity = 0;
          } else if (self.progress <= 0.80) {
            marker7Opacity = ease((self.progress - 0.77) / 0.03);
          } else {
            marker7Opacity = 1;
          }

          const marker7BaseOffset = 0.5 * heroImgMovedistance;
          const marker7YOffset = currentBgOffset - marker7BaseOffset;

          gsap.set(marker7, {
            opacity: marker7Opacity,
            y: marker7YOffset,
          });

          // Marker 8 (Foxtrot Team) - appears after Echo Team (~79%)
          // Stays visible for rest of scroll
          let marker8Opacity;
          if (self.progress <= 0.79) {
            marker8Opacity = 0;
          } else if (self.progress <= 0.82) {
            marker8Opacity = ease((self.progress - 0.79) / 0.03);
          } else {
            marker8Opacity = 1;
          }

          const marker8BaseOffset = 0.5 * heroImgMovedistance;
          const marker8YOffset = currentBgOffset - marker8BaseOffset;

          gsap.set(marker8, {
            opacity: marker8Opacity,
            y: marker8YOffset,
          });

          // Second Geofence (Enemy zone) - draws in red after OBJ Charlie (~92%)
          let geofence2Progress;
          let geofence2Opacity;
          if (self.progress <= 0.92) {
            geofence2Progress = 0;
            geofence2Opacity = 0;
          } else if (self.progress <= 0.94) {
            // Fade in
            geofence2Progress = 0;
            geofence2Opacity = ease((self.progress - 0.92) / 0.02);
          } else if (self.progress <= 1.0) {
            // Draw the polygon
            geofence2Progress = ease((self.progress - 0.94) / 0.06);
            geofence2Opacity = 1;
          } else {
            geofence2Progress = 1;
            geofence2Opacity = 1;
          }

          gsap.set(geofence2, {
            "--geofence-progress": geofence2Progress,
            opacity: geofence2Opacity,
          });

          // Marker 10 (Enemy HQ) - appears in center of red geofence (~94%)
          // Stays visible for rest of scroll
          let marker10Opacity;
          if (self.progress <= 0.94) {
            marker10Opacity = 0;
          } else if (self.progress <= 0.97) {
            marker10Opacity = ease((self.progress - 0.94) / 0.03);
          } else {
            marker10Opacity = 1;
          }

          // Marker 10 appears at progress ~0.94, when heroImgProgress ≈ 0.9
          const marker10BaseOffset = 0.9 * heroImgMovedistance;
          const marker10YOffset = currentBgOffset - marker10BaseOffset;

          gsap.set(marker10, {
            opacity: marker10Opacity,
            y: marker10YOffset,
          });

          // HUD Corners animation - converge toward center during section 1->2
          // Then stay converged during tactical phases, expand back at end
          let cornerProgress;
          if (self.progress <= 0.16) {
            // Section 1 to 2: corners converge inward
            cornerProgress = ease(self.progress / 0.16);
          } else if (self.progress <= 0.75) {
            // Stay converged during tactical phases
            cornerProgress = 1;
          } else if (self.progress <= 0.85) {
            // Expand back out
            cornerProgress = 1 - ease((self.progress - 0.75) / 0.1);
          } else {
            cornerProgress = 0;
          }

          // Calculate inset values (from edge position to converged position)
          // Horizontal inset is larger to bring corners closer together width-wise
          const maxInsetX = window.innerWidth * 0.38;
          const maxInsetY = window.innerHeight * 0.3;
          const currentInsetX = cornerProgress * maxInsetX;
          const currentInsetY = cornerProgress * maxInsetY;

          gsap.set(hudCorners, {
            "--corner-inset-x": `${currentInsetX}px`,
            "--corner-inset-y": `${currentInsetY}px`,
          });

          // Geofence polygon animation - draws in during section 3 (Geofenced Zones)
          // Section 3 is around 33% progress
          let geofenceProgress;
          let geofenceOpacity;
          if (self.progress <= 0.28) {
            geofenceProgress = 0;
            geofenceOpacity = 0;
          } else if (self.progress <= 0.32) {
            // Fade in
            geofenceProgress = 0;
            geofenceOpacity = ease((self.progress - 0.28) / 0.04);
          } else if (self.progress <= 0.48) {
            // Draw the polygon slowly
            geofenceProgress = ease((self.progress - 0.32) / 0.16);
            geofenceOpacity = 1;
          } else if (self.progress <= 0.55) {
            // Fully drawn, stay visible
            geofenceProgress = 1;
            geofenceOpacity = 1;
          } else if (self.progress <= 0.60) {
            // Fade out
            geofenceProgress = 1;
            geofenceOpacity = 1 - ease((self.progress - 0.55) / 0.05);
          } else {
            geofenceProgress = 0;
            geofenceOpacity = 0;
          }

          // The stroke draws in by animating dashoffset from full perimeter to 0
          gsap.set(geofence, {
            "--geofence-progress": geofenceProgress,
            opacity: geofenceOpacity,
          });

          // Mask transition - crossfade from jagged to smartphone shape at Tactical HUD
          // Section 4 (Tactical HUD) is around 50% progress
          // Using overlapping opacity to prevent blink (both stay higher longer)
          let smartphoneMaskOpacity;
          let jaggedMaskOpacity;
          if (self.progress <= 0.48) {
            smartphoneMaskOpacity = 0;
            jaggedMaskOpacity = 1;
          } else if (self.progress <= 0.55) {
            // Smartphone fades in while jagged stays at 1, then jagged quickly fades
            const progress = (self.progress - 0.48) / 0.07;
            smartphoneMaskOpacity = ease(progress);
            // Jagged stays at 1 until smartphone is mostly visible, then drops
            jaggedMaskOpacity = progress < 0.7 ? 1 : 1 - ease((progress - 0.7) / 0.3);
          } else if (self.progress <= 0.70) {
            // Stay as smartphone
            smartphoneMaskOpacity = 1;
            jaggedMaskOpacity = 0;
          } else if (self.progress <= 0.77) {
            // Jagged fades in while smartphone stays at 1, then smartphone quickly fades
            const progress = (self.progress - 0.70) / 0.07;
            jaggedMaskOpacity = ease(progress);
            // Smartphone stays at 1 until jagged is mostly visible, then drops
            smartphoneMaskOpacity = progress < 0.7 ? 1 : 1 - ease((progress - 0.7) / 0.3);
          } else {
            smartphoneMaskOpacity = 0;
            jaggedMaskOpacity = 1;
          }

          gsap.set(heroMask, {
            opacity: jaggedMaskOpacity,
          });

          gsap.set(smartphoneMask, {
            opacity: smartphoneMaskOpacity,
          });

          // Player position marker - appears during Tactical HUD, stays through Squad Tracking
          let playerMarkerOpacity;
          if (self.progress <= 0.50) {
            playerMarkerOpacity = 0;
          } else if (self.progress <= 0.55) {
            playerMarkerOpacity = ease((self.progress - 0.50) / 0.05);
          } else {
            // Stay visible for rest of scroll
            playerMarkerOpacity = 1;
          }

          // Player marker appears at progress ~0.50, when heroImgProgress = 0.5
          const playerBaseOffset = 0.5 * heroImgMovedistance;
          const playerYOffset = currentBgOffset - playerBaseOffset;

          gsap.set(playerMarker, {
            opacity: playerMarkerOpacity,
            y: playerYOffset,
          });

          // Tactical HUD - appears with smartphone mask, then expands to full screen
          let tacticalHudOpacity;
          let tacticalHudWidth;
          let tacticalHudHeight;
          let tacticalHudRadius;

          if (self.progress <= 0.48) {
            // Hidden before smartphone mask appears
            tacticalHudOpacity = 0;
            tacticalHudWidth = 50;
            tacticalHudHeight = null; // use aspect-ratio
            tacticalHudRadius = 50;
          } else if (self.progress <= 0.55) {
            // Fade in with smartphone mask
            tacticalHudOpacity = ease((self.progress - 0.48) / 0.07);
            tacticalHudWidth = 50;
            tacticalHudHeight = null;
            tacticalHudRadius = 50;
          } else if (self.progress <= 0.75) {
            // Stay in mask position until mask starts fading
            tacticalHudOpacity = 1;
            tacticalHudWidth = 50;
            tacticalHudHeight = null;
            tacticalHudRadius = 50;
          } else if (self.progress <= 0.82) {
            // Expand to full screen as mask disappears
            const expandProgress = ease((self.progress - 0.75) / 0.07);
            tacticalHudOpacity = 1;
            tacticalHudWidth = 50 + 50 * expandProgress;
            // Start from aspect-ratio height (~34vh at 50% width) to 100vh
            const startHeight = (50 * window.innerWidth / window.innerHeight) * (1050 / 1550);
            tacticalHudHeight = startHeight + (100 - startHeight) * expandProgress;
            tacticalHudRadius = 50 * (1 - expandProgress);
          } else {
            // Stay expanded for rest of scroll
            tacticalHudOpacity = 1;
            tacticalHudWidth = 100;
            tacticalHudHeight = 100;
            tacticalHudRadius = 0;
          }

          gsap.set(tacticalHud, {
            opacity: tacticalHudOpacity,
            width: `${tacticalHudWidth}%`,
            height: tacticalHudHeight !== null ? `${tacticalHudHeight}vh` : "auto",
            aspectRatio: tacticalHudHeight !== null ? "auto" : "1550 / 1050",
            "--hud-radius": `${tacticalHudRadius}px`,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      <ReactLenis root />
      <div ref={containerRef}>
        <section className="hero">
          {/* HUD Corner Brackets */}
          <div className="hud-corners" ref={hudCornersRef}>
            <div className="hud-corner hud-corner--tl"></div>
            <div className="hud-corner hud-corner--tr"></div>
            <div className="hud-corner hud-corner--bl"></div>
            <div className="hud-corner hud-corner--br"></div>
          </div>

          {/* Geofence Polygon - irregular shape like map clicks */}
          <svg className="geofence-svg" ref={geofenceRef} viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon
              className="geofence-shape"
              points="15,8 82,12 88,35 78,78 55,92 12,75 5,42"
              fill="none"
            />
            {/* Corner markers - the "click points" */}
            <circle className="geofence-point geofence-point-1" cx="15" cy="8" r="2" />
            <circle className="geofence-point geofence-point-2" cx="82" cy="12" r="2" />
            <circle className="geofence-point geofence-point-3" cx="88" cy="35" r="2" />
            <circle className="geofence-point geofence-point-4" cx="78" cy="78" r="2" />
            <circle className="geofence-point geofence-point-5" cx="55" cy="92" r="2" />
            <circle className="geofence-point geofence-point-6" cx="12" cy="75" r="2" />
            <circle className="geofence-point geofence-point-7" cx="5" cy="42" r="2" />
          </svg>

          {/* Second Geofence - Enemy zone in red */}
          <svg className="geofence-svg geofence-svg--enemy" ref={geofence2Ref} viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon
              className="geofence-shape"
              points="20,15 75,10 85,40 80,75 45,85 15,70 10,35"
              fill="none"
            />
            <circle className="geofence-point geofence-point-1" cx="20" cy="15" r="2" />
            <circle className="geofence-point geofence-point-2" cx="75" cy="10" r="2" />
            <circle className="geofence-point geofence-point-3" cx="85" cy="40" r="2" />
            <circle className="geofence-point geofence-point-4" cx="80" cy="75" r="2" />
            <circle className="geofence-point geofence-point-5" cx="45" cy="85" r="2" />
            <circle className="geofence-point geofence-point-6" cx="15" cy="70" r="2" />
            <circle className="geofence-point geofence-point-7" cx="10" cy="35" r="2" />
          </svg>

          <div className="hero-img" ref={heroImgRef}>
            <img ref={heroImgElementRef} src="/hero-img.jpg" alt="" />
          </div>

          <div className="hero-mask" ref={heroMaskRef}></div>
          <div className="hero-mask hero-mask--smartphone" ref={smartphoneMaskRef}></div>

          <div className="hero-grid-overlay" ref={heroGridOverlayRef}>
            <img src="/grid-overlay.svg" alt="" />
          </div>

          <div className="marker marker-1" ref={marker1Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">HQ Active</p>
          </div>

          <div className="marker marker-2" ref={marker2Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">Alpha Squad</p>
          </div>

          <div className="marker marker-4" ref={marker4Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">Delta Team</p>
          </div>

          <div className="marker marker-5" ref={marker5Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">Bravo Team</p>
          </div>

          <div className="marker marker-6" ref={marker6Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">Charlie Team</p>
          </div>

          <div className="marker marker-7" ref={marker7Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">Echo Team</p>
          </div>

          <div className="marker marker-8" ref={marker8Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">Foxtrot Team</p>
          </div>

          <div className="marker marker-3" ref={marker3Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">OBJ Bravo</p>
          </div>

          <div className="marker marker-9" ref={marker9Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">OBJ Charlie</p>
          </div>

          <div className="marker marker-10" ref={marker10Ref}>
            <span className="marker-icon"></span>
            <p className="marker-label">Enemy HQ</p>
          </div>

          {/* Player position marker */}
          <div className="player-marker" ref={playerMarkerRef}>
            <svg className="player-arrow" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L4 20L12 16L20 20L12 2Z" fill="currentColor"/>
            </svg>
            <p className="player-label">Your Position</p>
          </div>

          {/* Tactical HUD Overlay */}
          <div className="tactical-hud" ref={tacticalHudRef}>
            {/* Top Bar */}
            <div className="tactical-hud-top">
              <div className="tactical-hud-item">
                <span className="tactical-hud-label">Mission</span>
                <span className="tactical-hud-value">OP Nightfall</span>
              </div>
              <div className="tactical-hud-item tactical-hud-timer">
                <span className="tactical-hud-label">Time</span>
                <span className="tactical-hud-value">01:24:38</span>
              </div>
              <div className="tactical-hud-item">
                <span className="tactical-hud-label">Team</span>
                <span className="tactical-hud-value tactical-hud-value--green">4/4 Active</span>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="tactical-hud-bottom">
              <div className="tactical-hud-item">
                <span className="tactical-hud-label">Objective</span>
                <span className="tactical-hud-value tactical-hud-value--amber">Secure Point B</span>
              </div>
              <div className="tactical-hud-compass">
                <span>W</span>
                <span className="tactical-hud-compass-active">N</span>
                <span>E</span>
              </div>
              <div className="tactical-hud-item">
                <span className="tactical-hud-label">Distance</span>
                <span className="tactical-hud-value">127m</span>
              </div>
            </div>
          </div>

          <div className="hero-content" ref={heroContentRef}>
            {/* Section 1: Hero Branding */}
            <div className="hero-content-block">
              <div className="hero-content-copy">
                <h1>MILSIM.AI</h1>
                <p>Command Your Battlefield</p>
              </div>
            </div>

            {/* Section 2: Event Command */}
            <div className="hero-content-block">
              <div className="hero-content-copy">
                <h2>Event Command</h2>
                <p>
                  Create and manage airsoft operations with full control.
                  From small skirmishes to large-scale milsim events,
                  command every aspect of the mission.
                </p>
              </div>
            </div>

            {/* Section 3: Geofenced Zones */}
            <div className="hero-content-block">
              <div className="hero-content-copy">
                <h2>Geofenced Zones</h2>
                <p>
                  Define operational boundaries with precision GPS.
                  Set spawn points, objectives, and restricted areas
                  with meter-level accuracy.
                </p>
              </div>
            </div>

            {/* Section 4: Tactical HUD */}
            <div className="hero-content-block">
              <div className="hero-content-copy">
                <h2>Tactical HUD</h2>
                <p>
                  Real-time battlefield awareness at your fingertips.
                  Track objectives, team status, and mission timers
                  in an intuitive heads-up display.
                </p>
              </div>
            </div>

            {/* Section 5: Squad Tracking */}
            <div className="hero-content-block">
              <div className="hero-content-copy">
                <h2>Squad Tracking</h2>
                <p>
                  Monitor allied positions across the field.
                  Coordinate movements, assign waypoints, and maintain
                  tactical cohesion in real-time.
                </p>
              </div>
            </div>

            {/* Section 6: Mission Objectives */}
            <div className="hero-content-block">
              <div className="hero-content-copy">
                <h2>Mission Objectives</h2>
                <p>
                  Dynamic objectives that drive the action.
                  Capture points, extraction zones, and timed missions
                  keep every operator engaged.
                </p>
              </div>
            </div>
          </div>

          <div className="hero-scroll-progress-bar" ref={progressBarRef}></div>
        </section>

        <section className="outro">
          <h2>Ready to Command?</h2>
          <p>
            Join thousands of operators using MILSIM.AI to elevate
            their airsoft experience. Plan missions, track teams,
            and dominate the battlefield.
          </p>
          <div className="cta-buttons">
            <Link href="#" className="cta-button cta-button--primary">
              Join the Operation
            </Link>
            <Link href="#" className="cta-button cta-button--secondary">
              Download App
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Detect mobile once at module level
const getIsMobile = () => typeof window !== "undefined" && window.innerWidth <= 800;

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
  const customCursorRef = useRef(null);

  // Refs for typewriter headings
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const heading3Ref = useRef(null);
  const heading4Ref = useRef(null);
  const heading5Ref = useRef(null);
  const heading6Ref = useRef(null);
  const headingsAnimated = useRef([false, false, false, false, false, false]);

  // Marker data for CoT popups
  const markerData = {
    1: {
      type: "HQ",
      name: "HQ Active",
      callsign: "COMMAND-1",
      coords: "51.5074° N, 0.1278° W",
      mgrs: "30U XC 99287 11934",
      status: "Operational",
      frequency: "148.500 MHz",
      personnel: 12,
    },
    2: {
      type: "Team",
      name: "Alpha Squad",
      callsign: "ALPHA-6",
      coords: "51.5082° N, 0.1265° W",
      mgrs: "30U XC 99312 11956",
      status: "Moving",
      members: ["Alpha-1", "Alpha-2", "Alpha-3", "Alpha-4"],
      heading: "045°",
    },
    3: {
      type: "Objective",
      name: "OBJ Bravo",
      designation: "BRAVO",
      coords: "51.5091° N, 0.1301° W",
      mgrs: "30U XC 99245 11978",
      status: "Contested",
      priority: "High",
      timeLimit: "15:00",
    },
    4: {
      type: "Team",
      name: "Delta Team",
      callsign: "DELTA-6",
      coords: "51.5078° N, 0.1290° W",
      mgrs: "30U XC 99267 11945",
      status: "Holding",
      members: ["Delta-1", "Delta-2", "Delta-3"],
      heading: "270°",
    },
    5: {
      type: "Team",
      name: "Bravo Team",
      callsign: "BRAVO-6",
      coords: "51.5085° N, 0.1272° W",
      mgrs: "30U XC 99298 11962",
      status: "Engaged",
      members: ["Bravo-1", "Bravo-2", "Bravo-3", "Bravo-4"],
      heading: "180°",
    },
    6: {
      type: "Team",
      name: "Charlie Team",
      callsign: "CHARLIE-6",
      coords: "51.5088° N, 0.1285° W",
      mgrs: "30U XC 99278 11970",
      status: "Moving",
      members: ["Charlie-1", "Charlie-2", "Charlie-3"],
      heading: "090°",
    },
    7: {
      type: "Team",
      name: "Echo Team",
      callsign: "ECHO-6",
      coords: "51.5095° N, 0.1295° W",
      mgrs: "30U XC 99258 11985",
      status: "Standby",
      members: ["Echo-1", "Echo-2"],
      heading: "315°",
    },
    8: {
      type: "Team",
      name: "Foxtrot Team",
      callsign: "FOXTROT-6",
      coords: "51.5098° N, 0.1310° W",
      mgrs: "30U XC 99235 11992",
      status: "Moving",
      members: ["Foxtrot-1", "Foxtrot-2", "Foxtrot-3"],
      heading: "000°",
    },
    9: {
      type: "Objective",
      name: "OBJ Charlie",
      designation: "CHARLIE",
      coords: "51.5102° N, 0.1260° W",
      mgrs: "30U XC 99320 12001",
      status: "Secure",
      priority: "Medium",
      timeLimit: "20:00",
    },
    10: {
      type: "HQ",
      name: "Enemy HQ",
      callsign: "HOSTILE-1",
      coords: "51.5105° N, 0.1245° W",
      mgrs: "30U XC 99342 12008",
      status: "Active",
      threat: "High",
      personnel: "Unknown",
    },
  };

  // Selected marker state
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Mobile detection and locked viewport - prevents inconsistencies across browsers
  const [isMobile, setIsMobile] = useState(false);
  const [lockedViewportHeight, setLockedViewportHeight] = useState(null);

  // Detect mobile and lock viewport on mount
  useEffect(() => {
    const mobile = getIsMobile();
    setIsMobile(mobile);

    // Lock the viewport height at initialization
    // Used by ScrollTrigger for consistent scroll distance calculations
    const height = window.innerHeight;
    setLockedViewportHeight(height);
  }, []);

  const handleMarkerClick = (markerId, e) => {
    e.stopPropagation();
    setSelectedMarker(selectedMarker === markerId ? null : markerId);
  };

  const closePopup = () => {
    setSelectedMarker(null);
  };

  // Real-time UTC clock state
  const [utcTime, setUtcTime] = useState("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds}`);
    };

    // Update immediately on mount
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Custom cursor mouse tracking
  useEffect(() => {
    const cursor = customCursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  // Trigger first heading typewriter animation on page load
  useEffect(() => {
    const heading = heading1Ref.current;
    if (heading) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        headingsAnimated.current[0] = true;
        heading.classList.add("typewriter");
        // Remove cursor after animation completes (1.2s animation + 200ms buffer)
        setTimeout(() => {
          heading.classList.remove("typewriter");
          heading.classList.add("typewriter--no-cursor");
        }, 1400);
      }, 100);
    }
  }, []);

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
      const customCursor = customCursorRef.current;

      // LOCK all dimensions at initialization to prevent cross-browser inconsistencies
      // These values won't change during the session, avoiding issues with address bar changes
      const isMobileLocked = window.innerWidth <= 800;
      // Use innerHeight for consistency with vh units in CSS
      const viewportHeightLocked = window.innerHeight;
      const viewportWidthLocked = window.innerWidth;

      const heroContentHeight = heroContent.offsetHeight;
      const heroContentMovedistance = heroContentHeight - viewportHeightLocked;

      const heroImgHeight = heroImg.offsetHeight;
      const heroImgMovedistance = heroImgHeight - viewportHeightLocked;

      const ease = (x) => x * x * (3 - 2 * x);

      // Initialize corners to their starting position (at edges, not converged)
      gsap.set(hudCorners, {
        "--corner-inset-x": "0px",
        "--corner-inset-y": "0px",
      });

      // Scroll distance: 6.02 viewport heights (6 sections + small buffer)
      // Now that CSS uses locked vh values, we can use the same multiplier everywhere
      const scrollMultiplier = 6.02;

      // Create quickSetters for frequently updated properties (much faster than gsap.set)
      // Use fallback no-op functions if elements don't exist
      const noop = () => {};
      const setProgressBarProgress = progressBar ? gsap.quickSetter(progressBar, "--progress") : noop;
      const setCursorProgress = customCursor ? gsap.quickSetter(customCursor, "--cursor-progress") : noop;
      const setHeroContentY = heroContent ? gsap.quickSetter(heroContent, "y", "px") : noop;
      const setHeroImgY = heroImg ? gsap.quickSetter(heroImg, "y", "px") : noop;
      const setHeroMaskScale = heroMask ? gsap.quickSetter(heroMask, "scale") : noop;
      const setHeroMaskOpacity = heroMask ? gsap.quickSetter(heroMask, "opacity") : noop;
      const setSmartphoneMaskOpacity = smartphoneMask ? gsap.quickSetter(smartphoneMask, "opacity") : noop;
      const setHeroGridOpacity = heroGridOverlay ? gsap.quickSetter(heroGridOverlay, "opacity") : noop;
      const setTacticalHudOpacity = tacticalHud ? gsap.quickSetter(tacticalHud, "opacity") : noop;
      const setPlayerMarkerOpacity = playerMarker ? gsap.quickSetter(playerMarker, "opacity") : noop;
      const setPlayerMarkerY = playerMarker ? gsap.quickSetter(playerMarker, "y", "px") : noop;

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `+=${viewportHeightLocked * scrollMultiplier}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
        onUpdate: (self) => {
          setProgressBarProgress(self.progress);
          setCursorProgress(self.progress);
          setHeroContentY(-self.progress * heroContentMovedistance);

          // Hero image parallax - adjusted for 6 sections
          let heroImgProgress;
          if (self.progress <= 0.3) {
            heroImgProgress = ease(self.progress / 0.3) * 0.5;
          } else if (self.progress <= 0.7) {
            heroImgProgress = 0.5;
          } else {
            heroImgProgress = 0.5 + ease((self.progress - 0.7) / 0.3) * 0.5;
          }

          setHeroImgY(heroImgProgress * heroImgMovedistance);

          // Mask scale, saturation, overlay - adjusted for 6 sections
          // Phase 1 (0-30%): Initial state, mask hidden
          // Phase 2 (30-40%): Mask reveals, desaturation begins
          // Phase 3 (40-70%): Core features revealed, markers appear sequentially
          // Phase 4 (70-80%): Mask closes, resaturation
          // Phase 5 (80-100%): Final state, CTA transition

          // Use larger mask scale on mobile (portrait) to ensure it's fully off-screen
          const maxMaskScale = isMobileLocked ? 6 : 2.5;
          const maskScaleRange = maxMaskScale - 1;

          let heroMaskScale;
          let heroImgSaturation;
          let heroImgOverlayOpacity;

          if (self.progress <= 0.3) {
            heroMaskScale = maxMaskScale;
            heroImgSaturation = 1;
            heroImgOverlayOpacity = 0.35;
          } else if (self.progress <= 0.4) {
            const phaseProgress = ease((self.progress - 0.3) / 0.1);
            heroMaskScale = maxMaskScale - phaseProgress * maskScaleRange;
            heroImgSaturation = 1 - phaseProgress;
            heroImgOverlayOpacity = 0.35 + phaseProgress * 0.35;
          } else if (self.progress <= 0.7) {
            heroMaskScale = 1;
            heroImgSaturation = 0;
            heroImgOverlayOpacity = 0.7;
          } else if (self.progress <= 0.8) {
            const phaseProgress = ease((self.progress - 0.7) / 0.1);
            heroMaskScale = 1 + phaseProgress * maskScaleRange;
            heroImgSaturation = phaseProgress;
            heroImgOverlayOpacity = 0.7 - phaseProgress * 0.35;
          } else {
            heroMaskScale = maxMaskScale;
            heroImgSaturation = 1;
            heroImgOverlayOpacity = 0.35;
          }

          setHeroMaskScale(heroMaskScale);

          // Filter updates are expensive - only update when value changes significantly
          if (heroImgElement) heroImgElement.style.filter = `saturate(${heroImgSaturation})`;
          if (heroImg) heroImg.style.setProperty("--overlay-opacity", heroImgOverlayOpacity);

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

          setHeroGridOpacity(heroGridOpacity);

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
          const marker1YOffset = self.progress >= 0.33 ? currentBgOffset - marker1BaseOffset : 0;

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
          // Only apply Y offset after marker appears to prevent jumping
          const marker2BaseOffset = 0.5 * heroImgMovedistance;
          const marker2YOffset = self.progress >= 0.66 ? currentBgOffset - marker2BaseOffset : 0;

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
          const marker3YOffset = self.progress >= 0.83 ? currentBgOffset - marker3BaseOffset : 0;

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

          // Marker 9 appears at progress ~0.90, when heroImgProgress ≈ 0.75
          const marker9BaseOffset = 0.75 * heroImgMovedistance;
          const marker9YOffset = self.progress >= 0.90 ? currentBgOffset - marker9BaseOffset : 0;

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
          const marker4YOffset = self.progress >= 0.70 ? currentBgOffset - marker4BaseOffset : 0;

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
          const marker5YOffset = self.progress >= 0.73 ? currentBgOffset - marker5BaseOffset : 0;

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
          const marker6YOffset = self.progress >= 0.75 ? currentBgOffset - marker6BaseOffset : 0;

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
          const marker7YOffset = self.progress >= 0.77 ? currentBgOffset - marker7BaseOffset : 0;

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
          const marker8YOffset = self.progress >= 0.79 ? currentBgOffset - marker8BaseOffset : 0;

          gsap.set(marker8, {
            opacity: marker8Opacity,
            y: marker8YOffset,
          });

          // Second Geofence (Enemy zone) - draws in red after OBJ Charlie (~92%)
          // Stays visible - outro section covers it with higher z-index
          let geofence2Progress;
          let geofence2Opacity;
          if (self.progress <= 0.92) {
            geofence2Progress = 0;
            geofence2Opacity = 0;
          } else if (self.progress <= 0.94) {
            // Fade in
            geofence2Progress = 0;
            geofence2Opacity = ease((self.progress - 0.92) / 0.02);
          } else {
            // Draw the polygon and stay visible
            geofence2Progress = Math.min(1, ease((self.progress - 0.94) / 0.06));
            geofence2Opacity = 1;
          }

          gsap.set(geofence2, {
            "--geofence-progress": geofence2Progress,
            opacity: geofence2Opacity,
          });

          // Marker 10 (Enemy HQ) - appears in center of red geofence (~94%)
          // Stays visible - outro section covers it with higher z-index
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
          const marker10YOffset = self.progress >= 0.94 ? currentBgOffset - marker10BaseOffset : 0;

          gsap.set(marker10, {
            opacity: marker10Opacity,
            y: marker10YOffset,
          });

          // HUD Corners animation - converge toward center during section 1->2
          // Then stay converged during tactical phases, expand back at end
          // Clamp progress to prevent issues with overscroll at top
          const clampedProgress = Math.max(0, Math.min(1, self.progress));

          let cornerProgress;
          // Add dead zone at very beginning - corners stay at edges until 1% progress
          // This prevents any visual glitches from overscroll bounce at top
          if (clampedProgress <= 0.01) {
            cornerProgress = 0;
          } else if (clampedProgress <= 0.16) {
            // Section 1 to 2: corners converge inward (starting from 1% progress)
            cornerProgress = ease((clampedProgress - 0.01) / 0.15);
          } else if (clampedProgress <= 0.75) {
            // Stay converged during tactical phases
            cornerProgress = 1;
          } else if (clampedProgress <= 0.82) {
            // Expand back out - synced with tactical HUD expansion (75% to 82%)
            cornerProgress = 1 - ease((clampedProgress - 0.75) / 0.07);
          } else {
            cornerProgress = 0;
          }

          // Ensure cornerProgress is always valid (0-1)
          cornerProgress = Math.max(0, Math.min(1, cornerProgress));

          // Calculate inset values (from edge position to converged position)
          // On mobile, only converge vertically (no horizontal inset)
          const maxInsetX = isMobileLocked ? 0 : viewportWidthLocked * 0.38;
          const maxInsetY = viewportHeightLocked * 0.3;
          const currentInsetX = cornerProgress * maxInsetX;
          const currentInsetY = cornerProgress * maxInsetY;

          if (hudCorners) {
            hudCorners.style.setProperty("--corner-inset-x", `${currentInsetX}px`);
            hudCorners.style.setProperty("--corner-inset-y", `${currentInsetY}px`);
          }

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
          // On mobile, skip smartphone mask and keep jagged mask visible
          let smartphoneMaskOpacity;
          let jaggedMaskOpacity;

          if (isMobileLocked) {
            // On mobile, keep jagged mask visible throughout
            smartphoneMaskOpacity = 0;
            jaggedMaskOpacity = 1;
          } else {
            // Desktop: smooth crossfade between jagged and smartphone masks
            if (self.progress <= 0.48) {
              smartphoneMaskOpacity = 0;
              jaggedMaskOpacity = 1;
            } else if (self.progress <= 0.55) {
              // Smooth crossfade: jagged fades out as smartphone fades in
              const progress = ease((self.progress - 0.48) / 0.07);
              smartphoneMaskOpacity = progress;
              jaggedMaskOpacity = 1 - progress;
            } else if (self.progress <= 0.70) {
              // Stay as smartphone
              smartphoneMaskOpacity = 1;
              jaggedMaskOpacity = 0;
            } else if (self.progress <= 0.77) {
              // Smooth crossfade back: smartphone fades out as jagged fades in
              const progress = ease((self.progress - 0.70) / 0.07);
              jaggedMaskOpacity = progress;
              smartphoneMaskOpacity = 1 - progress;
            } else {
              smartphoneMaskOpacity = 0;
              jaggedMaskOpacity = 1;
            }
          }

          setHeroMaskOpacity(jaggedMaskOpacity);
          setSmartphoneMaskOpacity(smartphoneMaskOpacity);

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
          const playerYOffset = self.progress >= 0.50 ? currentBgOffset - playerBaseOffset : 0;

          setPlayerMarkerOpacity(playerMarkerOpacity);
          setPlayerMarkerY(playerYOffset);

          // Tactical HUD - appears with smartphone mask, then expands to full screen
          let tacticalHudOpacity;
          let tacticalHudWidth;
          let tacticalHudHeight;
          let tacticalHudRadius;

          // On mobile, match the jagged mask (75% width), on desktop use smartphone mask (50% width)
          const hudBaseWidth = isMobileLocked ? 75 : 50;
          const hudExpandRange = 100 - hudBaseWidth;

          if (self.progress <= 0.48) {
            // Hidden before mask transition
            tacticalHudOpacity = 0;
            tacticalHudWidth = hudBaseWidth;
            tacticalHudHeight = null; // use aspect-ratio
            tacticalHudRadius = isMobileLocked ? 0 : 50;
          } else if (self.progress <= 0.55) {
            // Fade in with mask
            tacticalHudOpacity = ease((self.progress - 0.48) / 0.07);
            tacticalHudWidth = hudBaseWidth;
            tacticalHudHeight = null;
            tacticalHudRadius = isMobileLocked ? 0 : 50;
          } else if (self.progress <= 0.75) {
            // Stay in mask position until mask starts fading
            tacticalHudOpacity = 1;
            tacticalHudWidth = hudBaseWidth;
            tacticalHudHeight = null;
            tacticalHudRadius = isMobileLocked ? 0 : 50;
          } else if (self.progress <= 0.82) {
            // Expand to full screen as mask disappears
            const expandProgress = ease((self.progress - 0.75) / 0.07);
            tacticalHudOpacity = 1;
            tacticalHudWidth = hudBaseWidth + hudExpandRange * expandProgress;
            // Start from mask height to 100vh
            const mobileHudHeight = 70;
            const startHeight = isMobileLocked ? mobileHudHeight : (hudBaseWidth * viewportWidthLocked / viewportHeightLocked) * (1050 / 1550);
            tacticalHudHeight = startHeight + (100 - startHeight) * expandProgress;
            tacticalHudRadius = isMobileLocked ? 0 : 50 * (1 - expandProgress);
          } else {
            // Stay expanded for rest of scroll
            tacticalHudOpacity = 1;
            tacticalHudWidth = 100;
            tacticalHudHeight = 100;
            tacticalHudRadius = 0;
          }

          // On mobile, use fixed height instead of aspect-ratio to match mask edges
          const useAspectRatio = !isMobileLocked && tacticalHudHeight === null;
          const mobileHudHeight = 70; // Approximate height to match jagged mask opening

          let hudHeightValue;
          // Use svh on mobile to stay within visible viewport, vh on desktop
          if (isMobileLocked) {
            if (tacticalHudHeight !== null) {
              hudHeightValue = `${tacticalHudHeight}svh`;
            } else {
              hudHeightValue = `${mobileHudHeight}svh`;
            }
          } else {
            hudHeightValue = tacticalHudHeight !== null ? `${tacticalHudHeight}vh` : "auto";
          }

          setTacticalHudOpacity(tacticalHudOpacity);
          if (tacticalHud) {
            tacticalHud.style.width = `${tacticalHudWidth}%`;
            tacticalHud.style.height = hudHeightValue;
            tacticalHud.style.aspectRatio = useAspectRatio ? "1550 / 1050" : "auto";
            tacticalHud.style.setProperty("--hud-radius", `${tacticalHudRadius}px`);
          }

          // Typewriter animation triggers for each section
          // Each section is ~16.67% of scroll (1/6)
          const headingRefs = [
            heading1Ref,
            heading2Ref,
            heading3Ref,
            heading4Ref,
            heading5Ref,
            heading6Ref,
          ];
          const triggerPoints = [0.02, 0.10, 0.33, 0.50, 0.67, 0.83];

          triggerPoints.forEach((trigger, index) => {
            if (self.progress >= trigger && !headingsAnimated.current[index]) {
              headingsAnimated.current[index] = true;
              const heading = headingRefs[index].current;
              if (heading) {
                heading.classList.add("typewriter");
                // Remove cursor after animation completes (1.2s animation + 200ms buffer)
                setTimeout(() => {
                  heading.classList.remove("typewriter");
                  heading.classList.add("typewriter--no-cursor");
                }, 1400);
              }
            }
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      {/* Disable Lenis smooth scroll on mobile for consistent native scrolling */}
      {!isMobile && <ReactLenis root />}
      {/* Custom Cursor */}
      <div className="custom-cursor" ref={customCursorRef}>
        <svg className="cursor-progress-ring" viewBox="0 0 100 100">
          <circle className="cursor-progress-bg" cx="50" cy="50" r="45" />
          <circle className="cursor-progress-fill" cx="50" cy="50" r="45" />
        </svg>
        <span className="cursor-text">SCROLL</span>
      </div>
      <div ref={containerRef} onClick={closePopup}>
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
            <img ref={heroImgElementRef} src="/hero-img.webp" alt="" />
          </div>

          <div className="hero-mask" ref={heroMaskRef}></div>
          <div className="hero-mask hero-mask--smartphone" ref={smartphoneMaskRef}></div>

          <div className="hero-grid-overlay" ref={heroGridOverlayRef}>
            <img src="/grid-overlay.svg" alt="" />
          </div>

          <div className={`marker marker-1 ${selectedMarker === 1 ? 'marker--selected' : ''}`} ref={marker1Ref} onClick={(e) => handleMarkerClick(1, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">HQ Active</p>
          </div>

          <div className={`marker marker-2 ${selectedMarker === 2 ? 'marker--selected' : ''}`} ref={marker2Ref} onClick={(e) => handleMarkerClick(2, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">Alpha Squad</p>
          </div>

          <div className={`marker marker-4 ${selectedMarker === 4 ? 'marker--selected' : ''}`} ref={marker4Ref} onClick={(e) => handleMarkerClick(4, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">Delta Team</p>
          </div>

          <div className={`marker marker-5 ${selectedMarker === 5 ? 'marker--selected' : ''}`} ref={marker5Ref} onClick={(e) => handleMarkerClick(5, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">Bravo Team</p>
          </div>

          <div className={`marker marker-6 ${selectedMarker === 6 ? 'marker--selected' : ''}`} ref={marker6Ref} onClick={(e) => handleMarkerClick(6, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">Charlie Team</p>
          </div>

          <div className={`marker marker-7 ${selectedMarker === 7 ? 'marker--selected' : ''}`} ref={marker7Ref} onClick={(e) => handleMarkerClick(7, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">Echo Team</p>
          </div>

          <div className={`marker marker-8 ${selectedMarker === 8 ? 'marker--selected' : ''}`} ref={marker8Ref} onClick={(e) => handleMarkerClick(8, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">Foxtrot Team</p>
          </div>

          <div className={`marker marker-3 ${selectedMarker === 3 ? 'marker--selected' : ''}`} ref={marker3Ref} onClick={(e) => handleMarkerClick(3, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">OBJ Bravo</p>
          </div>

          <div className={`marker marker-9 ${selectedMarker === 9 ? 'marker--selected' : ''}`} ref={marker9Ref} onClick={(e) => handleMarkerClick(9, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">OBJ Charlie</p>
          </div>

          <div className={`marker marker-10 ${selectedMarker === 10 ? 'marker--selected' : ''}`} ref={marker10Ref} onClick={(e) => handleMarkerClick(10, e)}>
            <span className="marker-icon"></span>
            <p className="marker-label">Enemy HQ</p>
          </div>

          {/* CoT Popup */}
          {selectedMarker && (
            <div className="cot-popup" onClick={(e) => e.stopPropagation()}>
              <div className="cot-popup-header">
                <span className={`cot-popup-type cot-popup-type--${markerData[selectedMarker].type.toLowerCase()}`}>
                  {markerData[selectedMarker].type}
                </span>
                <h3 className="cot-popup-title">{markerData[selectedMarker].name}</h3>
                <button className="cot-popup-close" onClick={closePopup}>×</button>
              </div>

              <div className="cot-popup-content">
                <div className="cot-popup-section">
                  <span className="cot-popup-label">Callsign</span>
                  <span className="cot-popup-value">{markerData[selectedMarker].callsign}</span>
                </div>

                <div className="cot-popup-section">
                  <span className="cot-popup-label">Coordinates</span>
                  <span className="cot-popup-value cot-popup-value--mono">{markerData[selectedMarker].coords}</span>
                </div>

                <div className="cot-popup-section">
                  <span className="cot-popup-label">MGRS</span>
                  <span className="cot-popup-value cot-popup-value--mono">{markerData[selectedMarker].mgrs}</span>
                </div>

                <div className="cot-popup-section">
                  <span className="cot-popup-label">Status</span>
                  <span className={`cot-popup-value cot-popup-status cot-popup-status--${markerData[selectedMarker].status.toLowerCase()}`}>
                    {markerData[selectedMarker].status}
                  </span>
                </div>

                {markerData[selectedMarker].members && (
                  <div className="cot-popup-section">
                    <span className="cot-popup-label">Members</span>
                    <span className="cot-popup-value">{markerData[selectedMarker].members.join(", ")}</span>
                  </div>
                )}

                {markerData[selectedMarker].heading && (
                  <div className="cot-popup-section">
                    <span className="cot-popup-label">Heading</span>
                    <span className="cot-popup-value cot-popup-value--mono">{markerData[selectedMarker].heading}</span>
                  </div>
                )}

                {markerData[selectedMarker].priority && (
                  <div className="cot-popup-section">
                    <span className="cot-popup-label">Priority</span>
                    <span className={`cot-popup-value cot-popup-priority cot-popup-priority--${markerData[selectedMarker].priority.toLowerCase()}`}>
                      {markerData[selectedMarker].priority}
                    </span>
                  </div>
                )}

                {markerData[selectedMarker].timeLimit && (
                  <div className="cot-popup-section">
                    <span className="cot-popup-label">Time Limit</span>
                    <span className="cot-popup-value cot-popup-value--mono">{markerData[selectedMarker].timeLimit}</span>
                  </div>
                )}

                {markerData[selectedMarker].frequency && (
                  <div className="cot-popup-section">
                    <span className="cot-popup-label">Frequency</span>
                    <span className="cot-popup-value cot-popup-value--mono">{markerData[selectedMarker].frequency}</span>
                  </div>
                )}

                {markerData[selectedMarker].threat && (
                  <div className="cot-popup-section">
                    <span className="cot-popup-label">Threat Level</span>
                    <span className="cot-popup-value cot-popup-threat">{markerData[selectedMarker].threat}</span>
                  </div>
                )}
              </div>

              <div className="cot-popup-actions">
                <button className="cot-action cot-action--primary">
                  <span>Navigate To</span>
                </button>
                <button className="cot-action">
                  <span>Share CoT</span>
                </button>
                <button className="cot-action">
                  <span>Set Waypoint</span>
                </button>
              </div>
            </div>
          )}

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
                <span className="tactical-hud-label">UTC</span>
                <span className="tactical-hud-value">{utcTime}</span>
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
                <h1 ref={heading1Ref}>MILSIM.AI</h1>
                <p>Command Your Battlefield</p>
              </div>
            </div>

            {/* Section 2: Event Command */}
            <div className="hero-content-block">
              <div className="hero-content-copy">
                <h2 ref={heading2Ref}>Event Command</h2>
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
                <h2 ref={heading3Ref}>Geofenced Zones</h2>
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
                <h2 ref={heading4Ref}>Tactical HUD</h2>
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
                <h2 ref={heading5Ref}>Squad Tracking</h2>
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
                <h2 ref={heading6Ref}>Mission Objectives</h2>
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

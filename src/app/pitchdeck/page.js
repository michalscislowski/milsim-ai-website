"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Animated counter component
function AnimatedCounter({ value, suffix = "", prefix = "" }) {
  const counterRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!counterRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
            gsap.fromTo(
              counterRef.current,
              { innerText: 0 },
              {
                innerText: numericValue,
                duration: 2,
                ease: "power2.out",
                snap: { innerText: value.includes(".") ? 0.1 : 1 },
                onUpdate: function () {
                  const current = parseFloat(this.targets()[0].innerText);
                  counterRef.current.innerText = prefix + current.toLocaleString() + suffix;
                },
              }
            );
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, [value, suffix, prefix, hasAnimated]);

  return <span ref={counterRef}>{prefix}0{suffix}</span>;
}

export default function PitchDeck() {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const slideRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [utcTime, setUtcTime] = useState("00:00:00");

  // UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(
        `${String(now.getUTCHours()).padStart(2, "0")}:${String(now.getUTCMinutes()).padStart(2, "0")}:${String(now.getUTCSeconds()).padStart(2, "0")}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // Progress bar animation
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, { "--progress": self.progress });
          }
          // Update current slide
          const totalSlides = slideRefs.current.length;
          const newSlide = Math.min(
            Math.floor(self.progress * totalSlides),
            totalSlides - 1
          );
          setCurrentSlide(newSlide);
        },
      });

      // Animate each slide
      slideRefs.current.forEach((slide, index) => {
        if (!slide) return;

        const content = slide.querySelector(".deck-slide-inner");
        const heading = slide.querySelector("h2");
        const number = slide.querySelector(".deck-slide-num");
        const items = slide.querySelectorAll(".deck-animate-item");
        const bars = slide.querySelectorAll(".deck-bar");
        const quotes = slide.querySelectorAll(".deck-quote");
        const diagrams = slide.querySelectorAll(".deck-diagram-box");

        // Initial state
        gsap.set(content, { opacity: 0, y: 60 });
        if (heading) gsap.set(heading, { opacity: 0, clipPath: "inset(0 100% 0 0)" });
        if (number) gsap.set(number, { opacity: 0, x: -20 });
        gsap.set(items, { opacity: 0, y: 30 });
        gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(quotes, { opacity: 0, x: -40, borderLeftColor: "transparent" });
        gsap.set(diagrams, { opacity: 0, scale: 0.9 });

        ScrollTrigger.create({
          trigger: slide,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            const tl = gsap.timeline();

            tl.to(content, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });

            if (number) {
              tl.to(number, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, "-=0.4");
            }

            if (heading) {
              tl.to(
                heading,
                {
                  opacity: 1,
                  clipPath: "inset(0 0% 0 0)",
                  duration: 0.8,
                  ease: "power2.inOut",
                },
                "-=0.3"
              );
            }

            tl.to(
              items,
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
              },
              "-=0.4"
            );

            tl.to(
              bars,
              {
                scaleX: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.3"
            );

            tl.to(
              quotes,
              {
                opacity: 1,
                x: 0,
                borderLeftColor: "var(--hud-green)",
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.5"
            );

            tl.to(
              diagrams,
              {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.15,
                ease: "back.out(1.2)",
              },
              "-=0.4"
            );
          },
        });
      });

      // Scanline effect
      gsap.to(".deck-scanline", {
        y: "100vh",
        duration: 4,
        repeat: -1,
        ease: "none",
      });
    },
    { scope: containerRef }
  );

  const addSlideRef = (el) => {
    if (el && !slideRefs.current.includes(el)) {
      slideRefs.current.push(el);
    }
  };

  return (
    <div className="deck" ref={containerRef}>
      {/* Scanline overlay */}
      <div className="deck-scanline" />

      {/* Fixed HUD elements */}
      <div className="deck-hud">
        <div className="deck-hud-top">
          <Link href="/" className="deck-logo">
            MILSIM<span>.AI</span>
          </Link>
          <div className="deck-hud-status">
            <span className="deck-status-dot" />
            <span>CLASSIFIED // INVESTOR BRIEF</span>
          </div>
          <div className="deck-hud-time">
            <span>UTC</span>
            <span className="deck-time-value">{utcTime}</span>
          </div>
        </div>

        <div className="deck-hud-bottom">
          <div className="deck-slide-counter">
            <span className="deck-counter-current">{String(currentSlide + 1).padStart(2, "0")}</span>
            <span className="deck-counter-sep">/</span>
            <span className="deck-counter-total">{String(slideRefs.current.length || 18).padStart(2, "0")}</span>
          </div>
          <div className="deck-progress" ref={progressRef}>
            <div className="deck-progress-bar" />
            <div className="deck-progress-glow" />
          </div>
          <div className="deck-hud-label">SCROLL TO ADVANCE</div>
        </div>

        {/* Corner brackets */}
        <div className="deck-corner deck-corner-tl" />
        <div className="deck-corner deck-corner-tr" />
        <div className="deck-corner deck-corner-bl" />
        <div className="deck-corner deck-corner-br" />
      </div>

      {/* SLIDE 1: Title */}
      <section className="deck-slide deck-slide-title" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <div className="deck-title-badge">SEED ROUND: $3-5M</div>
          <h1 className="deck-title-main">
            MilSim<span>Data</span>Platform
          </h1>
          <p className="deck-title-sub">The Force-on-Force Data Infrastructure Company</p>
          <div className="deck-title-tagline">
            <span>Strava for Tactical Sports</span>
            <span className="deck-plus">+</span>
            <span>Getty Images for AI Training Data</span>
          </div>
          <div className="deck-title-scroll">
            <div className="deck-scroll-indicator" />
          </div>
        </div>
      </section>

      {/* SLIDE 2: Problem */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">01</span>
          <h2>Defense AI Has a Data Crisis</h2>

          <blockquote className="deck-quote deck-animate-item">
            <p>"Exabytes of defense data, indispensable for AI training and inferencing, are currently evaporating."</p>
            <cite>— Palantir & Anduril, December 2024</cite>
          </blockquote>

          <div className="deck-comparison deck-animate-item">
            <div className="deck-comparison-item deck-comparison-bad">
              <span className="deck-comparison-label">Synthetic Data</span>
              <span className="deck-comparison-value">11%</span>
              <span className="deck-comparison-desc">accuracy</span>
            </div>
            <div className="deck-comparison-vs">VS</div>
            <div className="deck-comparison-item deck-comparison-good">
              <span className="deck-comparison-label">Real-World Data</span>
              <span className="deck-comparison-value">90%</span>
              <span className="deck-comparison-desc">accuracy</span>
            </div>
          </div>

          <div className="deck-stats-row">
            <div className="deck-stat deck-animate-item">
              <span className="deck-stat-value">80%</span>
              <span className="deck-stat-label">AI drone hit rate with real data</span>
            </div>
            <div className="deck-stat deck-animate-item">
              <span className="deck-stat-value">3-4x</span>
              <span className="deck-stat-label">Performance improvement</span>
            </div>
            <div className="deck-stat deck-animate-item">
              <span className="deck-stat-value">50%</span>
              <span className="deck-stat-label">2025 Ukraine drones with AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 3: Why Hard */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">02</span>
          <h2>Real Tactical Data is Scarce</h2>

          <div className="deck-grid-4">
            <div className="deck-problem-card deck-animate-item">
              <div className="deck-problem-icon">⛔</div>
              <h4>Combat Footage</h4>
              <p>Classified, dangerous, ethically constrained</p>
            </div>
            <div className="deck-problem-card deck-animate-item">
              <div className="deck-problem-icon">💰</div>
              <h4>Military Exercises</h4>
              <p>$Millions per exercise, infrequent</p>
            </div>
            <div className="deck-problem-card deck-animate-item">
              <div className="deck-problem-icon">🎮</div>
              <h4>Synthetic Simulation</h4>
              <p>80 percentage point performance gap</p>
            </div>
            <div className="deck-problem-card deck-animate-item">
              <div className="deck-problem-icon">📹</div>
              <h4>Civilian Video</h4>
              <p>No tactical relevance</p>
            </div>
          </div>

          <blockquote className="deck-quote deck-animate-item">
            <p>"It takes roughly 50 million pieces of data to create a 60-70% performant model."</p>
            <cite>— Army SBIR Program</cite>
          </blockquote>

          <div className="deck-callout deck-animate-item">
            No scalable source of real human tactical behavior data exists.
          </div>
        </div>
      </section>

      {/* SLIDE 4: Solution */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">03</span>
          <h2>We're Building Two Things</h2>

          <div className="deck-solution-grid">
            <div className="deck-solution-card deck-diagram-box">
              <div className="deck-solution-header">
                <span className="deck-solution-num">01</span>
                <h3>Consumer App</h3>
              </div>
              <p className="deck-solution-tagline">"Strava for Tactical Sports"</p>
              <div className="deck-solution-market">
                <span>$2.5B</span> airsoft market
                <span>2.5M+</span> players
              </div>
              <ul className="deck-feature-list">
                <li className="deck-animate-item">Tactical HUD with team positions</li>
                <li className="deck-animate-item">GPS tracking and analytics</li>
                <li className="deck-animate-item">Event management</li>
                <li className="deck-animate-item">Performance replay</li>
              </ul>
            </div>

            <div className="deck-solution-card deck-diagram-box">
              <div className="deck-solution-header">
                <span className="deck-solution-num">02</span>
                <h3>Data Platform</h3>
              </div>
              <p className="deck-solution-tagline">"Getty Images for AI"</p>
              <div className="deck-solution-market">
                For <span>defense AI</span>, <span>robotics</span>, <span>gaming</span>
              </div>
              <ul className="deck-feature-list">
                <li className="deck-animate-item">QR codes synced to GPS (ns accuracy)</li>
                <li className="deck-animate-item">Multi-hundred player sync</li>
                <li className="deck-animate-item">Multimodal: Video + Audio + GPS</li>
                <li className="deck-animate-item">Automated labeling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 5: How It Works */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">04</span>
          <h2>QR Sync Technology</h2>

          <div className="deck-flow">
            <div className="deck-flow-step deck-diagram-box">
              <div className="deck-flow-icon">📱</div>
              <h4>Player Devices</h4>
              <div className="deck-flow-items">
                <span>Phone App</span>
                <span>Helmet Cam</span>
                <span>GPS Watch</span>
              </div>
            </div>

            <div className="deck-flow-arrow deck-animate-item">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 4v16m0 0l6-6m-6 6l-6-6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>

            <div className="deck-flow-step deck-flow-step-highlight deck-diagram-box">
              <div className="deck-flow-icon">⚡</div>
              <h4>QR Code = GPS Timestamp</h4>
              <p className="deck-flow-detail">Nanosecond accuracy</p>
            </div>

            <div className="deck-flow-arrow deck-animate-item">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 4v16m0 0l6-6m-6 6l-6-6" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>

            <div className="deck-flow-step deck-diagram-box">
              <div className="deck-flow-icon">🎯</div>
              <h4>Synchronized Dataset</h4>
              <ul className="deck-flow-list">
                <li>Multi-POV video</li>
                <li>GPS tracks for all players</li>
                <li>Audio/comms</li>
                <li>Game events</li>
              </ul>
            </div>
          </div>

          <div className="deck-callout deck-animate-item">
            Perfect multi-hundred player synchronization for AI training data.
          </div>
        </div>
      </section>

      {/* SLIDE 6: Market */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">05</span>
          <h2>$42B+ Combined TAM</h2>

          <div className="deck-market-bars">
            <div className="deck-market-row deck-animate-item">
              <span className="deck-market-label">Defense AI</span>
              <div className="deck-market-bar-wrap">
                <div className="deck-bar" style={{ "--bar-width": "100%" }} />
              </div>
              <span className="deck-market-value">$18.75B</span>
              <span className="deck-market-growth">12.7% CAGR</span>
            </div>
            <div className="deck-market-row deck-animate-item">
              <span className="deck-market-label">Military Simulation</span>
              <div className="deck-market-bar-wrap">
                <div className="deck-bar" style={{ "--bar-width": "80%" }} />
              </div>
              <span className="deck-market-value">$15.12B</span>
              <span className="deck-market-growth">7.5% CAGR</span>
            </div>
            <div className="deck-market-row deck-animate-item">
              <span className="deck-market-label">Gaming AI</span>
              <div className="deck-market-bar-wrap">
                <div className="deck-bar" style={{ "--bar-width": "17%" }} />
              </div>
              <span className="deck-market-value">$3.2B</span>
              <span className="deck-market-growth">15% CAGR</span>
            </div>
            <div className="deck-market-row deck-animate-item">
              <span className="deck-market-label">AI Training Data</span>
              <div className="deck-market-bar-wrap">
                <div className="deck-bar deck-bar-highlight" style={{ "--bar-width": "14%" }} />
              </div>
              <span className="deck-market-value">$2.68B</span>
              <span className="deck-market-growth deck-growth-highlight">~27% CAGR</span>
            </div>
            <div className="deck-market-row deck-animate-item">
              <span className="deck-market-label">Airsoft Consumer</span>
              <div className="deck-market-bar-wrap">
                <div className="deck-bar" style={{ "--bar-width": "13%" }} />
              </div>
              <span className="deck-market-value">$2.53B</span>
              <span className="deck-market-growth">7.2% CAGR</span>
            </div>
          </div>

          <div className="deck-contracts deck-animate-item">
            <div className="deck-contract">
              <span className="deck-contract-name">Palantir Army</span>
              <span className="deck-contract-value">$10B</span>
            </div>
            <div className="deck-contract">
              <span className="deck-contract-name">Scale AI DoD</span>
              <span className="deck-contract-value">$200M+</span>
            </div>
            <div className="deck-contract">
              <span className="deck-contract-name">FY-25 DoD AI</span>
              <span className="deck-contract-value">$1.8B</span>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 7: Business Model */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">06</span>
          <h2>Dual Revenue Engine</h2>

          <div className="deck-model">
            <div className="deck-model-side deck-diagram-box">
              <span className="deck-model-type">SUPPLY</span>
              <h3>Consumer</h3>
              <div className="deck-model-box">
                <span className="deck-model-label">App Users</span>
                <span className="deck-model-price">$10-30/mo</span>
              </div>
            </div>

            <div className="deck-model-flow">
              <div className="deck-model-arrow deck-animate-item">
                <span>DATA</span>
                <svg viewBox="0 0 100 20">
                  <path d="M0,10 L90,10 M80,5 L90,10 L80,15" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>

            <div className="deck-model-side deck-diagram-box">
              <span className="deck-model-type">DEMAND</span>
              <h3>Enterprise</h3>
              <div className="deck-model-box">
                <span className="deck-model-label">Defense AI</span>
                <span className="deck-model-price">$150-300/hr</span>
              </div>
              <div className="deck-model-box">
                <span className="deck-model-label">Gaming</span>
                <span className="deck-model-price">$30-80/hr</span>
              </div>
            </div>
          </div>

          <div className="deck-mix deck-animate-item">
            <span className="deck-mix-label">Year 3 Revenue Mix</span>
            <div className="deck-mix-bar">
              <div className="deck-mix-consumer">20%</div>
              <div className="deck-mix-enterprise">80%</div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 8: Unit Economics */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">07</span>
          <h2>High-Margin Data Business</h2>

          <div className="deck-economics">
            <div className="deck-economics-card deck-diagram-box">
              <h3>Consumer</h3>
              <div className="deck-economics-rows">
                <div className="deck-economics-row deck-animate-item">
                  <span>CAC</span>
                  <span>$15-25</span>
                </div>
                <div className="deck-economics-row deck-animate-item">
                  <span>Monthly ARPU</span>
                  <span>$8-15</span>
                </div>
                <div className="deck-economics-row deck-animate-item">
                  <span>LTV</span>
                  <span>$150-300</span>
                </div>
                <div className="deck-economics-row deck-economics-highlight deck-animate-item">
                  <span>LTV:CAC</span>
                  <span>6-12x</span>
                </div>
              </div>
            </div>

            <div className="deck-economics-card deck-diagram-box">
              <h3>Enterprise</h3>
              <div className="deck-economics-rows">
                <div className="deck-economics-row deck-animate-item">
                  <span>Production cost</span>
                  <span>$10-20/hr</span>
                </div>
                <div className="deck-economics-row deck-animate-item">
                  <span>Sale price</span>
                  <span>$100-300/hr</span>
                </div>
                <div className="deck-economics-row deck-economics-highlight deck-animate-item">
                  <span>Gross margin</span>
                  <span>80-95%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="deck-flywheel deck-animate-item">
            <div className="deck-flywheel-item">More Users</div>
            <div className="deck-flywheel-arrow">→</div>
            <div className="deck-flywheel-item">More Data</div>
            <div className="deck-flywheel-arrow">→</div>
            <div className="deck-flywheel-item">Better Value</div>
            <div className="deck-flywheel-arrow">→</div>
            <div className="deck-flywheel-item">More Deals</div>
            <div className="deck-flywheel-arrow">→</div>
            <div className="deck-flywheel-item">More Revenue</div>
            <div className="deck-flywheel-arrow deck-flywheel-return">↩</div>
          </div>
        </div>
      </section>

      {/* SLIDE 9: Validation */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">08</span>
          <h2>Market Validation</h2>

          <div className="deck-validation-grid">
            <div className="deck-validation-col deck-diagram-box">
              <h3>Demand</h3>
              <ul>
                <li className="deck-animate-item">$1.8B FY-25 DoD AI budget</li>
                <li className="deck-animate-item">Palantir/Anduril "data crisis"</li>
                <li className="deck-animate-item">$38.3B top 10 FY-25 contracts</li>
                <li className="deck-animate-item">Ukraine: 3-4x with real data</li>
              </ul>
            </div>

            <div className="deck-validation-col deck-diagram-box">
              <h3>Supply</h3>
              <ul>
                <li className="deck-animate-item">$2.53B airsoft market</li>
                <li className="deck-animate-item">2.5M+ players globally</li>
                <li className="deck-animate-item">Ares Alpha proves demand</li>
                <li className="deck-animate-item">No B2B data play exists</li>
              </ul>
            </div>

            <div className="deck-validation-col deck-diagram-box">
              <h3>Technical</h3>
              <ul>
                <li className="deck-animate-item">GPS sync: nanosecond proven</li>
                <li className="deck-animate-item">NVIDIA ACE in production</li>
                <li className="deck-animate-item">Video data: $1-4/minute</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 10: Competition */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">09</span>
          <h2>White Space Opportunity</h2>

          <div className="deck-competitive deck-animate-item">
            <div className="deck-competitive-header">
              <span></span>
              <span>Consumer App</span>
              <span>Data Collection</span>
              <span>B2B Monetization</span>
            </div>
            <div className="deck-competitive-row">
              <span>Ares Alpha</span>
              <span className="deck-check">✓</span>
              <span className="deck-cross">✗</span>
              <span className="deck-cross">✗</span>
            </div>
            <div className="deck-competitive-row">
              <span>BattleTac</span>
              <span className="deck-check">✓</span>
              <span className="deck-cross">✗</span>
              <span className="deck-cross">✗</span>
            </div>
            <div className="deck-competitive-row">
              <span>Scale AI</span>
              <span className="deck-cross">✗</span>
              <span className="deck-cross">✗</span>
              <span className="deck-check">✓</span>
            </div>
            <div className="deck-competitive-row deck-competitive-us">
              <span>MilSim Platform</span>
              <span className="deck-check">✓</span>
              <span className="deck-check">✓</span>
              <span className="deck-check">✓</span>
            </div>
          </div>

          <div className="deck-moats">
            <div className="deck-moat deck-animate-item"><span>1</span>Network effects</div>
            <div className="deck-moat deck-animate-item"><span>2</span>Data moat</div>
            <div className="deck-moat deck-animate-item"><span>3</span>First mover</div>
            <div className="deck-moat deck-animate-item"><span>4</span>Vertical integration</div>
          </div>
        </div>
      </section>

      {/* SLIDE 11: GTM */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">10</span>
          <h2>Three-Phase Strategy</h2>

          <div className="deck-timeline">
            <div className="deck-timeline-phase deck-diagram-box">
              <div className="deck-phase-header">
                <span className="deck-phase-num">01</span>
                <span className="deck-phase-time">Months 1-6</span>
              </div>
              <h4>Community</h4>
              <ul>
                <li className="deck-animate-item">Launch MVP app</li>
                <li className="deck-animate-item">Partner with 50 events</li>
              </ul>
              <div className="deck-phase-targets">
                <span>10K users</span>
                <span>50K hours</span>
              </div>
            </div>

            <div className="deck-timeline-connector deck-animate-item">
              <svg viewBox="0 0 60 20">
                <path d="M0,10 L50,10 M40,5 L50,10 L40,15" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            <div className="deck-timeline-phase deck-diagram-box">
              <div className="deck-phase-header">
                <span className="deck-phase-num">02</span>
                <span className="deck-phase-time">Months 6-12</span>
              </div>
              <h4>Gaming</h4>
              <ul>
                <li className="deck-animate-item">First data licensing deal</li>
                <li className="deck-animate-item">SBIR Phase I application</li>
              </ul>
              <div className="deck-phase-targets">
                <span>$500K revenue</span>
                <span>100K hours</span>
              </div>
            </div>

            <div className="deck-timeline-connector deck-animate-item">
              <svg viewBox="0 0 60 20">
                <path d="M0,10 L50,10 M40,5 L50,10 L40,15" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            <div className="deck-timeline-phase deck-timeline-phase-final deck-diagram-box">
              <div className="deck-phase-header">
                <span className="deck-phase-num">03</span>
                <span className="deck-phase-time">Months 12-24</span>
              </div>
              <h4>Defense</h4>
              <ul>
                <li className="deck-animate-item">Enterprise contracts</li>
                <li className="deck-animate-item">Scale AI partnership</li>
              </ul>
              <div className="deck-phase-targets">
                <span>$5M ARR</span>
                <span>500K hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 12: Financials */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">11</span>
          <h2>Revenue Forecast</h2>

          <div className="deck-revenue-chart deck-animate-item">
            <div className="deck-revenue-bars">
              <div className="deck-revenue-year">
                <div className="deck-revenue-bar-stack">
                  <div className="deck-bar deck-bar-consumer" style={{ height: "8%" }} />
                </div>
                <span className="deck-revenue-label">Y1</span>
                <span className="deck-revenue-total">$800K</span>
              </div>
              <div className="deck-revenue-year">
                <div className="deck-revenue-bar-stack">
                  <div className="deck-bar deck-bar-consumer" style={{ height: "15%" }} />
                  <div className="deck-bar deck-bar-gaming" style={{ height: "8%" }} />
                  <div className="deck-bar deck-bar-defense" style={{ height: "15%" }} />
                </div>
                <span className="deck-revenue-label">Y2</span>
                <span className="deck-revenue-total">$5.5M</span>
              </div>
              <div className="deck-revenue-year">
                <div className="deck-revenue-bar-stack">
                  <div className="deck-bar deck-bar-consumer" style={{ height: "20%" }} />
                  <div className="deck-bar deck-bar-gaming" style={{ height: "12%" }} />
                  <div className="deck-bar deck-bar-defense" style={{ height: "40%" }} />
                </div>
                <span className="deck-revenue-label">Y3</span>
                <span className="deck-revenue-total">$19M</span>
              </div>
              <div className="deck-revenue-year">
                <div className="deck-revenue-bar-stack">
                  <div className="deck-bar deck-bar-consumer" style={{ height: "25%" }} />
                  <div className="deck-bar deck-bar-gaming" style={{ height: "20%" }} />
                  <div className="deck-bar deck-bar-defense" style={{ height: "75%" }} />
                </div>
                <span className="deck-revenue-label">Y4</span>
                <span className="deck-revenue-total">$50M</span>
              </div>
              <div className="deck-revenue-year">
                <div className="deck-revenue-bar-stack">
                  <div className="deck-bar deck-bar-consumer" style={{ height: "30%" }} />
                  <div className="deck-bar deck-bar-gaming" style={{ height: "22%" }} />
                  <div className="deck-bar deck-bar-defense" style={{ height: "100%" }} />
                </div>
                <span className="deck-revenue-label">Y5</span>
                <span className="deck-revenue-total">$115M</span>
              </div>
            </div>
            <div className="deck-revenue-legend">
              <span><i className="deck-legend-consumer" /> Consumer</span>
              <span><i className="deck-legend-gaming" /> Gaming</span>
              <span><i className="deck-legend-defense" /> Defense</span>
            </div>
          </div>

          <div className="deck-metrics">
            <div className="deck-metric deck-animate-item">
              <span className="deck-metric-value"><AnimatedCounter value="300" suffix="K" /></span>
              <span className="deck-metric-label">Registered Users</span>
            </div>
            <div className="deck-metric deck-animate-item">
              <span className="deck-metric-value"><AnimatedCounter value="100" suffix="K" /></span>
              <span className="deck-metric-label">Monthly Active</span>
            </div>
            <div className="deck-metric deck-animate-item">
              <span className="deck-metric-value"><AnimatedCounter value="1" suffix="M" /></span>
              <span className="deck-metric-label">Hours of Data</span>
            </div>
            <div className="deck-metric deck-animate-item">
              <span className="deck-metric-value"><AnimatedCounter value="15" /></span>
              <span className="deck-metric-label">Enterprise Customers</span>
            </div>
            <div className="deck-metric deck-animate-item">
              <span className="deck-metric-value"><AnimatedCounter value="80" suffix="%" /></span>
              <span className="deck-metric-label">Gross Margin</span>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 13: The Ask */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">12</span>
          <h2>Seed Round: $3-5M</h2>

          <div className="deck-ask-grid">
            <div className="deck-funds deck-diagram-box">
              <h3>Use of Funds</h3>
              <div className="deck-fund-items">
                <div className="deck-fund-item deck-animate-item">
                  <div className="deck-fund-bar-wrap">
                    <div className="deck-bar" style={{ "--bar-width": "100%" }} />
                  </div>
                  <span className="deck-fund-label">Product Development</span>
                  <span className="deck-fund-pct">40%</span>
                </div>
                <div className="deck-fund-item deck-animate-item">
                  <div className="deck-fund-bar-wrap">
                    <div className="deck-bar" style={{ "--bar-width": "62.5%" }} />
                  </div>
                  <span className="deck-fund-label">User Acquisition</span>
                  <span className="deck-fund-pct">25%</span>
                </div>
                <div className="deck-fund-item deck-animate-item">
                  <div className="deck-fund-bar-wrap">
                    <div className="deck-bar" style={{ "--bar-width": "37.5%" }} />
                  </div>
                  <span className="deck-fund-label">Enterprise Sales</span>
                  <span className="deck-fund-pct">15%</span>
                </div>
                <div className="deck-fund-item deck-animate-item">
                  <div className="deck-fund-bar-wrap">
                    <div className="deck-bar" style={{ "--bar-width": "25%" }} />
                  </div>
                  <span className="deck-fund-label">Operations</span>
                  <span className="deck-fund-pct">10%</span>
                </div>
                <div className="deck-fund-item deck-animate-item">
                  <div className="deck-fund-bar-wrap">
                    <div className="deck-bar" style={{ "--bar-width": "25%" }} />
                  </div>
                  <span className="deck-fund-label">Reserve</span>
                  <span className="deck-fund-pct">10%</span>
                </div>
              </div>
            </div>

            <div className="deck-milestones deck-diagram-box">
              <h3>Milestones to Series A</h3>
              <ul>
                <li className="deck-animate-item"><span className="deck-milestone-dot" />100K registered users</li>
                <li className="deck-animate-item"><span className="deck-milestone-dot" />25K monthly active</li>
                <li className="deck-animate-item"><span className="deck-milestone-dot" />250K hours of data</li>
                <li className="deck-animate-item"><span className="deck-milestone-dot" />$2M ARR</li>
                <li className="deck-animate-item"><span className="deck-milestone-dot" />5+ enterprise customers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 14: Team */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">13</span>
          <h2>Building the Team</h2>

          <div className="deck-team-grid">
            <div className="deck-team-section deck-diagram-box">
              <h3>Core Roles <span>(Hiring)</span></h3>
              <div className="deck-roles">
                <div className="deck-role deck-role-critical deck-animate-item">
                  <span className="deck-role-priority">CRITICAL</span>
                  <span className="deck-role-title">CTO</span>
                  <span className="deck-role-focus">Data platform, sync tech</span>
                </div>
                <div className="deck-role deck-role-critical deck-animate-item">
                  <span className="deck-role-priority">CRITICAL</span>
                  <span className="deck-role-title">VP Engineering</span>
                  <span className="deck-role-focus">Mobile app, infrastructure</span>
                </div>
                <div className="deck-role deck-role-high deck-animate-item">
                  <span className="deck-role-priority">HIGH</span>
                  <span className="deck-role-title">VP Sales</span>
                  <span className="deck-role-focus">Defense relationships</span>
                </div>
                <div className="deck-role deck-role-high deck-animate-item">
                  <span className="deck-role-priority">HIGH</span>
                  <span className="deck-role-title">Head of Community</span>
                  <span className="deck-role-focus">User growth, events</span>
                </div>
              </div>
            </div>

            <div className="deck-team-section deck-diagram-box">
              <h3>Advisory <span>(Recruiting)</span></h3>
              <ul className="deck-advisors">
                <li className="deck-animate-item">Defense procurement expert</li>
                <li className="deck-animate-item">Gaming industry veteran</li>
                <li className="deck-animate-item">Airsoft community leader</li>
                <li className="deck-animate-item">ML/AI technical advisor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 15: Why Now */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">14</span>
          <h2>Window of Opportunity</h2>

          <div className="deck-why-now">
            <div className="deck-forces deck-diagram-box">
              <h3>Converging Forces</h3>
              <ol>
                <li className="deck-animate-item">Defense AI spending explosion <span>($1.8B FY-25, +40%)</span></li>
                <li className="deck-animate-item">Industry data crisis acknowledged</li>
                <li className="deck-animate-item">Ukraine validated real data <span>(3-4x improvement)</span></li>
                <li className="deck-animate-item">Gaming AI revolution <span>(NVIDIA ACE, 84% adoption)</span></li>
                <li className="deck-animate-item">Data licensing market matured <span>($130M Reddit)</span></li>
              </ol>
            </div>

            <div className="deck-window deck-diagram-box">
              <h3>First-Mover Window</h3>
              <ul>
                <li className="deck-animate-item">No competitor pursuing B2B data play</li>
                <li className="deck-animate-item">Defense procurement modernizing</li>
                <li className="deck-animate-item">Consumer app demand proven</li>
                <li className="deck-animate-item">Technical feasibility demonstrated</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 16: Comparables */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">15</span>
          <h2>Exit Potential</h2>

          <div className="deck-comps">
            <div className="deck-comp deck-diagram-box">
              <span className="deck-comp-value">$13.8B</span>
              <span className="deck-comp-name">Scale AI</span>
              <span className="deck-comp-model">Data labeling for AI</span>
            </div>
            <div className="deck-comp deck-diagram-box">
              <span className="deck-comp-value">$30.5B</span>
              <span className="deck-comp-name">Anduril</span>
              <span className="deck-comp-model">Defense tech</span>
            </div>
            <div className="deck-comp deck-diagram-box">
              <span className="deck-comp-value">$1.5B</span>
              <span className="deck-comp-name">Strava</span>
              <span className="deck-comp-model">Consumer sports app</span>
            </div>
            <div className="deck-comp deck-diagram-box">
              <span className="deck-comp-value">$13B</span>
              <span className="deck-comp-name">Unity</span>
              <span className="deck-comp-model">Gaming platform + data</span>
            </div>
          </div>

          <div className="deck-position deck-animate-item">
            <p><strong>Scale AI</strong> proves data services command premium valuations.</p>
            <p><strong>Strava</strong> proves consumer sports apps can scale.</p>
            <p><strong>Anduril</strong> proves defense tech is investable.</p>
            <p className="deck-position-emphasis">We combine all three.</p>
          </div>
        </div>
      </section>

      {/* SLIDE 17: Summary */}
      <section className="deck-slide" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <span className="deck-slide-num">16</span>
          <h2>The Opportunity</h2>

          <div className="deck-summary-grid">
            <div className="deck-summary-item deck-diagram-box">
              <h4>The Problem</h4>
              <p>Defense AI has an <strong>80 percentage point performance gap</strong> due to lack of real tactical training data.</p>
            </div>
            <div className="deck-summary-item deck-diagram-box">
              <h4>The Solution</h4>
              <p><strong>MilSim Data Platform</strong> captures real human tactical behavior from airsoft events at scale.</p>
            </div>
            <div className="deck-summary-item deck-diagram-box">
              <h4>The Market</h4>
              <p><strong>$42B+ TAM</strong> across defense AI, military simulation, gaming, and consumer.</p>
            </div>
            <div className="deck-summary-item deck-diagram-box">
              <h4>The Ask</h4>
              <p><strong>$3-5M Seed</strong> to build the team, launch the app, and close first enterprise deals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SLIDE 18: Closing */}
      <section className="deck-slide deck-slide-closing" ref={addSlideRef}>
        <div className="deck-slide-inner">
          <blockquote className="deck-quote deck-quote-large">
            <p>"The question is not whether this data has value—it's whether you can collect it at scale and quality."</p>
          </blockquote>

          <div className="deck-answer deck-animate-item">We can.</div>

          <ul className="deck-closing-points">
            <li className="deck-animate-item">2.5M+ airsoft players generating millions of hours annually</li>
            <li className="deck-animate-item">Multimodal data no one else is capturing</li>
            <li className="deck-animate-item">Dual-use value: defense, robotics, gaming</li>
            <li className="deck-animate-item">First-mover advantage in a validated market</li>
          </ul>

          <div className="deck-cta deck-animate-item">
            <h3>Let's Talk</h3>
            <p className="deck-confidential">Confidential — For Investor Discussion Only</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="deck-footer">
        <p>MilSim Data Platform — Investor Pitch Deck — January 2025</p>
      </footer>
    </div>
  );
}

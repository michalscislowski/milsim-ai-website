# MilSim Data Platform
## Investor Pitch Deck

---

# SLIDE 1: TITLE

# MilSim Data Platform

### The Force-on-Force Data Infrastructure Company

**Strava for Tactical Sports + Getty Images for AI Training Data**

*Seed Round: $3-5M*

---

# SLIDE 2: THE PROBLEM

## Defense AI Has a Data Crisis

> **"Exabytes of defense data, indispensable for AI training and inferencing, are currently evaporating."**
> — Palantir & Anduril, December 2024

### The Sim-to-Real Gap

| Training Data | Real-World Performance |
|---------------|----------------------|
| Synthetic only | **11% accuracy** |
| Real-world data | **90% accuracy** |

*Source: Apple Machine Learning Research*

### Ukraine Proved It

- AI-trained drones: **80% hit rate** (vs 30-50% baseline)
- 2 million hours of combat footage = **3-4x performance improvement**
- Ukrainian military: **50% of 2025 drones** will have AI (up from 0.5%)

---

# SLIDE 3: WHY IT'S HARD

## Real Tactical Data is Scarce

| Source | Problem |
|--------|---------|
| **Combat footage** | Classified, dangerous, ethically constrained |
| **Military exercises** | $Millions per exercise, infrequent |
| **Synthetic simulation** | 80 percentage point performance gap |
| **Civilian video** | No tactical relevance |

### The Army's Acknowledgment

> "It takes roughly **50 million pieces of data** to create a 60-70% performant model."
> — Army SBIR Program

**No scalable source of real human tactical behavior data exists.**

---

# SLIDE 4: THE SOLUTION

## We're Building Two Things

### 1. Consumer App: "Strava for Tactical Sports"

For the **$2.5B airsoft market** and **2.5M+ players**:

- Tactical HUD with team positions
- GPS tracking and movement analytics
- Event management and coordination
- Performance tracking and replay
- Community and team features

### 2. Data Platform: "Getty Images for AI"

For **defense AI, robotics, and gaming**:

- QR codes synced to GPS timestamps (nanosecond accuracy)
- Multi-hundred player sessions synchronized
- Multimodal datasets: Video + Audio + GPS + Sensors
- Automated labeling from game rules

---

# SLIDE 5: HOW IT WORKS

## QR Sync Technology

```
┌──────────────────────────────────────────┐
│           PLAYER DEVICES                  │
│   Phone App    Helmet Cam    GPS Watch   │
│       │            │             │        │
│       └────────────┼─────────────┘        │
│                    │                      │
│         QR Code = GPS Timestamp           │
│         (nanosecond accuracy)             │
│                    │                      │
│                    ▼                      │
│   ┌────────────────────────────────┐     │
│   │     SYNCHRONIZED DATASET        │     │
│   │  • Multi-POV video              │     │
│   │  • GPS tracks for all players   │     │
│   │  • Audio/comms                  │     │
│   │  • Sensor data                  │     │
│   │  • Game events (hits, objectives)│    │
│   └────────────────────────────────┘     │
└──────────────────────────────────────────┘
```

**Result:** Perfect multi-hundred player synchronization for AI training data.

---

# SLIDE 6: MARKET OPPORTUNITY

## $42B+ Combined TAM

| Market | 2025 Size | Growth |
|--------|-----------|--------|
| **Defense AI** | $18.75B | 12.7% CAGR |
| **Military Simulation** | $15.12B | 7.5% CAGR |
| **AI Training Data** | $2.68B | ~27% CAGR |
| **Gaming AI** | $3.2B | 15% CAGR |
| **Airsoft Consumer** | $2.53B | 7.2% CAGR |

### Contract Evidence

- **Palantir Army contract:** $10 billion (10 years)
- **Scale AI DoD contracts:** $200M+
- **FY-25 DoD AI budget:** $1.8 billion (+40% YoY)

---

# SLIDE 7: BUSINESS MODEL

## Dual Revenue Engine

```
┌─────────────────────────────────────────────┐
│                                             │
│   CONSUMER               ENTERPRISE         │
│   (Supply)               (Demand)           │
│                                             │
│   ┌─────────┐           ┌─────────┐        │
│   │ App     │           │ Defense │        │
│   │ Users   │──────────▶│ AI      │        │
│   │         │   DATA    │         │        │
│   │ $10-30  │           │ $150-   │        │
│   │ /month  │           │ 300/hr  │        │
│   └─────────┘           └─────────┘        │
│       │                      │             │
│       │                 ┌─────────┐        │
│       │                 │ Gaming  │        │
│       └────────────────▶│         │        │
│                         │ $30-80  │        │
│                         │ /hr     │        │
│                         └─────────┘        │
│                                             │
│   Y3 Mix:    20%              80%          │
└─────────────────────────────────────────────┘
```

---

# SLIDE 8: UNIT ECONOMICS

## High-Margin Data Business

### Consumer

| Metric | Value |
|--------|-------|
| CAC | $15-25 |
| Monthly ARPU | $8-15 |
| LTV | $150-300 |
| **LTV:CAC** | **6-12x** |

### Enterprise Data

| Metric | Value |
|--------|-------|
| Production cost | $10-20/hour |
| Sale price | $100-300/hour |
| **Gross margin** | **80-95%** |

### The Flywheel

More Users → More Data → Better Value → More Enterprise Deals → More Revenue → More Features → More Users

---

# SLIDE 9: TRACTION / VALIDATION

## Market Signals

### Demand Validation

| Signal | Evidence |
|--------|----------|
| Defense spending | $1.8B FY-25 DoD AI budget |
| Industry acknowledgment | Palantir/Anduril "data crisis" statement |
| Contract activity | $38.3B in top 10 FY-25 AI contracts |
| Ukraine results | 3-4x improvement with real data |

### Supply Validation

| Signal | Evidence |
|--------|----------|
| Airsoft market | $2.53B, 7.2% CAGR |
| Player base | 2.5M+ globally |
| Existing apps | Ares Alpha, BattleTac prove demand |
| Competitive gap | No B2B data play exists |

### Technical Validation

| Signal | Evidence |
|--------|----------|
| GPS sync | Nanosecond accuracy proven |
| Video AI | NVIDIA ACE in production |
| Data pricing | $1-4/minute for video |

---

# SLIDE 10: COMPETITIVE LANDSCAPE

## White Space Opportunity

|  | Consumer App | Data Collection | B2B Monetization |
|--|--------------|-----------------|------------------|
| **Ares Alpha** | ✅ | ❌ | ❌ |
| **BattleTac** | ✅ | ❌ | ❌ |
| **Scale AI** | ❌ | ❌ (labels only) | ✅ |
| **BISim/VBS** | ❌ | ❌ (synthetic) | ✅ |
| **MilSim Platform** | ✅ | ✅ | ✅ |

### Our Moats

1. **Network effects** - More players = more data = better analytics
2. **Data moat** - Unique dataset that compounds
3. **First mover** - No competitor pursuing B2B
4. **Vertical integration** - Own supply and demand

---

# SLIDE 11: GO-TO-MARKET

## Three-Phase Strategy

### Phase 1: Community (Months 1-6)
- Launch MVP app
- Partner with 50 events
- Target: **10K users, 50K hours data**

### Phase 2: Gaming (Months 6-12)
- First data licensing deal
- SBIR Phase I application
- Target: **$500K revenue, 100K hours**

### Phase 3: Defense (Months 12-24)
- Enterprise contracts
- Scale AI partnership
- Target: **$5M ARR, 500K hours**

---

# SLIDE 12: FINANCIAL PROJECTIONS

## Revenue Forecast

| Year | Consumer | Gaming | Defense | Total |
|------|----------|--------|---------|-------|
| Y1 | $500K | $200K | $0 | **$800K** |
| Y2 | $2M | $1M | $2M | **$5.5M** |
| Y3 | $5M | $3M | $10M | **$19M** |
| Y4 | $10M | $8M | $30M | **$50M** |
| Y5 | $20M | $15M | $75M | **$115M** |

### Key Metrics (Year 3)

| Metric | Target |
|--------|--------|
| Registered users | 300K |
| Monthly active | 100K |
| Hours of data | 1M |
| Enterprise customers | 15 |
| Gross margin | 80% |

---

# SLIDE 13: THE ASK

## Seed Round: $3-5M

### Use of Funds

| Category | % | Amount |
|----------|---|--------|
| **Product Development** | 40% | $1.6M |
| **User Acquisition** | 25% | $1M |
| **Enterprise Sales** | 15% | $600K |
| **Operations** | 10% | $400K |
| **Reserve** | 10% | $400K |

### Milestones to Series A

- 100K registered users
- 25K monthly active
- 250K hours of data
- $2M ARR
- 5+ enterprise customers

---

# SLIDE 14: TEAM

## Building the Team

### Core Roles (Hiring)

| Role | Priority | Focus |
|------|----------|-------|
| **CTO** | Critical | Data platform, sync tech |
| **VP Engineering** | Critical | Mobile app, infrastructure |
| **VP Sales** | High | Defense relationships |
| **Head of Community** | High | User growth, events |

### Advisory (Recruiting)

- Defense procurement expert
- Gaming industry veteran
- Airsoft community leader
- ML/AI technical advisor

---

# SLIDE 15: WHY NOW

## Window of Opportunity

### Converging Forces

1. **Defense AI spending explosion** ($1.8B FY-25, +40%)
2. **Industry data crisis acknowledged** (Palantir/Anduril)
3. **Ukraine validated real data** (3-4x improvement)
4. **Gaming AI revolution** (NVIDIA ACE, 84% adoption)
5. **Data licensing market matured** ($130M Reddit, $1-4/min video)

### First-Mover Window

- No competitor pursuing B2B data play
- Defense procurement modernizing
- Consumer app demand proven
- Technical feasibility demonstrated

---

# SLIDE 16: COMPARABLE OUTCOMES

## Exit Potential

| Company | Model | Valuation |
|---------|-------|-----------|
| **Scale AI** | Data labeling for AI | $13.8B |
| **Anduril** | Defense tech | $30.5B |
| **Strava** | Consumer sports app | $1.5B |
| **Unity** | Gaming platform + data | $13B (acquired) |

### Our Position

**Scale AI** proves data services command premium valuations.
**Strava** proves consumer sports apps can scale.
**Anduril** proves defense tech is investable.
**We combine all three.**

---

# SLIDE 17: THE OPPORTUNITY

## Summary

### The Problem
Defense AI has an **80 percentage point performance gap** due to lack of real tactical training data.

### The Solution
**MilSim Data Platform** captures real human tactical behavior from airsoft events at scale.

### The Market
**$42B+ TAM** across defense AI, military simulation, gaming, and consumer.

### The Ask
**$3-5M Seed** to build the team, launch the app, and close first enterprise deals.

---

# SLIDE 18: CLOSING

## The Big Picture

> "The question is not whether this data has value—it's whether you can collect it at scale and quality."

**We can.**

- 2.5M+ airsoft players generating millions of hours annually
- Multimodal data no one else is capturing
- Dual-use value: defense, robotics, gaming
- First-mover advantage in a validated market

### Let's Talk

**[Contact Information]**

*Confidential - For Investor Discussion Only*

---

# APPENDIX SLIDES

---

# APPENDIX A: DETAILED MARKET DATA

## Defense AI Market

| Year | Value | Source |
|------|-------|--------|
| 2024 | $16.35B | Fortune Business Insights |
| 2025 | $18.75B | Fortune Business Insights |
| 2026 | $22.41B | Fortune Business Insights |
| 2034 | $101.02B | Fortune Business Insights |

## Contract Details

| Contract | Value | Term |
|----------|-------|------|
| Palantir Army | $10B | 10 years |
| Palantir Maven | $1.3B ceiling | Through 2029 |
| Scale AI Army R&D | $99.5M | — |
| Scale AI DoD/CDAO | $100M ceiling | — |

---

# APPENDIX B: TECHNICAL ARCHITECTURE

```
┌─────────────────────────────────────────────────────────┐
│                   USER DEVICES                           │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │  Phone  │  │ Helmet  │  │  GPS    │  │ Sensors │    │
│  │   App   │  │ Camera  │  │ Logger  │  │         │    │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘    │
│       │            │            │            │          │
│       └────────────┴────────────┴────────────┘          │
│                          │                              │
│              QR Sync Layer (GPS timestamp)              │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   CLOUD PLATFORM                         │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │                DATA INGEST                       │   │
│  │  • Video upload & validation                     │   │
│  │  • GPS track processing                          │   │
│  │  • Audio extraction                              │   │
│  │  • Sensor data normalization                     │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│                          ▼                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              PROCESSING PIPELINE                 │   │
│  │  • QR code extraction & timestamp sync           │   │
│  │  • Multi-view alignment                          │   │
│  │  • Pose estimation                               │   │
│  │  • Event detection & labeling                    │   │
│  │  • Quality scoring                               │   │
│  └─────────────────────────────────────────────────┘   │
│                          │                              │
│                          ▼                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │              DATA PRODUCTS                       │   │
│  │  • Consumer analytics (app)                      │   │
│  │  • Enterprise datasets (B2B)                     │   │
│  │  • API access (partners)                         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

# APPENDIX C: COMPETITIVE DEEP DIVE

## Existing Airsoft Apps

| App | GPS | HUD | Video | Analytics | B2B | Users |
|-----|-----|-----|-------|-----------|-----|-------|
| Ares Alpha | ✅ | ✅ | ❌ | Basic | ❌ | ~50K |
| BattleTac | ✅ | ✅ | ❌ | Basic | ❌ | ~30K |
| Airsoft.Top | ✅ | ✅ | ❌ | Basic | ❌ | ~20K |
| Airsoft Run | ✅ | ✅ | ❌ | ❌ | ❌ | ~10K |

**Gap:** None pursue video capture or B2B data monetization.

## Defense Data Companies

| Company | Data Source | Limitation |
|---------|-------------|------------|
| Scale AI | Client-provided | Labels, doesn't collect |
| Palantir | Government | Infrastructure, not tactical data |
| BISim | Synthetic | 80% performance gap |
| Maxar | Satellite | No ground-level tactical |

**Gap:** No company collects real human tactical behavior data at scale.

---

# APPENDIX D: RISK MATRIX

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data quality insufficient | Medium | High | Spec requirements, quality gates |
| Defense sales cycle | High | Medium | Gaming as faster path |
| Consumer adoption slow | Medium | Medium | Event partnerships, influencers |
| Competitor entry | Low | Medium | First-mover, network effects |
| ITAR compliance | Medium | High | Legal counsel, domestic focus |
| Privacy concerns | Medium | Medium | Consent framework, anonymization |
| Team assembly | Medium | High | Competitive comp, mission focus |

---

# APPENDIX E: REFERENCES

### Market Research
- [Fortune Business Insights: AI Military Market](https://www.fortunebusinessinsights.com/artificial-intelligence-in-military-market-113094)
- [Grand View Research: Airsoft Market](https://www.grandviewresearch.com/industry-analysis/airsoft-guns-market)
- [GlobeNewswire: Military Simulation](https://www.globenewswire.com/news-release/2026/01/21/3222592/28124/en/Military-Simulation-and-Training-Research-Report-2026-19-58-Bn-Market-Opportunities-Trends-Competitive-Landscape-Strategies-and-Forecasts-2020-2025-2025-2030F-2035F.html)

### Contract Evidence
- [CNBC: Palantir $10B Contract](https://www.cnbc.com/2025/08/01/palantir-lands-10-billion-army-software-and-data-contract.html)
- [Executive Gov: FY25 AI Contracts](https://www.executivegov.com/articles/biggest-ai-defense-contracts-fy-2025)

### Technical Validation
- [Apple: Domain Gap Research](https://machinelearning.apple.com/research/bridging-the-domain-gap-for-neural-models)
- [Breaking Defense: Ukraine AI](https://breakingdefense.com/2025/03/trained-on-classified-battlefield-data-ai-multiplies-effectiveness-of-ukraines-drones-report/)

---

*Pitch Deck prepared: January 2025*
*Confidential - For Investor Discussion Only*

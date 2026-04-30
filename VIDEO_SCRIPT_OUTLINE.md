# TCU Career Compass - 5-Minute Video Walkthrough Script

## Structure (5 minutes = ~300 seconds)

---

## OPENING (0:00-0:30 | 30 seconds)
**PAGE: Title card or index.html (map overview)**

**Research Question & Problem**

"Hi, I'm [Your Name]. This is TCU Career Compass, an interactive tool I built to help students answer a question that most of us ask when graduating: Where should I live for my major?

Most students choose cities based on what they've heard or gut feeling. But what if you could actually compare real salary data, job availability, and cost-of-living across different cities for your specific career path? That's what this project does."

**Hook:** "And here's the thing — higher salary doesn't always mean better affordability."

---

## METHODOLOGY (0:30-1:45 | 75 seconds)
**PAGE: method.html (navigate from index)**

**How I approached it**

"I combined three data sources:
- BLS occupational wage data (what people actually earn in different cities)
- Regional Price Parities from the Bureau of Economic Analysis (cost-of-living adjustments)
- And career path mapping (connecting TCU business majors to real jobs)

The key insight was moving beyond just looking at nominal salary. I used Regional Price Parities — a cost-of-living index that includes housing, food, transportation, utilities, and services — to adjust salaries so they're comparable across different expensive and affordable cities."

**10 metros analyzed:** New York, San Francisco, Los Angeles, Boston, Chicago, Dallas, Denver, Charlotte, Atlanta, and Washington DC.

**AI Tools reflection:** "I used ChatGPT and GitHub Copilot for repetitive coding tasks and initial drafts. But all the big decisions — choosing RPP over just housing costs, selecting which occupations map to which majors, designing the wage adjustment formula — those were mine. I had to be critical of what the AI suggested and verify everything matched what my code actually does."

---

## WALKTHROUGH: THE TOOL (1:45-4:00 | 135 seconds)
**PAGE: index.html (navigate back to main map)**

**Live demo of the interactive map**

### Step 1: Major Selection (0:20)
"You start by picking your major from this dropdown — let's say Finance."
[Screen: Select Finance]

### Step 2: Career Path Selection (0:20)
"Once you pick a major, you see specific career paths within it. Let me click Financial Analysis."
[Screen: Select career path]

### Step 3: Map Visualization (0:45)
"Now here's the interactive map. You see cities with markers — let me explain what you're looking at:

- **Purple stars** highlight the highest-paying city for that specific job
- **Purple circles** represent all other cities, colored by their wage percentile:
  - Darkest purple = top 10% earners
  - Lighter purple = below top 70%

This visual instantly shows you where the best opportunities are for your specific career path."

[Screen: Point to markers, click one]

### Step 4: City Details (0:30)
"When you click a city, you see:
- The occupation title
- Annual mean wage (raw salary)
- Location quotient (how concentrated that job is in that city)
- Adjusted wage (what the salary actually buys you after cost-of-living adjustments)"

### Step 5: Quick Insights & Rankings (0:20)
"And in the sidebar, you get instant insights:
- Highest Salary (raw pay)
- Best Overall Fit (adjusted pay — the real purchasing power)
- Strongest Concentration (where the job market is most competitive)

Plus a ranked list of top cities for that career path."

---

## FINDINGS & INSIGHTS (4:00-4:30 | 30 seconds)
**PAGE: findings.html (navigate from index)**

**What I discovered**

"Here's what the data revealed:

1. **Higher salary ≠ better affordability** — San Francisco and New York pay more, but after cost-of-living adjustment, Dallas and Charlotte often rank higher for actual purchasing power.

2. **Mid-sized metros are underrated** — Cities like Charlotte and Atlanta offer competitive adjusted wages with significantly lower living costs.

3. **Career path matters as much as major** — Different careers within Finance have different geographic opportunities. Data Analytics clusters in tech hubs, but Credit & Lending is more distributed."

---

## DESIGN CHOICES & REFLECTION (4:30-5:00 | 30 seconds)
**PAGE: method.html (navigate from findings, or stay on findings)**

**Why I built it this way**

"I made three key design decisions:

1. **Interactive map over static charts** — Because I wanted students to explore their own situation in real-time, not just read a report.

2. **Cost-of-living adjustment as the core metric** — Most tools show raw salary. I wanted to show what really matters: purchasing power.

3. **Simple, focused interface** — No unnecessary features. Just: pick your major, pick your career, explore the map. Done.

**What I'd do differently:** I'd expand beyond the 10 metros I analyzed. Given more time, I'd include 50+ metros and add quality-of-life factors like walkability, cultural amenities, and proximity to family."

---

## CLOSING (5:00)
**PAGE: conclusion.html (navigate from method or findings)**

**Purpose & Impact**

"This tool isn't meant to make your decision for you. It's meant to give you real data to make an informed one. Salary matters. Cost of living matters. But so do community, growth potential, and personal preference. This tool answers the money question so you can focus on everything else."

---

## TALKING POINTS TO MEMORIZE

**If asked about RPP choice:**
"Housing alone was too complex — rent vs. own, bedrooms, neighborhood variation. RPP gives a cleaner, more comprehensive picture of real purchasing power."

**If asked about metro selection:**
"I chose these 10 metros because they represent the major business hubs and geographic diversity where TCU graduates typically work."

**If asked about the hardest part:**
"Mapping business majors to BLS occupations. There's no perfect one-to-one mapping. I had to research what entry-level jobs graduates actually take and match them to BLS occupation codes."

**If asked about AI experience:**
"Helpful for coding grunt work and initial drafts, but AI can't make the judgment calls. It suggested a lot of generic explanations that didn't fit my specific project. I had to heavily edit and verify everything."

---

## TECHNICAL NOTES FOR RECORDING

- **Screen resolution:** 1920x1080 or higher
- **Microphone:** Clear audio (test beforehand)
- **Lighting:** Well-lit face if showing yourself
- **Pacing:** Speak naturally, not rushed (5 min = ~625 words if paced normally)
- **Demo fluidity:** Practice clicking through the tool 2-3 times before recording

---

## APPROXIMATE WORD COUNT BY SECTION
- Opening: 75 words
- Methodology: 185 words
- Tool Walkthrough: 310 words
- Findings: 95 words
- Design/Reflection: 80 words
- **Total: ~745 words** (should take ~5 minutes at natural pace)

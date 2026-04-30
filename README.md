# TCU Career Compass

Interactive web application and map that helps students answer:

**"Given my major, where should I live based on salary, job opportunity, and cost-of-living affordability?"**

## Overview

TCU Career Compass combines real occupational wage data with cost-of-living adjustments to show which cities offer the best combination of salary and purchasing power for each TCU business major and career path. The key insight: **higher salary doesn't always mean better affordability**.

## Project Scope

- **7 business majors**: Finance, Accounting, Marketing, BIS, Supply Chain, Management, Innovation & Entrepreneurship
- **10 metropolitan areas**: New York, San Francisco, Los Angeles, Boston, Chicago, Dallas, Denver, Charlotte, Atlanta, Washington DC
- **27 data sources**: Real BLS occupational wage data for entry-level positions in each major
- **Core metric**: Adjusted salary (cost-of-living normalized) for fair city-to-city comparison

## How It Works

1. User selects a **major** and **career path** from dropdowns
2. Interactive map displays cities with colored markers:
   - **Purple stars** = highest-paying city for that role
   - **Dark purple circles** = top 10% earners; lighter purple = below top 70%
3. Clicking a city reveals:
   - Annual mean wage (raw salary)
   - Location quotient (job concentration)
   - Adjusted wage (purchasing power after cost-of-living)
4. Sidebar provides instant insights:
   - Highest Salary (raw pay)
   - Best Overall Fit (adjusted pay—real purchasing power)
   - Strongest Concentration (most competitive job market)

## Project Structure

```
housing-affordability-analysis/
├── docs/
│   ├── index.html              # Interactive map (main app)
│   ├── about.html              # How to read the map and use the tool
│   ├── literature.html         # Research foundation and academic context
│   ├── method.html             # Data sources, methodology, AI tool use
│   ├── findings.html           # Key statistics and discoveries
│   ├── conclusion.html         # Design choices and project reflection
│   ├── script.js               # Core map logic, data filtering, insights
│   ├── style.css               # Styling and layout
│   └── data/                   # 27 JSON files organized by major
│       ├── Accounting/
│       ├── BIS/
│       ├── Finance/
│       ├── InnovationEntrepreneurship/
│       ├── Management/
│       ├── Marketing/
│       └── SupplyChain/
├── notebooks/
│   └── data_prep.ipynb         # Data collection and processing workflow
├── README.md                   # This file
└── VIDEO_SCRIPT_OUTLINE.md     # 5-minute presentation script
```

## Data & Methodology

### Data Sources

- **BLS Occupational Employment and Wage Statistics (OEWS)**: Real wage data by metropolitan area
- **Bureau of Economic Analysis (BEA) Regional Price Parities 2024**: Cost-of-living index covering housing, transportation, food, utilities, and services
- **Career Path Mapping**: Custom mapping connecting TCU business majors to BLS occupation codes

### Key Metrics

- **Annual Mean Wage**: Raw salary from BLS (not adjusted for cost of living)
- **Location Quotient**: Relative concentration of a job in a city (1.0 = national average)
- **Adjusted Annual Wage**: Salary normalized by Regional Price Parity for fair affordability comparison
  - Formula: `annual_wage ÷ (regional_price_parity ÷ 100)`

### Data Structure

Each of 27 JSON files contains:
- Career path name and BLS occupation code
- 10 metros with: employment, location quotient, hourly/annual wages, RPP, adjusted wage, latitude/longitude

**Total Coverage:**
- 7 business majors × 3-4 career paths per major = ~27 occupation profiles
- Each profile covers 10 metropolitan areas
- ~270 total city-career data points

## Quick Start

### Online
Visit the live site: **[TCU Career Compass](https://grahamgobbel.github.io/housing-affordability-analysis/)**

### Local Development
1. Clone the repository
2. Open `docs/index.html` in your browser
3. Select a major and career path to explore the map
4. Click markers to view city insights

## Key Features

- **Interactive Leaflet.js Map**: Explore 10 major metropolitan areas
- **Cost-of-Living Adjustment**: Salaries normalized by Regional Price Parity for fair comparison
- **Visual Hierarchy**: Stars highlight top earners; circle colors show percentile rank
- **Instant Insights**: Three ranked metrics for quick decision-making
- **Comprehensive Documentation**: 5-page research foundation explaining methodology and findings
- **Academic Standards**: Fully cited sources (10 academic + 2 AI tool references in APA format)

## Pages

- **Index** (`index.html`): Main interactive map
- **About** (`about.html`): How to read and use the tool
- **Literature** (`literature.html`): Research foundation and theoretical context
- **Method** (`method.html`): Data collection, methodology, and AI tool disclosure
- **Findings** (`findings.html`): Key statistics and research discoveries
- **Conclusion** (`conclusion.html`): Design choices and project reflection

## Technology Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Mapping**: Leaflet.js 1.9.4 with custom SVG markers
- **Data**: JSON files organized by major
- **Development**: GitHub Pages for deployment

## Key Insights

What the data reveals:

1. **Higher salary ≠ better affordability** — San Francisco and New York pay more, but after cost-of-living adjustment, mid-sized metros like Dallas and Charlotte often rank higher for actual purchasing power.

2. **Mid-sized metros are underrated** — Cities like Charlotte and Atlanta offer competitive adjusted wages with significantly lower living costs compared to coastal tech hubs.

3. **Career path matters as much as major** — Different careers within the same major have different geographic opportunities. Data analytics clusters in tech hubs; credit & lending is more distributed.

4. **Regional variation matters** — Cost-of-living differences between metros range from 90.2 to 110.7 on the BEA index, affecting real purchasing power significantly.

## Project Details

- **Timeline**: 7-week capstone project
- **Institution**: Texas Christian University
- **Major**: Business (various concentrations)
- **Academic Standards**: All claims backed by citations; AI tools (ChatGPT, GitHub Copilot) disclosed and credited in methodology
- **Purpose**: Help graduating students make informed location decisions based on real data, not assumptions

## Files & Documentation

- See [AFFORDABILITY_UPDATE_SUMMARY.md](AFFORDABILITY_UPDATE_SUMMARY.md) for change log and project evolution
- Check [VIDEO_SCRIPT_OUTLINE.md](VIDEO_SCRIPT_OUTLINE.md) for the 5-minute presentation script with navigation cues

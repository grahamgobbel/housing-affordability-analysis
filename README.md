# Career Location Map

Interactive web app and map that helps students answer:

"Given my major, where should I live based on job availability, salary, and affordability?"

## Project Scope (7-week friendly)

The app is intentionally small for a capstone timeline:

- 2-3 majors
- 5-10 cities per major
- core city metrics: average salary, monthly rent, affordability ratio, and a simple score

## App Flow

1. User selects a major from a dropdown.
2. Map displays cities tied to that major.
3. Clicking a city shows role, salary, rent, affordability ratio, and score.

## Current Structure

```
housing-affordability-analysis/
|- docs/
|  |- data/
|  |  |- Accounting/
|  |  |- BIS/
|  |  |- Finance/
|  |  |- InnovationEntrepreneurship/
|  |  |- Management/
|  |  |- Marketing/
|  |  |- SupplyChain/
|  |- index.html
|  |- about.html
|  |- style.css
|  `- script.js
|- notebooks/
|  `- data_prep.ipynb
`- README.md
```

## Data

The app uses real BLS occupation data organized by major and career path:

- **27 JSON files** across 7 business majors
- **Regional Price Parity (RPP)** adjustments for cost-of-living comparisons
- **Affordability metrics** combining salary and location quotient data

## Quick Start

1. Open `docs/index.html` in a browser.
2. Choose a major in the dropdown.
3. Click city markers to view city insights.

## Next Build Steps

1. Move hardcoded data into `data/cleaned/` JSON/CSV.
2. Add filtering for job title in addition to major.
3. Add city comparison table in `outputs/tables/`.
4. Replace fake metrics with BLS + rent data pipeline in `notebooks/data_prep.ipynb`.

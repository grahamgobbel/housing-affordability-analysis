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
|- data/
|  |- raw/
|  |- cleaned/
|  `- top100citiesrent.csv
|- app/
|  |- index.html
|  |- style.css
|  `- script.js
|- notebooks/
|  |- affordability_analysis.ipynb
|  `- data_prep.ipynb
|- outputs/
|  |- charts/
|  `- tables/
`- README.md
```

## Data Plan

Use fake sample data first (already in `app/script.js`) to finish the full app flow.
Then replace with cleaned real sources:

- major -> common jobs mapping
- job + city salary/openings data (BLS)
- city rent/housing data

## Quick Start

1. Open `app/index.html` in a browser.
2. Choose a major in the dropdown.
3. Click city markers to view city insights.

## Next Build Steps

1. Move hardcoded data into `data/cleaned/` JSON/CSV.
2. Add filtering for job title in addition to major.
3. Add city comparison table in `outputs/tables/`.
4. Replace fake metrics with BLS + rent data pipeline in `notebooks/data_prep.ipynb`.

# Affordability Layer Update - Summary

## Transformation Complete ✓

All 27 metro-level JSON data files have been successfully updated with an affordability layer using 2024 state-level Regional Price Parities (RPPs) from the BEA.

### Files Transformed
- **27 JSON files** across 7 major categories
- **198 total records** updated
- **100% success rate**

Files transformed from:
- `Accounting/` (3 files, 30 records)
- `BIS/` (4 files, 36 records)
- `Finance/` (4 files, 40 records)
- `InnovationEntrepreneurship/` (4 files, 16 records)
- `Management/` (4 files, 16 records)
- `Marketing/` (4 files, 40 records)
- `SupplyChain/` (4 files, 20 records)

## New Fields Added to Each Record

### 1. **rpp** (Number)
The Regional Price Parity value for the state where the metro is located.
- Example: New York has RPP of 107.9 (7.9% above national average)
- Example: Arkansas has RPP of 86.9 (13.1% below national average)
- Fallback default: 100.0 if state cannot be determined

### 2. **adjusted_annual_mean_wage** (Number)
The annual mean wage adjusted for cost of living differences.
- Calculated as: `annual_mean_wage ÷ (rpp ÷ 100)`
- Allows fair salary comparison across different cost-of-living areas
- Rounded to 2 decimal places
- Example: NYC accounting auditor: $104,690 ÷ 1.079 = **$97,025.02**

### 3. **affordability_score** (Number)
A composite affordability metric combining purchasing power and job concentration.
- Calculated as: `(adjusted_wage ÷ $70,000) × location_quotient`, clamped to 0–1 range
- Reflects real earning power in the local market combined with field concentration
- Helps identify areas where you can earn more relative to cost of living
- Example: NYC accounting: (97,025.02 ÷ 70,000) × 1.32 = **1.0** (capped at max)

## State Extraction Logic

The state is extracted from the metro string following these rules:
- Format: `"City Name, STATE"` or `"City Name, STATE-STATE-STATE"`
- Use the **first state** after the comma
- Examples:
  - `"Dallas-Fort Worth-Arlington, TX"` → TX (97.1 RPP)
  - `"Boston-Cambridge-Newton, MA-NH"` → MA (105.8 RPP)
  - `"New York-Newark-Jersey City, NY-NJ-PA"` → NY (107.9 RPP)
  - `"Washington-Arlington-Alexandria, DC-VA-MD-WV"` → DC (109.9 RPP)

## Code Updates

### docs/script.js - normalizeRecord() Function
Updated to include three new fields:
```javascript
rpp: Number(record.rpp) || 100.0,
adjusted_annual_mean_wage: Number(record.adjusted_annual_mean_wage) || 0,
affordability_score: Number(record.affordability_score) || 0,
```

### docs/script.js - buildPopupHtml() Function
Enhanced to display affordability information in popups:
- Shows original annual wage
- Shows adjusted wage with RPP context
- Shows new affordability score
- Maintains backward compatibility with existing score field

## Existing Data Preserved

✓ All existing fields retained (career_path, bls_occupation, employment, location_quotient, etc.)
✓ Original score field unchanged (preserved for ranking/coloring)
✓ Valid JSON formatting maintained in all files
✓ All coordinates and metadata preserved

## How to Use the New Fields

In your application:
1. **For salary comparisons**: Use `adjusted_annual_mean_wage` instead of raw `annual_mean_wage`
2. **For affordability ranking**: Use `affordability_score` for cost-of-living-aware rankings
3. **For transparency**: Show `rpp` value to users for context on adjustments
4. **For analysis**: Compare original vs. adjusted wages to identify cost-of-living impacts

## Example Transformation

**Before:**
```json
{
  "career_path": "Accounting / Audit",
  "bls_occupation": "Accountants and Auditors",
  "metro": "New York-Newark-Jersey City, NY-NJ-PA",
  "employment": 141820,
  "location_quotient": 1.32,
  "annual_mean_wage": 104690,
  "hourly_mean_wage": 50.33,
  "score": 0.96,
  "lat": 40.7128,
  "lng": -74.0060
}
```

**After:**
```json
{
  "career_path": "Accounting / Audit",
  "bls_occupation": "Accountants and Auditors",
  "metro": "New York-Newark-Jersey City, NY-NJ-PA",
  "employment": 141820,
  "location_quotient": 1.32,
  "annual_mean_wage": 104690,
  "hourly_mean_wage": 50.33,
  "score": 0.96,
  "lat": 40.7128,
  "lng": -74.0060,
  "rpp": 107.9,
  "adjusted_annual_mean_wage": 97025.02,
  "affordability_score": 1.0
}
```

## Next Steps (Optional)

Consider these enhancements:
1. Update UI controls to allow sorting by affordability score
2. Add tooltips explaining RPP and adjusted wage calculations
3. Create affordability comparison charts showing wage vs. cost-of-living
4. Use affordability score in insights cards ("Best Affordability" alongside "Best Overall Fit")
5. Add a filter for "High Affordability" positions (affordability_score > 0.8)

---

**Date Completed:** April 20, 2026
**All 27 files successfully transformed and ready for use.**

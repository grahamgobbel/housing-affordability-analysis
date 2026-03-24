const cityCareerData = [
  const data = [
  // ACCOUNTING
  { city: "Dallas", state: "TX", major: "Accounting", job: "Accountant", salary: 70000, rent: 1500, lat: 32.7767, lng: -96.7970 },
  { city: "Chicago", state: "IL", major: "Accounting", job: "Accountant", salary: 72000, rent: 1800, lat: 41.8781, lng: -87.6298 },
  { city: "Atlanta", state: "GA", major: "Accounting", job: "Accountant", salary: 68000, rent: 1400, lat: 33.7490, lng: -84.3880 },
  { city: "New York", state: "NY", major: "Accounting", job: "Accountant", salary: 80000, rent: 2800, lat: 40.7128, lng: -74.0060 },
  { city: "Charlotte", state: "NC", major: "Accounting", job: "Accountant", salary: 69000, rent: 1500, lat: 35.2271, lng: -80.8431 },

  // FINANCE
  { city: "New York", state: "NY", major: "Finance", job: "Financial Analyst", salary: 95000, rent: 2800, lat: 40.7128, lng: -74.0060 },
  { city: "Chicago", state: "IL", major: "Finance", job: "Financial Analyst", salary: 85000, rent: 1800, lat: 41.8781, lng: -87.6298 },
  { city: "Charlotte", state: "NC", major: "Finance", job: "Financial Analyst", salary: 80000, rent: 1500, lat: 35.2271, lng: -80.8431 },
  { city: "Dallas", state: "TX", major: "Finance", job: "Financial Analyst", salary: 82000, rent: 1500, lat: 32.7767, lng: -96.7970 },
  { city: "Atlanta", state: "GA", major: "Finance", job: "Financial Analyst", salary: 78000, rent: 1400, lat: 33.7490, lng: -84.3880 },

  // MARKETING
  { city: "New York", state: "NY", major: "Marketing", job: "Marketing Specialist", salary: 75000, rent: 2800, lat: 40.7128, lng: -74.0060 },
  { city: "Los Angeles", state: "CA", major: "Marketing", job: "Marketing Specialist", salary: 72000, rent: 2600, lat: 34.0522, lng: -118.2437 },
  { city: "Chicago", state: "IL", major: "Marketing", job: "Marketing Specialist", salary: 70000, rent: 1800, lat: 41.8781, lng: -87.6298 },
  { city: "Austin", state: "TX", major: "Marketing", job: "Marketing Specialist", salary: 72000, rent: 1800, lat: 30.2672, lng: -97.7431 },
  { city: "Atlanta", state: "GA", major: "Marketing", job: "Marketing Specialist", salary: 68000, rent: 1400, lat: 33.7490, lng: -84.3880 },

  // BIS
  { city: "Austin", state: "TX", major: "BIS", job: "Business Analyst", salary: 95000, rent: 1800, lat: 30.2672, lng: -97.7431 },
  { city: "Dallas", state: "TX", major: "BIS", job: "Business Analyst", salary: 90000, rent: 1500, lat: 32.7767, lng: -96.7970 },
  { city: "Seattle", state: "WA", major: "BIS", job: "Business Analyst", salary: 110000, rent: 2200, lat: 47.6062, lng: -122.3321 },
  { city: "Denver", state: "CO", major: "BIS", job: "Business Analyst", salary: 95000, rent: 1900, lat: 39.7392, lng: -104.9903 },
  { city: "Atlanta", state: "GA", major: "BIS", job: "Business Analyst", salary: 88000, rent: 1400, lat: 33.7490, lng: -84.3880 },

  // MANAGEMENT
  { city: "Chicago", state: "IL", major: "Management", job: "Management Analyst", salary: 90000, rent: 1800, lat: 41.8781, lng: -87.6298 },
  { city: "Dallas", state: "TX", major: "Management", job: "Management Analyst", salary: 88000, rent: 1500, lat: 32.7767, lng: -96.7970 },
  { city: "Atlanta", state: "GA", major: "Management", job: "Management Analyst", salary: 85000, rent: 1400, lat: 33.7490, lng: -84.3880 },
  { city: "New York", state: "NY", major: "Management", job: "Management Analyst", salary: 100000, rent: 2800, lat: 40.7128, lng: -74.0060 },
  { city: "Houston", state: "TX", major: "Management", job: "Management Analyst", salary: 87000, rent: 1400, lat: 29.7604, lng: -95.3698 }
];

const majorSelect = document.getElementById("majorSelect");
const insightsContainer = document.getElementById("insightCards");

const map = L.map("map", {
  scrollWheelZoom: true,
  minZoom: 3
}).setView([39.5, -98.35], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);

function affordabilityPercent(salary, rent) {
  return ((rent * 12) / salary) * 100;
}

function makeCityScore(record) {
  const affordability = affordabilityPercent(record.salary, record.rent);
  const salaryScore = Math.min((record.salary / 150000) * 50, 50);
  const openingsScore = Math.min((record.openings / 20000) * 30, 30);
  const affordabilityScore = Math.max(20 - affordability / 2, 0);
  return Math.round(salaryScore + openingsScore + affordabilityScore);
}

function popupHtml(record) {
  const affordability = affordabilityPercent(record.salary, record.rent);
  const score = makeCityScore(record);

  return `
    <h3 class="popup-title">${record.city} - ${record.major}</h3>
    <p class="popup-line"><strong>Role:</strong> ${record.job}</p>
    <p class="popup-line"><strong>Avg salary:</strong> $${record.salary.toLocaleString()}</p>
    <p class="popup-line"><strong>Avg monthly rent:</strong> $${record.rent.toLocaleString()}</p>
    <p class="popup-line"><strong>Affordability ratio:</strong> ${affordability.toFixed(1)}%</p>
    <p class="popup-line"><strong>Opportunity score:</strong> ${score}/100</p>
  `;
}

function getActiveData() {
  const selectedMajor = majorSelect.value;
  return selectedMajor === "All"
    ? cityCareerData
    : cityCareerData.filter((item) => item.major === selectedMajor);
}

function renderInsightCards(records) {
  if (!records.length) {
    insightsContainer.innerHTML = "<p>No cities found for this major.</p>";
    return;
  }

  const topBySalary = [...records].sort((a, b) => b.salary - a.salary)[0];
  const topAffordable = [...records].sort(
    (a, b) => affordabilityPercent(a.salary, a.rent) - affordabilityPercent(b.salary, b.rent)
  )[0];
  const topOpenings = [...records].sort((a, b) => b.openings - a.openings)[0];

  insightsContainer.innerHTML = `
    <article class="insight-card">
      <h3>Top salary city: ${topBySalary.city}</h3>
      <p>${topBySalary.job} at $${topBySalary.salary.toLocaleString()}</p>
    </article>
    <article class="insight-card">
      <h3>Most affordable: ${topAffordable.city}</h3>
      <p>${affordabilityPercent(topAffordable.salary, topAffordable.rent).toFixed(1)}% income-to-rent ratio</p>
    </article>
    <article class="insight-card">
      <h3>Most openings: ${topOpenings.city}</h3>
      <p>${topOpenings.openings.toLocaleString()} estimated openings</p>
    </article>
  `;
}

function renderMapMarkers() {
  markerLayer.clearLayers();
  const activeData = getActiveData();

  activeData.forEach((record) => {
    L.marker([record.lat, record.lng]).bindPopup(popupHtml(record)).addTo(markerLayer);
  });

  renderInsightCards(activeData);
}

function populateMajorSelect() {
  const majors = [...new Set(cityCareerData.map((item) => item.major))];
  majors.forEach((major) => {
    const option = document.createElement("option");
    option.value = major;
    option.textContent = major;
    majorSelect.appendChild(option);
  });
}

majorSelect.addEventListener("change", renderMapMarkers);

populateMajorSelect();
renderMapMarkers();

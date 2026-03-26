// Expanded data with career paths and roles
const majorCareerData = {
  "Accounting": {
    roles: [
      {
        title: "Accountant",
        description: "Entry-level role focused on tax prep and financial record-keeping.",
        cities: [
          { city: "Dallas", state: "TX", salary: 70000, rent: 1500, lat: 32.7767, lng: -96.7970, demand: "Strong" },
          { city: "Chicago", state: "IL", salary: 72000, rent: 1800, lat: 41.8781, lng: -87.6298, demand: "Strong" },
          { city: "Atlanta", state: "GA", salary: 68000, rent: 1400, lat: 33.7490, lng: -84.3880, demand: "Very Strong" },
          { city: "New York", state: "NY", salary: 80000, rent: 2800, lat: 40.7128, lng: -74.0060, demand: "Strong" },
          { city: "Charlotte", state: "NC", salary: 69000, rent: 1500, lat: 35.2271, lng: -80.8431, demand: "Strong" }
        ]
      },
      {
        title: "Financial Analyst",
        description: "Mid-level role analyzing financial data and trends.",
        cities: [
          { city: "New York", state: "NY", salary: 85000, rent: 2800, lat: 40.7128, lng: -74.0060, demand: "Very Strong" },
          { city: "Dallas", state: "TX", salary: 82000, rent: 1500, lat: 32.7767, lng: -96.7970, demand: "Strong" },
          { city: "Chicago", state: "IL", salary: 80000, rent: 1800, lat: 41.8781, lng: -87.6298, demand: "Strong" }
        ]
      }
    ]
  },
  "Finance": {
    roles: [
      {
        title: "Financial Analyst",
        description: "Analyze investments and market opportunities.",
        cities: [
          { city: "New York", state: "NY", salary: 95000, rent: 2800, lat: 40.7128, lng: -74.0060, demand: "Very Strong" },
          { city: "Chicago", state: "IL", salary: 85000, rent: 1800, lat: 41.8781, lng: -87.6298, demand: "Strong" },
          { city: "Charlotte", state: "NC", salary: 80000, rent: 1500, lat: 35.2271, lng: -80.8431, demand: "Strong" },
          { city: "Dallas", state: "TX", salary: 82000, rent: 1500, lat: 32.7767, lng: -96.7970, demand: "Strong" },
          { city: "Atlanta", state: "GA", salary: 78000, rent: 1400, lat: 33.7490, lng: -84.3880, demand: "Very Strong" }
        ]
      },
      {
        title: "Investment Manager",
        description: "Manage portfolios and investment strategies.",
        cities: [
          { city: "New York", state: "NY", salary: 120000, rent: 2800, lat: 40.7128, lng: -74.0060, demand: "Strong" },
          { city: "Boston", state: "MA", salary: 115000, rent: 2400, lat: 42.3601, lng: -71.0589, demand: "Strong" }
        ]
      }
    ]
  },
  "Marketing": {
    roles: [
      {
        title: "Marketing Specialist",
        description: "Execute marketing campaigns and analyze performance.",
        cities: [
          { city: "New York", state: "NY", salary: 75000, rent: 2800, lat: 40.7128, lng: -74.0060, demand: "Very Strong" },
          { city: "Los Angeles", state: "CA", salary: 72000, rent: 2600, lat: 34.0522, lng: -118.2437, demand: "Very Strong" },
          { city: "Chicago", state: "IL", salary: 70000, rent: 1800, lat: 41.8781, lng: -87.6298, demand: "Strong" },
          { city: "Austin", state: "TX", salary: 72000, rent: 1800, lat: 30.2672, lng: -97.7431, demand: "Very Strong" },
          { city: "Atlanta", state: "GA", salary: 68000, rent: 1400, lat: 33.7490, lng: -84.3880, demand: "Strong" }
        ]
      },
      {
        title: "Brand Manager",
        description: "Develop brand strategy and oversee campaigns.",
        cities: [
          { city: "New York", state: "NY", salary: 95000, rent: 2800, lat: 40.7128, lng: -74.0060, demand: "Strong" },
          { city: "Los Angeles", state: "CA", salary: 92000, rent: 2600, lat: 34.0522, lng: -118.2437, demand: "Strong" }
        ]
      }
    ]
  },
  "BIS": {
    roles: [
      {
        title: "Business Analyst",
        description: "Optimize business processes with data-driven recommendations.",
        cities: [
          { city: "Austin", state: "TX", salary: 95000, rent: 1800, lat: 30.2672, lng: -97.7431, demand: "Very Strong" },
          { city: "Dallas", state: "TX", salary: 90000, rent: 1500, lat: 32.7767, lng: -96.7970, demand: "Strong" },
          { city: "Seattle", state: "WA", salary: 110000, rent: 2200, lat: 47.6062, lng: -122.3321, demand: "Very Strong" },
          { city: "Denver", state: "CO", salary: 95000, rent: 1900, lat: 39.7392, lng: -104.9903, demand: "Strong" },
          { city: "Atlanta", state: "GA", salary: 88000, rent: 1400, lat: 33.7490, lng: -84.3880, demand: "Strong" }
        ]
      },
      {
        title: "Data Analyst",
        description: "Extract insights from big data using analytics tools.",
        cities: [
          { city: "Seattle", state: "WA", salary: 105000, rent: 2200, lat: 47.6062, lng: -122.3321, demand: "Very Strong" },
          { city: "San Francisco", state: "CA", salary: 125000, rent: 3500, lat: 37.7749, lng: -122.4194, demand: "Very Strong" },
          { city: "Austin", state: "TX", salary: 100000, rent: 1800, lat: 30.2672, lng: -97.7431, demand: "Very Strong" }
        ]
      }
    ]
  },
  "Management": {
    roles: [
      {
        title: "Management Analyst",
        description: "Improve organizational efficiency and strategy.",
        cities: [
          { city: "Chicago", state: "IL", salary: 90000, rent: 1800, lat: 41.8781, lng: -87.6298, demand: "Strong" },
          { city: "Dallas", state: "TX", salary: 88000, rent: 1500, lat: 32.7767, lng: -96.7970, demand: "Strong" },
          { city: "Atlanta", state: "GA", salary: 85000, rent: 1400, lat: 33.7490, lng: -84.3880, demand: "Strong" },
          { city: "New York", state: "NY", salary: 100000, rent: 2800, lat: 40.7128, lng: -74.0060, demand: "Very Strong" },
          { city: "Houston", state: "TX", salary: 87000, rent: 1400, lat: 29.7604, lng: -95.3698, demand: "Strong" }
        ]
      },
      {
        title: "Operations Manager",
        description: "Oversee day-to-day business operations.",
        cities: [
          { city: "Dallas", state: "TX", salary: 92000, rent: 1500, lat: 32.7767, lng: -96.7970, demand: "Very Strong" },
          { city: "Houston", state: "TX", salary: 90000, rent: 1400, lat: 29.7604, lng: -95.3698, demand: "Very Strong" }
        ]
      }
    ]
  }
};

// Flatten data for backwards compatibility and easier processing
const cityCareerData = [];
Object.entries(majorCareerData).forEach(([major, majorData]) => {
  majorData.roles.forEach(role => {
    role.cities.forEach(cityData => {
      cityCareerData.push({
        major,
        job: role.title,
        ...cityData
      });
    });
  });
});

// State management
let appState = {
  selectedMajor: "All",
  selectedRole: null,
  highlightedCity: null
};

// DOM elements
const majorSelect = document.getElementById("majorSelect");
const insightsContainer = document.getElementById("insightCards");
const careerPathButtons = document.getElementById("careerPathButtons");
const topCitiesContainer = document.getElementById("topCities");

// Initialize map
const map = L.map("map", {
  scrollWheelZoom: true,
  minZoom: 3
}).setView([39.5, -98.35], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);

// Utility functions
function affordabilityPercent(salary, rent) {
  return ((rent * 12) / salary) * 100;
}

function calculateCompositeScore(record) {
  const affordability = affordabilityPercent(record.salary, record.rent);
  const salaryScore = Math.min((record.salary / 150000) * 50, 50);
  const affordabilityScore = Math.max(20 - affordability / 2, 0);
  const demandScore = record.demand === "Very Strong" ? 30 : record.demand === "Strong" ? 20 : 10;
  return Math.round(salaryScore + affordabilityScore + demandScore);
}

function getMarkerColor(score) {
  if (score >= 85) return "#247ba0"; // Blue - excellent
  if (score >= 70) return "#2ab7ca"; // Teal - very good
  if (score >= 55) return "#52b788"; // Green - good
  return "#ffb703"; // Orange - moderate
}

function getActiveData() {
  let data = cityCareerData;

  if (appState.selectedMajor !== "All") {
    data = data.filter(item => item.major === appState.selectedMajor);
  }

  if (appState.selectedRole) {
    data = data.filter(item => item.job === appState.selectedRole);
  }

  return data;
}

function popupHtml(record) {
  const affordability = affordabilityPercent(record.salary, record.rent);
  const score = calculateCompositeScore(record);
  const affordabilityLabel = affordability < 25 ? "Excellent" : affordability < 35 ? "Good" : "Moderate";

  return `
    <div class="popup-content">
      <h3 class="popup-title">${record.city}, ${record.state}</h3>
      <p class="popup-line"><strong>Role:</strong> ${record.job}</p>
      <p class="popup-line"><strong>Avg Salary:</strong> $${record.salary.toLocaleString()}</p>
      <p class="popup-line"><strong>Avg Rent:</strong> $${record.rent.toLocaleString()}/mo</p>
      <p class="popup-line"><strong>Affordability:</strong> ${affordability.toFixed(1)}% (${affordabilityLabel})</p>
      <p class="popup-line"><strong>Market Demand:</strong> ${record.demand}</p>
      <p class="popup-line"><strong>Overall Score:</strong> <strong>${score}/100</strong></p>
    </div>
  `;
}

function renderCareerPathButtons() {
  if (appState.selectedMajor === "All") {
    careerPathButtons.innerHTML = '<p style="color: #4d5a7a; font-size: 0.9rem;">Select a major to see career paths.</p>';
    return;
  }

  const majorData = majorCareerData[appState.selectedMajor];
  if (!majorData) {
    careerPathButtons.innerHTML = '';
    return;
  }

  careerPathButtons.innerHTML = majorData.roles.map(role => `
    <button class="role-button ${appState.selectedRole === role.title ? 'active' : ''}" data-role="${role.title}">
      ${role.title}
    </button>
  `).join('');

  // Attach event listeners
  document.querySelectorAll('.role-button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      appState.selectedRole = appState.selectedRole === e.target.dataset.role ? null : e.target.dataset.role;
      render();
    });
  });
}

function renderTopCities() {
  const activeData = getActiveData();

  if (!activeData.length) {
    topCitiesContainer.innerHTML = '<p style="color: #4d5a7a; font-size: 0.9rem;">No cities found for this selection.</p>';
    return;
  }

  // Group by city and calculate best salary for each city
  const cityMap = {};
  activeData.forEach(record => {
    const key = `${record.city}, ${record.state}`;
    if (!cityMap[key] || record.salary > cityMap[key].salary) {
      cityMap[key] = record;
    }
  });

  // Convert to array and sort by composite score
  const sortedCities = Object.values(cityMap)
    .sort((a, b) => calculateCompositeScore(b) - calculateCompositeScore(a))
    .slice(0, 8); // Show top 8 cities

  topCitiesContainer.innerHTML = sortedCities.map(record => {
    const affordability = affordabilityPercent(record.salary, record.rent);
    const score = calculateCompositeScore(record);
    const isHighlighted = appState.highlightedCity === `${record.city}, ${record.state}`;

    return `
      <div class="city-item ${isHighlighted ? 'highlighted' : ''}" data-city="${record.city}" data-state="${record.state}">
        <div class="city-item-title">${record.city}, ${record.state}</div>
        <div class="city-item-meta">
          <div class="city-item-stat">
            <span class="city-item-stat-label">Salary:</span>
            <span class="city-item-stat-value">$${(record.salary / 1000).toFixed(0)}k</span>
          </div>
          <div class="city-item-stat">
            <span class="city-item-stat-label">Rent:</span>
            <span class="city-item-stat-value">$${record.rent.toLocaleString()}/mo</span>
          </div>
          <div class="city-item-stat">
            <span class="city-item-stat-label">Affordability:</span>
            <span class="city-item-stat-value">${affordability.toFixed(1)}%</span>
          </div>
          <div class="city-item-stat">
            <span class="city-item-stat-label">Demand:</span>
            <span class="city-item-stat-value">${record.demand}</span>
          </div>
        </div>
        <div class="city-item-score">
          <span>Overall Fit</span>
          <span class="score-value">${score}/100</span>
        </div>
      </div>
    `;
  }).join('');

  // Attach event listeners
  document.querySelectorAll('.city-item').forEach(item => {
    item.addEventListener('click', () => {
      const city = item.dataset.city;
      const state = item.dataset.state;
      appState.highlightedCity = appState.highlightedCity === `${city}, ${state}` ? null : `${city}, ${state}`;
      renderTopCities();
      renderMapMarkers();
    });
  });
}

function renderInsightCards() {
  const activeData = getActiveData();

  if (!activeData.length) {
    insightsContainer.innerHTML = "<p style='color: #4d5a7a;'>No data available for this selection.</p>";
    return;
  }

  // Find top salary, most affordable, and best overall fit
  const topSalary = [...activeData].sort((a, b) => b.salary - a.salary)[0];
  
  const topAffordable = [...activeData].sort(
    (a, b) => affordabilityPercent(a.salary, a.rent) - affordabilityPercent(b.salary, b.rent)
  )[0];

  const bestFit = [...activeData].sort(
    (a, b) => calculateCompositeScore(b) - calculateCompositeScore(a)
  )[0];

  insightsContainer.innerHTML = `
    <article class="insight-card">
      <h3>Highest Salary</h3>
      <p>${topSalary.city}, ${topSalary.state}</p>
      <p style="font-size: 0.9rem; color: var(--accent);"><strong>$${topSalary.salary.toLocaleString()}</strong></p>
    </article>
    <article class="insight-card">
      <h3>Most Affordable</h3>
      <p>${topAffordable.city}, ${topAffordable.state}</p>
      <p style="font-size: 0.9rem; color: var(--accent-2);"><strong>${affordabilityPercent(topAffordable.salary, topAffordable.rent).toFixed(1)}%</strong> income-to-rent</p>
    </article>
    <article class="insight-card">
      <h3>Best Overall Fit</h3>
      <p>${bestFit.city}, ${bestFit.state}</p>
      <p style="font-size: 0.9rem; color: var(--accent-2);"><strong>${calculateCompositeScore(bestFit)}/100</strong> score</p>
    </article>
  `;
}

function renderMapMarkers() {
  markerLayer.clearLayers();
  const activeData = getActiveData();

  activeData.forEach(record => {
    const score = calculateCompositeScore(record);
    const color = getMarkerColor(score);
    const opacity = appState.highlightedCity === `${record.city}, ${record.state}` ? 1 : 0.7;

    const markerIcon = L.circleMarker([record.lat, record.lng], {
      radius: appState.highlightedCity === `${record.city}, ${record.state}` ? 12 : 8,
      fillColor: color,
      color: appState.highlightedCity === `${record.city}, ${record.state}` ? "#000" : color,
      weight: appState.highlightedCity === `${record.city}, ${record.state}` ? 3 : 2,
      opacity: 1,
      fillOpacity: opacity
    });

    markerIcon.bindPopup(popupHtml(record));
    markerIcon.addTo(markerLayer);

    // Click event to highlight in city list
    markerIcon.on('click', () => {
      appState.highlightedCity = `${record.city}, ${record.state}`;
      renderTopCities();
      renderMapMarkers();
    });
  });
}

function populateMajorSelect() {
  const majors = Object.keys(majorCareerData).sort();
  majors.forEach(major => {
    const option = document.createElement("option");
    option.value = major;
    option.textContent = major;
    majorSelect.appendChild(option);
  });
}

function render() {
  renderCareerPathButtons();
  renderTopCities();
  renderInsightCards();
  renderMapMarkers();
}

// Event listeners
majorSelect.addEventListener("change", (e) => {
  appState.selectedMajor = e.target.value;
  appState.selectedRole = null;
  appState.highlightedCity = null;
  render();
});

// Initial render
populateMajorSelect();
render();

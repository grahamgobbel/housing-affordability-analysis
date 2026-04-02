// Central app configuration lives here so future datasets can be added
// without touching the rendering logic.
//
// There are three parts to the setup:
// 1. majorCareerPaths -> controls which majors and career paths appear in the UI
// 2. majorFolderMap -> tells the app which folder each major uses inside /data
// 3. datasetFileMap -> maps each career path to a JSON file name inside that folder
//
// To add a new dataset later:
// - drop the JSON file into the correct major folder
// - add one filename entry in datasetFileMap for that major/career path
const APP_CONFIG = {
  majorCareerPaths: {
    Finance: [
      "Financial Analysis",
      "Credit & Lending",
      "Financial Advising",
      "Risk & Compliance"
    ],
    Accounting: [
      "Accounting / Audit",
      "Financial Analysis (Accounting Track)",
      "Risk / Compliance"
    ],
    Marketing: [
      "Market Research / Analytics",
      "Public Relations",
      "Advertising / Campaign Strategy",
      "Sales / Client Strategy"
    ],
    "Business Information Systems (BIS)": [
      "Business / Strategy",
      "Data / Analytics",
      "Cybersecurity",
      "Systems / IT"
    ],
    "Supply Chain": [
      "Logistics",
      "Procurement / Sourcing",
      "Operations / Planning",
      "Transportation / Distribution"
    ],
    Management: [
      "Business Operations",
      "Project Management",
      "Human Resources",
      "Sales / Business Development"
    ],
    "Innovation & Entrepreneurship": [
      "Startup / Business Operations",
      "Product / Innovation",
      "Growth / Marketing",
      "Sales / Business Development"
    ]
  },
  // Folder names stay filesystem-friendly even when UI labels use spaces or symbols.
  majorFolderMap: {
    Finance: "Finance",
    Accounting: "Accounting",
    Marketing: "Marketing",
    "Business Information Systems (BIS)": "BIS",
    "Supply Chain": "SupplyChain",
    Management: "Management",
    "Innovation & Entrepreneurship": "InnovationEntrepreneurship"
  },
  datasetFileMap: {
    Finance: {
      "Financial Analysis": "financial_analysis.json",
      "Credit & Lending": "credit_lending.json",
      "Financial Advising": "financial_advising.json",
      "Risk & Compliance": "risk_compliance.json"
    },
    Accounting: {
      "Accounting / Audit": "accounting_audit.json",
      "Financial Analysis (Accounting Track)": "financial_analysis_accounting_track.json",
      "Risk / Compliance": "risk_compliance.json"
    },
    Marketing: {
      "Market Research / Analytics": "market_research_analytics.json",
      "Public Relations": "public_relations.json",
      "Advertising / Campaign Strategy": "advertising_campaign_strategy.json",
      "Sales / Client Strategy": "sales_client_strategy.json"
    },
    "Business Information Systems (BIS)": {
      "Business / Strategy": "business_strategy.json",
      "Data / Analytics": "data_analytics.json",
      "Cybersecurity": "cybersecurity.json",
      "Systems / IT": "systems_it.json"
    },
    "Supply Chain": {
      "Logistics": "logistics.json",
      "Procurement / Sourcing": "procurement_sourcing.json",
      "Operations / Planning": "operations_planning.json",
      "Transportation / Distribution": "transportation_distribution.json"
    },
    Management: {
      "Business Operations": "business_operations.json",
      "Project Management": "project_management.json",
      "Human Resources": "human_resources.json",
      "Sales / Business Development": "sales_business_development.json"
    },
    "Innovation & Entrepreneurship": {
      "Startup / Business Operations": "startup_business_operations.json",
      "Product / Innovation": "product_innovation.json",
      "Growth / Marketing": "growth_marketing.json",
      "Sales / Business Development": "sales_business_development.json"
    }
  },
  copy: {
    selectMajor: "Select a major to see career paths.",
    selectCareerPath: "Choose a career path to load city results.",
    loading: "Loading dataset...",
    missingDataset: "This career path is ready for future data, but its JSON file has not been mapped yet.",
    noResults: "No city data is available for this selection.",
    loadError: "The selected dataset could not be loaded."
  },
  map: {
    defaultCenter: [39.5, -98.35],
    defaultZoom: 4,
    minZoom: 3,
    fitPadding: [30, 30],
    topCityLimit: 8
  }
};

// App state is grouped in one place so it is easy to see what drives UI updates.
const appState = {
  selectedMajor: "All",
  selectedCareerPath: null,
  highlightedMetro: null,
  records: [],
  datasetCache: {},
  markerByMetro: {},
  loading: false,
  error: ""
};

const dom = {
  majorSelect: document.getElementById("majorSelect"),
  insightCards: document.getElementById("insightCards"),
  careerPathButtons: document.getElementById("careerPathButtons"),
  topCities: document.getElementById("topCities")
};

const map = L.map("map", {
  scrollWheelZoom: true,
  minZoom: APP_CONFIG.map.minZoom
}).setView(APP_CONFIG.map.defaultCenter, APP_CONFIG.map.defaultZoom);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const markerLayer = L.layerGroup().addTo(map);

function formatCurrency(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits
  }).format(value);
}

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits
  }).format(value);
}

function getCareerPathsForMajor(major) {
  return APP_CONFIG.majorCareerPaths[major] || [];
}

function getMajorFolderName(major) {
  return APP_CONFIG.majorFolderMap[major] || null;
}

function getDatasetFileName(major, careerPath) {
  return APP_CONFIG.datasetFileMap[major]?.[careerPath] || null;
}

function getDatasetPath(major, careerPath) {
  if (!major || !careerPath) {
    return null;
  }

  const folderName = getMajorFolderName(major);
  const fileName = getDatasetFileName(major, careerPath);

  if (!folderName || !fileName) {
    return null;
  }

  // Example results:
  // ./data/BIS/data_analytics.json
  // ./data/Finance/financial_analysis.json
  return `./data/${folderName}/${fileName}`;
}

function buildEmptyState(message) {
  return `<p class="empty-state">${message}</p>`;
}

function hasMapCoordinates(record) {
  return Number.isFinite(record.lat) && Number.isFinite(record.lng);
}

// This is the only place that knows the incoming data shape.
// When you swap in real BLS/Census files later, updating this mapper
// should be enough to keep the UI layer unchanged.
function normalizeRecord(record) {
  return {
    career_path: record.career_path || "",
    bls_occupation: record.bls_occupation || "",
    metro: record.metro || "Unknown metro",
    employment: Number(record.employment) || 0,
    location_quotient: Number(record.location_quotient) || 0,
    annual_mean_wage: Number(record.annual_mean_wage) || 0,
    hourly_mean_wage: Number(record.hourly_mean_wage) || 0,
    score: Number(record.score) || 0,
    lat: Number(record.lat),
    lng: Number(record.lng)
  };
}

function resetDataState() {
  appState.records = [];
  appState.highlightedMetro = null;
  appState.loading = false;
  appState.error = "";
}

function handleMajorChange(nextMajor) {
  appState.selectedMajor = nextMajor;
  appState.selectedCareerPath = null;
  resetDataState();
  renderApp();
}

async function handleCareerPathSelection(nextCareerPath) {
  const isSameCareerPath = appState.selectedCareerPath === nextCareerPath;

  appState.selectedCareerPath = isSameCareerPath ? null : nextCareerPath;
  resetDataState();
  renderApp();

  if (!appState.selectedCareerPath) {
    return;
  }

  await loadCareerPathData(appState.selectedMajor, appState.selectedCareerPath);
}

async function loadCareerPathData(major, careerPath) {
  const datasetPath = getDatasetPath(major, careerPath);

  if (!datasetPath) {
    appState.error = APP_CONFIG.copy.missingDataset;
    renderDataViews();
    fitMapToRecords();
    return;
  }

  if (appState.datasetCache[datasetPath]) {
    appState.records = appState.datasetCache[datasetPath];
    renderDataViews();
    fitMapToRecords();
    return;
  }

  appState.loading = true;
  appState.error = "";
  renderDataViews();

  try {
    const response = await fetch(datasetPath);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const json = await response.json();
    const normalizedRecords = Array.isArray(json) ? json.map(normalizeRecord) : [];

    appState.datasetCache[datasetPath] = normalizedRecords;
    appState.records = normalizedRecords;
  } catch (error) {
    console.error("Failed to load dataset:", error);
    appState.records = [];
    appState.error = APP_CONFIG.copy.loadError;
  } finally {
    appState.loading = false;
    renderDataViews();
    fitMapToRecords();
  }
}

function getActiveRecords() {
  if (!appState.selectedCareerPath) {
    return [];
  }

  return appState.records.filter((record) => record.career_path === appState.selectedCareerPath);
}

function getSortedRecords(records, field) {
  return [...records].sort((a, b) => b[field] - a[field]);
}

// Top cities are ranked by the dataset's precomputed score.
// That keeps the UI simple: the data file decides the overall fit,
// and the app just sorts highest to lowest.
function getTopMetros(records, limit = APP_CONFIG.map.topCityLimit) {
  return getSortedRecords(records, "score").slice(0, limit);
}

// Quick Snapshot calculations:
// 1. Highest Salary -> largest annual_mean_wage
// 2. Highest Location Quotient -> largest location_quotient
// 3. Best Overall Score -> largest score
function calculateInsights(records) {
  return {
    highestSalary: getSortedRecords(records, "annual_mean_wage")[0],
    strongestConcentration: getSortedRecords(records, "location_quotient")[0],
    bestOverallFit: getSortedRecords(records, "score")[0]
  };
}

function getViewStateMessage() {
  if (appState.selectedMajor === "All") {
    return APP_CONFIG.copy.selectMajor;
  }

  if (!appState.selectedCareerPath) {
    return APP_CONFIG.copy.selectCareerPath;
  }

  if (appState.loading) {
    return APP_CONFIG.copy.loading;
  }

  if (appState.error) {
    return appState.error;
  }

  return "";
}

function getMarkerColor(score) {
  if (score >= 0.9) return "#247ba0";
  if (score >= 0.8) return "#2ab7ca";
  if (score >= 0.7) return "#52b788";
  return "#ffb703";
}

function buildPopupHtml(record) {
  return `
    <div class="popup-content">
      <h3 class="popup-title">${record.metro}</h3>
      <!-- Keep the popup focused on the four fields requested for the map. -->
      <p class="popup-line"><strong>Annual Mean Wage:</strong> ${formatCurrency(record.annual_mean_wage)}</p>
      <p class="popup-line"><strong>Location Quotient:</strong> ${record.location_quotient.toFixed(2)}</p>
      <p class="popup-line"><strong>Overall Score:</strong> ${record.score.toFixed(2)}</p>
    </div>
  `;
}

function createCareerPathButtonMarkup(careerPath) {
  const isActive = appState.selectedCareerPath === careerPath;

  return `
    <button
      class="career-path-button ${isActive ? "active" : ""}"
      data-career-path="${careerPath}"
      type="button"
    >
      ${careerPath}
    </button>
  `;
}

function createCityCardMarkup(record) {
  const isHighlighted = appState.highlightedMetro === record.metro;

  return `
    <div class="city-item ${isHighlighted ? "highlighted" : ""}" data-metro="${record.metro}">
      <div class="city-item-title">${record.metro}</div>
      <div class="city-item-meta">
        <div class="city-item-stat">
          <span class="city-item-stat-label">Annual Wage:</span>
          <span class="city-item-stat-value">${formatCurrency(record.annual_mean_wage)}</span>
        </div>
        <div class="city-item-stat">
          <span class="city-item-stat-label">Hourly Wage:</span>
          <span class="city-item-stat-value">${formatCurrency(record.hourly_mean_wage, 2)}</span>
        </div>
        <div class="city-item-stat">
          <span class="city-item-stat-label">Employment:</span>
          <span class="city-item-stat-value">${formatNumber(record.employment)}</span>
        </div>
        <div class="city-item-stat">
          <span class="city-item-stat-label">LQ:</span>
          <span class="city-item-stat-value">${record.location_quotient.toFixed(2)}</span>
        </div>
      </div>
      <div class="city-item-score">
        <span>Overall Fit</span>
        <span class="score-value">${record.score.toFixed(2)}</span>
      </div>
    </div>
  `;
}

function createInsightCardMarkup(title, metro, emphasis, supportingText, accentClass = "") {
  return `
    <article class="insight-card">
      <h3>${title}</h3>
      <p>${metro}</p>
      <p class="insight-detail ${accentClass}"><strong>${emphasis}</strong></p>
      <p>${supportingText}</p>
    </article>
  `;
}

function setHighlightedMetro(metro, options = {}) {
  const shouldForce = options.force === true;
  const isSameMetro = appState.highlightedMetro === metro;

  appState.highlightedMetro = shouldForce || !isSameMetro ? metro : null;

  renderTopCities();
  renderMapMarkers();

  if (!appState.highlightedMetro) {
    return;
  }

  const marker = appState.markerByMetro[appState.highlightedMetro];

  if (!marker) {
    return;
  }

  if (options.panToMarker !== false) {
    map.panTo(marker.getLatLng());
  }

  if (options.openPopup !== false) {
    marker.openPopup();
  }
}

function renderCareerPathButtons() {
  if (appState.selectedMajor === "All") {
    dom.careerPathButtons.innerHTML = buildEmptyState(APP_CONFIG.copy.selectMajor);
    return;
  }

  const careerPaths = getCareerPathsForMajor(appState.selectedMajor);
  dom.careerPathButtons.innerHTML = careerPaths.map(createCareerPathButtonMarkup).join("");

  dom.careerPathButtons.querySelectorAll("[data-career-path]").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const nextCareerPath = event.currentTarget.dataset.careerPath;
      await handleCareerPathSelection(nextCareerPath);
    });
  });
}

function renderTopCities() {
  const viewStateMessage = getViewStateMessage();

  if (viewStateMessage) {
    dom.topCities.innerHTML = buildEmptyState(viewStateMessage);
    return;
  }

  const activeRecords = getActiveRecords();

  if (!activeRecords.length) {
    dom.topCities.innerHTML = buildEmptyState(APP_CONFIG.copy.noResults);
    return;
  }

  dom.topCities.innerHTML = getTopMetros(activeRecords).map(createCityCardMarkup).join("");

  dom.topCities.querySelectorAll("[data-metro]").forEach((item) => {
    item.addEventListener("click", () => {
      setHighlightedMetro(item.dataset.metro, {
        panToMarker: true,
        openPopup: true
      });
    });
  });
}

function renderInsightCards() {
  const viewStateMessage = getViewStateMessage();

  if (viewStateMessage) {
    dom.insightCards.innerHTML = buildEmptyState(viewStateMessage);
    return;
  }

  const activeRecords = getActiveRecords();

  if (!activeRecords.length) {
    dom.insightCards.innerHTML = buildEmptyState(APP_CONFIG.copy.noResults);
    return;
  }

  const insights = calculateInsights(activeRecords);

  dom.insightCards.innerHTML = [
    createInsightCardMarkup(
      "Highest Salary",
      insights.highestSalary.metro,
      formatCurrency(insights.highestSalary.annual_mean_wage),
      `${insights.highestSalary.bls_occupation} | ${formatNumber(insights.highestSalary.employment)} employed`
    ),
    createInsightCardMarkup(
      "Highest Location Quotient",
      insights.strongestConcentration.metro,
      `${insights.strongestConcentration.location_quotient.toFixed(2)} location quotient`,
      `${formatCurrency(insights.strongestConcentration.annual_mean_wage)} annual mean wage`,
      "accent-alt"
    ),
    createInsightCardMarkup(
      "Best Overall Score",
      insights.bestOverallFit.metro,
      `${insights.bestOverallFit.score.toFixed(2)} score`,
      `${formatCurrency(insights.bestOverallFit.annual_mean_wage)} annual mean wage | ${formatNumber(insights.bestOverallFit.employment)} employed`,
      "accent-alt"
    )
  ].join("");
}

function renderMapMarkers() {
  markerLayer.clearLayers();
  appState.markerByMetro = {};

  getActiveRecords()
    .filter(hasMapCoordinates)
    .forEach((record) => {
      const isHighlighted = appState.highlightedMetro === record.metro;
      const markerColor = getMarkerColor(record.score);
      const marker = L.circleMarker([record.lat, record.lng], {
        radius: isHighlighted ? 12 : 8,
        fillColor: markerColor,
        color: isHighlighted ? "#1f2a44" : markerColor,
        weight: isHighlighted ? 3 : 2,
        opacity: 1,
        fillOpacity: isHighlighted ? 1 : 0.75
      });

      marker.bindPopup(buildPopupHtml(record));
      marker.addTo(markerLayer);
      appState.markerByMetro[record.metro] = marker;

      marker.on("click", () => {
        setHighlightedMetro(record.metro, {
          force: true,
          panToMarker: false,
          openPopup: false
        });
      });
    });
}

function fitMapToRecords() {
  const recordsWithCoordinates = getActiveRecords().filter(hasMapCoordinates);

  if (!recordsWithCoordinates.length) {
    map.setView(APP_CONFIG.map.defaultCenter, APP_CONFIG.map.defaultZoom);
    return;
  }

  const bounds = L.latLngBounds(recordsWithCoordinates.map((record) => [record.lat, record.lng]));
  map.fitBounds(bounds, { padding: APP_CONFIG.map.fitPadding });
}

function renderDataViews() {
  renderInsightCards();
  renderTopCities();
  renderMapMarkers();
}

function renderApp() {
  renderCareerPathButtons();
  renderDataViews();
}

function populateMajorSelect() {
  Object.keys(APP_CONFIG.majorCareerPaths)
    .sort()
    .forEach((major) => {
      const option = document.createElement("option");
      option.value = major;
      option.textContent = major;
      dom.majorSelect.appendChild(option);
    });
}

function initializeEventListeners() {
  dom.majorSelect.addEventListener("change", (event) => {
    handleMajorChange(event.target.value);
  });
}

function initializeApp() {
  populateMajorSelect();
  initializeEventListeners();
  renderApp();
}

initializeApp();


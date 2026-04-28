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
  allRecords: [],
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
function normalizeRecord(record, major, careerPath) {
  return {
    source_major: major,
    source_career_path: careerPath,
    career_path: record.career_path || "",
    bls_occupation: record.bls_occupation || "",
    metro: record.metro || "Unknown metro",
    employment: Number(record.employment) || 0,
    location_quotient: Number(record.location_quotient) || 0,
    annual_mean_wage: Number(record.annual_mean_wage) || 0,
    hourly_mean_wage: Number(record.hourly_mean_wage) || 0,
    rpp: Number(record.rpp) || 100.0,
    adjusted_annual_mean_wage: Number(record.adjusted_annual_mean_wage) || 0,
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

function getDatasetSelections(major) {
  const fileMapForMajor = APP_CONFIG.datasetFileMap[major] || {};

  return Object.keys(fileMapForMajor).map((careerPath) => ({
    major,
    careerPath
  }));
}

function getAllDatasetSelections() {
  return Object.keys(APP_CONFIG.datasetFileMap).flatMap(getDatasetSelections);
}

async function fetchDatasetRecords(major, careerPath) {
  const datasetPath = getDatasetPath(major, careerPath);

  if (!datasetPath) {
    return [];
  }

  if (appState.datasetCache[datasetPath]) {
    return appState.datasetCache[datasetPath];
  }

  const response = await fetch(datasetPath);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const json = await response.json();
  const normalizedRecords = Array.isArray(json)
    ? json.map((record) => normalizeRecord(record, major, careerPath))
    : [];

  appState.datasetCache[datasetPath] = normalizedRecords;
  return normalizedRecords;
}

// Preload every mapped dataset once so the map can show locations across the
// full project instead of only the currently selected career path.
async function preloadAllDatasets() {
  try {
    const datasetGroups = await Promise.all(
      getAllDatasetSelections().map(({ major, careerPath }) => fetchDatasetRecords(major, careerPath))
    );

    appState.allRecords = datasetGroups.flat();
    renderMapMarkers();
    fitMapToRecords();
  } catch (error) {
    console.error("Failed to preload map datasets:", error);
  }
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
    appState.records = await fetchDatasetRecords(major, careerPath);
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

// The side-panel views stay focused on the current career path, but the map
// can use a wider slice of the data:
// - no markers until a major is selected
// - all career paths for one major after major selection
// - one career path after career path selection
function getMapRecords() {
  if (appState.selectedCareerPath) {
    return getActiveRecords();
  }

  if (appState.selectedMajor !== "All") {
    return appState.allRecords.filter((record) => record.source_major === appState.selectedMajor);
  }

  return [];
}

function getSortedRecords(records, field) {
  return [...records].sort((a, b) => b[field] - a[field]);
}

// Top cities are ranked by adjusted annual mean wage (cost-of-living adjusted).
// That keeps the UI simple: higher adjusted salary = better financial opportunity,
// and the app just sorts highest to lowest.
function getTopMetros(records, limit = APP_CONFIG.map.topCityLimit) {
  return getSortedRecords(records, "adjusted_annual_mean_wage").slice(0, limit);
}

// Quick Snapshot calculations:
// 1. Highest Salary -> largest annual_mean_wage (raw, unadjusted)
// 2. Highest Location Quotient -> largest location_quotient
// 3. Best Overall Fit -> largest adjusted_annual_mean_wage (cost-of-living adjusted)
function calculateInsights(records) {
  return {
    highestSalary: getSortedRecords(records, "annual_mean_wage")[0],
    strongestConcentration: getSortedRecords(records, "location_quotient")[0],
    bestOverallFit: getSortedRecords(records, "adjusted_annual_mean_wage")[0]
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

function getMarkerColor(adjustedWage, allWages) {
  // Compute percentile rank of this wage within all wages
  const sortedWages = [...allWages].sort((a, b) => a - b);
  const percentile = sortedWages.filter(w => w <= adjustedWage).length / sortedWages.length;
  
  // Color by percentile: top performers get darker purple
  if (percentile >= 0.9) return "#4d1979";  // Top 10%
  if (percentile >= 0.8) return "#6d2fa1";  // Top 20%
  if (percentile >= 0.7) return "#8f5bc2";  // Top 30%
  return "#b999db";
}

function createStarMarkerIcon(fillColor, isHighlighted) {
  const size = isHighlighted ? 28 : 24;
  const strokeColor = isHighlighted ? "#24153d" : "#4d1979";
  const strokeWidth = isHighlighted ? 2.5 : 2;

  return L.divIcon({
    className: "star-marker-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 1.8l3.12 6.31 6.96 1.01-5.04 4.91 1.19 6.93L12 17.67 5.77 20.96l1.19-6.93L1.92 9.12l6.96-1.01L12 1.8z"
          fill="${fillColor}"
          stroke="${strokeColor}"
          stroke-width="${strokeWidth}"
          stroke-linejoin="round"
        />
      </svg>
    `
  });
}

function createRecordKey(record) {
  return [
    record.bls_occupation,
    record.metro,
    record.adjusted_annual_mean_wage,
    record.lat,
    record.lng
  ].join("::");
}

// Find the highest-paying location (by adjusted wage) for each occupation
// in the current map view so those markers can stand out visually.
function getTopOccupationRecordKeys(records) {
  const bestRecordByOccupation = {};

  records.forEach((record) => {
    const currentBest = bestRecordByOccupation[record.bls_occupation];

    if (!currentBest || record.adjusted_annual_mean_wage > currentBest.adjusted_annual_mean_wage) {
      bestRecordByOccupation[record.bls_occupation] = record;
    }
  });

  return new Set(
    Object.values(bestRecordByOccupation).map(createRecordKey)
  );
}

function buildPopupHtml(record) {
  const topOccupationBadge = record.isTopOccupationLocation
    ? `<p class="popup-line"><strong>Map Highlight:</strong> Highest adjusted wage for ${record.bls_occupation}</p>`
    : "";

  return `
    <div class="popup-content">
      <h3 class="popup-title">${record.metro}</h3>
      <!-- This popup is the on-map blurb for each city marker. -->
      ${topOccupationBadge}
      <p class="popup-line"><strong>Occupation:</strong> ${record.bls_occupation}</p>
      <p class="popup-line"><strong>Annual Mean Wage:</strong> ${formatCurrency(record.annual_mean_wage)}</p>
      <p class="popup-line"><strong>Adjusted Wage (RPP):</strong> ${formatCurrency(record.adjusted_annual_mean_wage)} <span style="font-size: 0.85em; color: #666;">(RPP: ${record.rpp})</span></p>
      <p class="popup-line"><strong>Employment:</strong> ${formatNumber(record.employment)}</p>
      <p class="popup-line"><strong>Location Quotient:</strong> ${record.location_quotient.toFixed(2)}</p>
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
        <span>Adjusted Wage</span>
        <span class="score-value">${formatCurrency(record.adjusted_annual_mean_wage)}</span>
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
      "Best Adjusted Wage",
      insights.bestOverallFit.metro,
      `${formatCurrency(insights.bestOverallFit.adjusted_annual_mean_wage)} adjusted wage`,
      `${formatCurrency(insights.bestOverallFit.annual_mean_wage)} annual mean wage | ${formatNumber(insights.bestOverallFit.employment)} employed`,
      "accent-alt"
    )
  ].join("");
}

function renderMapMarkers() {
  markerLayer.clearLayers();
  appState.markerByMetro = {};

  const mapRecords = getMapRecords().filter(hasMapCoordinates);
  const topOccupationRecordKeys = getTopOccupationRecordKeys(mapRecords);
  const allAdjustedWages = mapRecords.map(r => r.adjusted_annual_mean_wage);

  mapRecords.forEach((record) => {
      const isHighlighted = appState.highlightedMetro === record.metro;
      const isTopOccupationLocation = topOccupationRecordKeys.has(createRecordKey(record));
      const markerColor = getMarkerColor(record.adjusted_annual_mean_wage, allAdjustedWages);

      // Give the top-scoring location for each occupation a brighter purple
      // marker so it stands out while staying inside the TCU-inspired palette.
      const fillColor = isTopOccupationLocation ? "#7c3aed" : markerColor;
      const strokeColor = isHighlighted
        ? "#1f2a44"
        : isTopOccupationLocation
          ? "#4d1979"
          : markerColor;
      const radius = isHighlighted
        ? (isTopOccupationLocation ? 15 : 12)
        : (isTopOccupationLocation ? 11 : 8);
      const markerRecord = {
        ...record,
        isTopOccupationLocation
      };

      const marker = isTopOccupationLocation
        ? L.marker([record.lat, record.lng], {
            icon: createStarMarkerIcon(fillColor, isHighlighted)
          })
        : L.circleMarker([record.lat, record.lng], {
            radius,
            fillColor,
            color: strokeColor,
            weight: isTopOccupationLocation ? 4 : (isHighlighted ? 3 : 2),
            opacity: 1,
            fillOpacity: isHighlighted || isTopOccupationLocation ? 1 : 0.75
          });

      // Keep the popup anchored to the marker so clicks feel like they happen on the map.
      marker.bindPopup(buildPopupHtml(markerRecord), {
        autoPan: true,
        keepInView: true
      });
      marker.addTo(markerLayer);
      appState.markerByMetro[record.metro] = marker;

      marker.on("click", () => {
        // Re-open the popup after re-rendering so map clicks have a visible result.
        setHighlightedMetro(record.metro, {
          force: true,
          panToMarker: false,
          openPopup: true
        });
      });
    });
}

function fitMapToRecords() {
  const recordsWithCoordinates = getMapRecords().filter(hasMapCoordinates);

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
  preloadAllDatasets();
}

initializeApp();


// Planet data
const planets = [
  {
    id: 1,
    name: "Kepler-452b",
    price: "$2.5 Billion",
    description:
      "Earth-like planet in the habitable zone. Perfect for human colonization with stunning ocean views.",
    emoji: "🌍",
    diameter: "13,000 km",
    distance: "1,400 light years",
    temperature: "22°C average",
    atmosphere: "78% Nitrogen, 21% Oxygen",
    gravity: "1.2x Earth",
    moons: "2 natural satellites",
  },
  {
    id: 2,
    name: "HD 40307g",
    price: "$1.8 Billion",
    description:
      "Super-Earth with rich mineral deposits and three spectacular rings around its equator.",
    emoji: "🪐",
    diameter: "18,500 km",
    distance: "42 light years",
    temperature: "-5°C average",
    atmosphere: "Dense, oxygen-rich",
    gravity: "2.1x Earth",
    moons: "7 natural satellites",
  },
  {
    id: 3,
    name: "Gliese 667Cc",
    price: "$3.2 Billion",
    description:
      "Tropical paradise world with two suns and endless beaches of crystalline shores.",
    emoji: "🏖️",
    diameter: "14,800 km",
    distance: "23 light years",
    temperature: "28°C average",
    atmosphere: "Oxygen-rich with water vapor",
    gravity: "1.5x Earth",
    moons: "1 large moon",
  },
  {
    id: 4,
    name: "Wolf 1061c",
    price: "$900 Million",
    description:
      "Rocky planet with vast canyon systems and potential underground water reserves.",
    emoji: "🏔️",
    diameter: "11,200 km",
    distance: "14 light years",
    temperature: "-12°C average",
    atmosphere: "Thin, mostly CO2",
    gravity: "0.8x Earth",
    moons: "None",
  },
  {
    id: 5,
    name: "Proxima Centauri b",
    price: "$4.1 Billion",
    description:
      "Our closest exoplanet neighbor with aurora displays visible from space.",
    emoji: "🌌",
    diameter: "12,800 km",
    distance: "4.2 light years",
    temperature: "-39°C average",
    atmosphere: "Unknown composition",
    gravity: "1.1x Earth",
    moons: "Unknown",
  },
  {
    id: 6,
    name: "TRAPPIST-1e",
    price: "$2.9 Billion",
    description:
      "Part of a seven-planet system with potential for complex weather patterns.",
    emoji: "⛈️",
    diameter: "10,400 km",
    distance: "40 light years",
    temperature: "0°C average",
    atmosphere: "Potentially habitable",
    gravity: "0.9x Earth",
    moons: "None detected",
  },
];

// Load planets into grid
function loadPlanets() {
  const grid = document.getElementById("planetGrid");
  grid.innerHTML = "";

  planets.forEach((planet) => {
    const planetCard = document.createElement("div");
    planetCard.className = "planet-card";
    planetCard.innerHTML = `
                    <div class="planet-image">${planet.emoji}</div>
                    <div class="planet-name">${planet.name}</div>
                    <div class="planet-price">${planet.price}</div>
                    <div class="planet-description">${planet.description}</div>
                    <button class="buy-button" onclick="purchasePlanet('${planet.name}', '${planet.price}')">
                        Buy Now 🚀
                    </button>
                `;
    grid.appendChild(planetCard);
  });
}

// Load planet details
function loadPlanetDetails() {
  const container = document.getElementById("planetDetailsContainer");
  container.innerHTML = "";

  planets.forEach((planet) => {
    const detailCard = document.createElement("div");
    detailCard.className = "planet-details";
    detailCard.innerHTML = `
                    <h3>${planet.emoji} ${planet.name}</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <span>Diameter:</span>
                            <span>${planet.diameter}</span>
                        </div>
                        <div class="detail-item">
                            <span>Distance from Earth:</span>
                            <span>${planet.distance}</span>
                        </div>
                        <div class="detail-item">
                            <span>Average Temperature:</span>
                            <span>${planet.temperature}</span>
                        </div>
                        <div class="detail-item">
                            <span>Atmosphere:</span>
                            <span>${planet.atmosphere}</span>
                        </div>
                        <div class="detail-item">
                            <span>Gravity:</span>
                            <span>${planet.gravity}</span>
                        </div>
                        <div class="detail-item">
                            <span>Moons:</span>
                            <span>${planet.moons}</span>
                        </div>
                    </div>
                `;
    container.appendChild(detailCard);
  });
}

// Show section
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.remove("active"));

  // Show selected section
  document.getElementById(sectionName).classList.add("active");

  // Load content if needed
  if (sectionName === "planets") {
    loadPlanets();
  } else if (sectionName === "details") {
    loadPlanetDetails();
  }
}

// Purchase planet
function purchasePlanet(planetName, planetPrice) {
  document.getElementById("modalPlanetName").textContent = planetName;
  document.getElementById("modalPlanetPrice").textContent = planetPrice;
  document.getElementById("purchaseModal").style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("purchaseModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("purchaseModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  loadPlanets();
  loadPlanetDetails();
});

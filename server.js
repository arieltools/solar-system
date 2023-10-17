const express = require('express');
const app = express();

// Planet data (distances are in kilometers, other data is placeholders)
const planets = [
  { name: 'Mercury', distance: 91700000, radius: 2439.7, orbitalPeriod: 88, gravity: 3.7 },
  { name: 'Venus', distance: 41400000, radius: 6051.8, orbitalPeriod: 225, gravity: 8.87 },
  { name: 'Earth', distance: 149600000, radius: 6371, orbitalPeriod: 365, gravity: 9.81 },
  // TODO: Add more planet data here
];

// Calculate distances between planets
function calculateDistance(planet1, planet2) {
  const distance = Math.abs(planet1.distance - planet2.distance);
  return distance;
}

// Calculate gravitational force between two planets
function calculateGravitationalForce(planet1, planet2) {
  const G = 6.67e-11; // Gravitational constant (m^3/kg/s^2)
  const r = calculateDistance(planet1, planet2) * 1000; // Convert to meters
  const force = (G * planet1.gravity * planet2.gravity) / (r * r);
  return force;
}

// Calculate travel time for a spacecraft traveling at a certain speed
function calculateTravelTime(planet1, planet2, speed) {
  const distance = calculateDistance(planet1, planet2) * 1000; // Convert to meters
  const time = distance / (speed * 1000); // Convert speed to m/s
  return time;
}

// Define API routes
app.get('/planets', (req, res) => {
  res.json(planets.map((planet) => planet.name));
});

app.get('/distance/:planet1/:planet2', (req, res) => {
  const planet1Name = req.params.planet1;
  const planet2Name = req.params.planet2;
  const planet1 = planets.find((planet) => planet.name === planet1Name);
  const planet2 = planets.find((planet) => planet.name === planet2Name);

  if (!planet1 || !planet2) {
    res.status(404).json({ error: 'Planet not found' });
    return;
  }

  const distance = calculateDistance(planet1, planet2);
  res.json({
    planet1: planet1Name,
    planet2: planet2Name,
    distance: distance,
  });
});

app.get('/gravitational-force/:planet1/:planet2', (req, res) => {
  const planet1Name = req.params.planet1;
  const planet2Name = req.params.planet2;
  const planet1 = planets.find((planet) => planet.name === planet1Name);
  const planet2 = planets.find((planet) => planet.name === planet2Name);

  if (!planet1 || !planet2) {
    res.status(404).json({ error: 'Planet not found' });
    return;
  }

  const force = calculateGravitationalForce(planet1, planet2);
  res.json({
    planet1: planet1Name,
    planet2: planet2Name,
    gravitationalForce: force,
  });
});

app.get('/travel-time/:planet1/:planet2/:speed', (req, res) => {
  const planet1Name = req.params.planet1;
  const planet2Name = req.params.planet2;
  const speed = parseFloat(req.params.speed);
  const planet1 = planets.find((planet) => planet.name === planet1Name);
  const planet2 = planets.find((planet) => planet.name === planet2Name);

  if (!planet1 || !planet2 || isNaN(speed)) {
    res.status(404).json({ error: 'Invalid input' });
    return;
  }

  const time = calculateTravelTime(planet1, planet2, speed);
  res.json({
    planet1: planet1Name,
    planet2: planet2Name,
    speed: `${speed} km/s`,
    travelTime: `${time} seconds`,
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import React, { useState, useEffect } from 'react';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [planet1, setPlanet1] = useState('');
  const [planet2, setPlanet2] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    // Fetch the list of planets
    fetch('/planets')
      .then((response) => response.json())
      .then((data) => setPlanets(data));
  }, []);

  const handleCalculateDistance = () => {
    // Fetch the distance between selected planets
    fetch(`/distance/${planet1}/${planet2}`)
      .then((response) => response.json())
      .then((data) => setDistance(data.distance));
  };

  return (
    <div>
      <h1>Planetary Distance Calculator</h1>

      <div>
        <h2>Select Planets:</h2>
        <label>Planet 1:
          <select value={planet1} onChange={(e) => setPlanet1(e.target.value)}>
            <option value="">Select a planet</option>
            {planets.map((planet) => (
              <option key={planet} value={planet}>{planet}</option>
            ))}
          </select>
        </label>
        <label>Planet 2:
          <select value={planet2} onChange={(e) => setPlanet2(e.target.value)}>
            <option value="">Select a planet</option>
            {planets.map((planet) => (
              <option key={planet} value={planet}>{planet}</option>
            ))}
          </select>
        </label>
        <button onClick={handleCalculateDistance}>Calculate Distance</button>
      </div>

      {distance && (
        <div>
          <h2>Result:</h2>
          <p>Distance between {planet1} and {planet2}: {distance} kilometers</p>
        </div>
      )}
    </div>
  );
};

export default App;

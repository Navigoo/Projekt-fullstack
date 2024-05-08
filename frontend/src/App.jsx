import { useState, useEffect } from 'react';

function App() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch('/cities')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Cities and populations</h1>
      <ul>
        {cities.map(city => (
          <li key={city.id}>
            {city.name}: {city.population}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

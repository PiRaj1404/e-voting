import React, { useState } from "react";

const CitySelection = ({ cities, onCityChange }) => {
  const [selectedCities, setSelectedCities] = useState([]);

  const handleCheckboxChange = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter((selectedCity) => selectedCity !== city)
      : [...selectedCities, city];

    setSelectedCities(updatedCities);
    onCityChange(updatedCities);
  };

  return (
    <div>
      <h4>Select Cities:</h4>
      {cities.map((city) => (
        <div key={city}>
          <label>
            <input
              type="checkbox"
              checked={selectedCities.includes(city)}
              onChange={() => handleCheckboxChange(city)}
            />
            {city}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CitySelection;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import axios from "axios";
import CitySelection from "./citySelection"; // Adjust the import path

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]); // Default selection

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get-result/${selectedCities.join(",")}`
        );

        const data = response.data.data;
        setResults(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [selectedCities]);

  const handleCityChange = (cities) => {
    setSelectedCities(cities);
  };

  // Common options for all charts
  const commonOptions = {
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        
        const candidateName = params.data.candidate; 
        const partyName = params.data.name;
        const votes = params.data.value;
  
        // Customizing the tooltip content
        return `${candidateName} (${partyName}): ${votes} votes`;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
    },
    toolbox: {
      show: false,
      orient: "horizontal",
      left: "center",
      top: "bottom",
      itemSize: 15,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        saveAsImage: { show: true },
      },
    },
  };

  return (
    <div className="container mt-5">
      <h2>Election Results</h2>
      <CitySelection
        cities={["Malwa", "Meerut", "CityC", "CityD"]}
        onCityChange={handleCityChange}
      />
      <div className="row">
        {selectedCities.map((city) => (
          <div key={city} className="col-md-6">
            <h3>{`${city} Results`}</h3>
            <ReactECharts
              option={{
                ...commonOptions,
                title: {
                  text: `Region ${city}`,
                  left: "center",
                },
                series: [
                  {
                    top: 40,
                    bottom: 20,
                    type: "pie",
                    radius: "85%",
                    center: ["50%", "50%"],
                    data: results
                    .filter((result) => result.region === city)
                    .map((result) => result.candidates.map((candidate) => ({
                      value: candidate.votes,
                      candidate: candidate.name,
                      name: candidate.party,
                    })))
                    .flat(),
                    emphasis: {
                      itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                      },
                    },
                  },
                ],
              }}
            />
          </div>
        ))}
      </div>
      <Link to="/" className="btn btn-danger">
        Logout
      </Link>
    </div>
  );
};

export default ResultsPage;

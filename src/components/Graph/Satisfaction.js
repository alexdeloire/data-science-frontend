import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import chroma from 'chroma-js';


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
const Satisfaction = ({selectedYear, onDataLoaded}) => {
  
  const [data, setData] = useState(null);
  

  useEffect(() => {
   const fetchData = async () => {
       let year=selectedYear
       if(selectedYear === 2023) {
        year = 2022

       }
        const apiUrl = `${BASE_URL}/sentiment/?year=${year}`;
        const response = await axios.get(apiUrl)
    
        const result = response.data;
        console.log(result);

        if (result && result.res) {
          const labels = Object.keys(result.res);
          const satisfactionLevels = Object.keys(result.res[labels[0]]);

          const colorScale = chroma.scale(['red', 'violet']).colors(satisfactionLevels.length);

          const datasets = satisfactionLevels.map((level, index) => ({
            label: `Note ${level}`,
            data: labels.map((label) => result.res[label][level] || 0),
            backgroundColor: colorScale[index],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }));

          const chartData = {
            labels: labels,
            datasets: datasets,
          };

          setData(chartData);
          onDataLoaded()
        } else {
          console.error('Les données de satisfaction sont incorrectes ou non définies.');
        }
      
     }

     fetchData()
  }, [selectedYear]);

    // Vérifiez si les données ont été chargées
    if (!data) {
      return <div>Loading data...</div>;
    }

  return (
    <div>
      <h3>Satisfaction vis à vis de la formation par filière</h3>
      {data && data.datasets && <Bar data={data} options={{ scales: { x: { stacked: true }, y: { stacked: true } } }} />}
    </div>
  );
};

export default Satisfaction

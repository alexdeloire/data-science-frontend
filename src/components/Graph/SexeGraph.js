import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const SexeGraph = ({year,onDataLoaded}) => {

 const [data, setData] = useState(null);
 useEffect(() => {
  const fetchData = async () => {
      try {
          const response = await axios.get(`${BASE_URL}/sexe/?year=${year}`);
          console.log(response.data.sexe);
          setData(response.data.sexe);
          onDataLoaded()
          
          // Mettez à jour le state ou effectuez d'autres opérations avec les données
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  fetchData();
}, [year]);

  // Vérifiez si les données ont été chargées
  if (!data) {
    return <div>Loading data...</div>;
  }


const renderPieCharts = () => {
 if (!data) {
   return null;
 }

 const formations = Object.keys(data);

 const pieCharts = formations.map((formation) => {
   const sexes = Object.keys(data[formation]).filter((key) => key !== '[[Prototype]]');
   const counts = sexes.map((sex) => data[formation][sex]);

   const pieChartData = {
     labels: sexes,
     datasets: [
       {
         data: counts,
         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can customize the colors as needed
         hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
       },
     ],
   };

   return (
     <div key={formation} style={{ width:"15%",margin: '20px'}}>
       <div > 
        <Pie data={pieChartData}/>
        <h3>{formation}</h3>
       </div>
     </div>
   );
 });

 return pieCharts;
};



const generateChartData = () => {
 if (!data) return {};

 const formations = Object.keys(data);
 const datasets = Object.keys(data[formations[0]]).map((gender) => ({
   label: gender,
   data: formations.map((formation) => data[formation][gender] || 0),
 }));

 const labels = formations.map((formation) => {
  const match = formation.match(/\((.*?)\)/);
  return match ? match[1] : formation;
});

 return {
   labels: labels,
   datasets: datasets,
 };
};

const chartData = generateChartData();



return(
 <div>
  <h3>Répartition des sexes des répondants pour chaque filière</h3>

  {chartData.labels && (
   <div style={{ width:"100%" }}>
        <Bar
          data={chartData}
          options={{
            scales: {
              x: { stacked: true },
              y: { stacked: true },
            },
          }}
        />
   </div>
      )}
 </div>
)
}

export default SexeGraph
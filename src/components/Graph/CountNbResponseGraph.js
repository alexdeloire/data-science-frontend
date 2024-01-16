import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const CountNbResponseGraph = ({ year, question }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/count/?year=${year}&question=${question}`);
        setData(response.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [year, question]);

  // Vérifiez si les données ont été chargées
  if (!data) {
    return <div>Loading...</div>;
  }

  // Préparez les données pour le graphique Bar
  const barData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'True',
        data: Object.values(data).map((count) => count.true || 0),
        backgroundColor: '#36A2EB', // Couleur pour true
      },
      {
        label: 'False',
        data: Object.values(data).map((count) => count.false || 0),
        backgroundColor: '#FF6384', // Couleur pour false
      },
    ],
  };

  const barOptions = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <div>
      <h3>Question : {question}</h3>
      <Bar data={barData} options={barOptions} />
    </div>
  );
};

export default CountNbResponseGraph;

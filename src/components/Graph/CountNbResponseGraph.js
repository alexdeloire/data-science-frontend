import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const CountNbResponseGraph = ({ year, question, onDataLoaded }) => {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/count/?year=${year}&question=${question}`);
        setData(response.data.count);
        onDataLoaded()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [year, question]);

  // Vérifiez si les données ont été chargées
  if (!data) {
    return <div>Loading data...</div>;
  }

  // Préparez les données pour le graphique Bar
  let labels = Object.keys(data);
  labels = labels.map((formation) => {
   const match = formation.match(/\((.*?)\)/);
   return match ? match[1] : formation;
 });


  const barData = {
    labels: labels,
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

  // How to have a bracket in the title? 
  // Answer: Use the HTML entity for the bracket: &lt; for < and &gt; for >
  return (
    <div>
      <h3>Nombre de réponses pour la question: {question}</h3>
      <p>&#40;Vrai: la personne a répondu à la question, Faux: la personne n'a pas répondu à la question&#41;</p>
      <Bar data={barData} options={barOptions} />
    </div>
  );
};

export default CountNbResponseGraph;

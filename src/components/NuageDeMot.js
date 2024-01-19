import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactWordcloud from 'react-wordcloud';
import "../css/Cloud.css"


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const NuageDeMot = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedFiliere, setSelectedFiliere] = useState('MI');
  const [loading, setLoading] = useState(true);

  // Static list of filières
  const filieres = [
    { code: 'MI', name: 'Mecanique et Interactions (MI)' },
    { code: 'STE', name: 'Sciences et Technologies de l\'Eau (STE)' },
    { code: 'MAT', name: 'Materiaux (MAT)' },
    { code: 'IG', name: 'Informatique et Gestion (IG)' },
    { code: 'GBA', name: 'Genie Biologique et Agroalimentaires (GBA)' },
    { code: 'MEA', name: 'Microelectronique Et Automatique (MEA)' },
  ];

  const fetchData = async (filiere, modele, setDataCallback) => {
    try {
      const response = await axios.get(`${BASE_URL}/wordcloud/${filiere}/${modele}`);
      setDataCallback(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData(selectedFiliere, 1, setData);
    fetchData(selectedFiliere, 2, setData2);
  }, [selectedFiliere]);

  const handleFiliereChange = (event) => {
    setSelectedFiliere(event.target.value);
  };

  const wordcloudOptions = {
    rotations: 2,
    rotationAngles: [0],
    backgroundColor: 'lightgray',
    scale: 'sqrt',
    enableTooltip: true,
    minFontSize: 15,
    fontSize: (word) => Math.log2(word.value) * 10,
  };

  return (
    <div className="wrapper">
      <div className="select-wrapper">
        <label htmlFor="yearSelect">Choisir la filière:</label>
        <select id="yearSelect" value={selectedFiliere} onChange={handleFiliereChange}>
          {filieres.map(filiere => (
            <option key={filiere.code} value={filiere.code}>{filiere.name}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
       <div className="wordcloud-container">
       <div className="nuage-de-mot-cloud">
         <h3>Quels enseignements vous semblent les plus utiles pour l'exercice de votre métier et votre insertion professionnelle ?</h3>
         <ReactWordcloud 
         words={Object.entries(data).map(([text, value]) => ({ text, value }))} 
         options={{
          ...wordcloudOptions,
        }}
         />
       </div>
       <div className="nuage-de-mot-cloud">
         <h3>Parmi les enseignements fournis par l'école, quels sont ceux qui mériteraient d'être approfondis ou renforcés ?</h3>
         <ReactWordcloud 
         words={Object.entries(data2).map(([text, value]) => ({ text, value }))} 
           options={{
            ...wordcloudOptions,
          
          }}
         />
       </div>
     </div>
     
      )}
    </div>
  );
};

export default NuageDeMot;
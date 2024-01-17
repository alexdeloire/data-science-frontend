import React, { useState, useEffect } from 'react';
import ResponseGraph from './Graph/ResponseGraph';
import SexeGraph from './Graph/SexeGraph';
import SatisfactionGraph from './Graph/SatisfactionGraph';
import ImportanceGraph from './Graph/ImportancegGraph';
import ReputationGraph from './Graph/ReputationGraph';
import CountNbResponseGraph from './Graph/CountNbResponseGraph';
import axios from 'axios';
import { CircleLoader } from 'react-spinners';

const DashBoard = () => {

 const [selectedYear, setSelectedYear] = useState(2023);
 const [countResponse, setCountResponse] = useState(null);
 let i=0;
 const [loadingStates, setLoadingStates] = useState({
  "graph1": true,
  "graph2": true,
  "graph3": true,
  "graph4": true,
  "graph5": true,
  "graph6": true,
  "graph7": true,
  "graph8": true,
  "graph9": true,
});

 const questions = [
  "quels enseignements vous semblent les plus utiles pour l'exercice de votre metier et votre insertion professionnelle ?",
  "parmi les enseignements fournis par l'ecole, quels sont ceux qui meriteraient d'etre approfondis ou renforces ?",
  "quels enseignements, absents de votre formation, vous auraient ete utiles ?",
  "quels enseignements, presents dans votre formation, vous paraissent inutiles ?"
 ]

 const handleChildDataLoaded = (childName) => {
  console.log('handleChildDataLoaded', childName);
  setLoadingStates((prevLoadingStates) => ({
    ...prevLoadingStates,
    [childName]: false,
  }));
};

 useEffect(() => {
  i=0;
  console.log('selectedYear', selectedYear);
  const fetchData = async () => {
   try {
    const response = await axios.get(`http://localhost:8000/count-response/?year=${selectedYear}`);
    setCountResponse(response.data.count);
   } catch (error) {
    console.error('Error fetching data:', error);
   }
  };
  
  fetchData();

}, [selectedYear]);


  // Fonction appelée lorsqu'une nouvelle année est sélectionnée
  const handleYearChange = (e) => {
   const newYear = parseInt(e.target.value, 10); // Convertir en nombre
   setSelectedYear(newYear);

   for (const childName of Object.keys(loadingStates)) {
      setLoadingStates((prevLoadingStates) => ({
        ...prevLoadingStates,
        [childName]: true,
      }))
     
  }
 };

 return ( 
  <div className="wrapper">
  <div className="select-wrapper">
    <label htmlFor="yearSelect" id="yearSelectLabel">
      Sélectionnez une année :
    </label>
    <select id="yearSelect" onChange={handleYearChange} value={selectedYear}>
      {Array.from({ length: 6 }, (_, index) => 2018 + index).map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>

  <div className="loading-container" style={{ display: Object.values(loadingStates).some((loading) => loading) === true ? "block" : "none" }}>
    <h1 className="loading-message">Loading...</h1>
    <CircleLoader
      height="80"
      width="80"
      color="#61dafb"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass="loader"
      visible={true}
    />
  </div>

  <div style={{ display: Object.values(loadingStates).some((loading) => loading) === true ? "none" : "block" }}>
        <h1>Dashboard pour année {selectedYear}</h1>
       <div>En {selectedYear}, nous avons reçu en tout {countResponse} réponses.</div>
       <div className="graph-container">
          <div className="graph-item response-graph">
            <ResponseGraph year={selectedYear} onDataLoaded={() => handleChildDataLoaded('graph1')} />
          </div>
          <div className="graph-item sexe-graph">
            <SexeGraph year={selectedYear} onDataLoaded={() => handleChildDataLoaded('graph2')} />
          </div>
          <div className="graph-item satisfaction-graph">
            <SatisfactionGraph year={selectedYear} onDataLoaded={() => handleChildDataLoaded('graph3')} />
          </div>
          <div className="graph-item importance-graph">
            <ImportanceGraph year={selectedYear} onDataLoaded={() => handleChildDataLoaded('graph4')} />
          </div>
          <div className="graph-item reputation-graph">
            <ReputationGraph year={selectedYear} onDataLoaded={() => handleChildDataLoaded('graph5')} />
          </div>
          {questions.map((question, index) => (
            <div key={index} className="graph-item count-nb-response-graph">
              <CountNbResponseGraph year={selectedYear} question={question} onDataLoaded={() => handleChildDataLoaded(`graph${6 + i++}`)} />
            </div>
          ))}
        </div>

       </div>
  </div>
 
 )

}

export default DashBoard;
import React, { useState, useEffect } from 'react';
import ResponseGraph from './Graph/ResponseGraph';
import SexeGraph from './Graph/SexeGraph';
import SatisfactionGraph from './Graph/SatisfactionGraph';
import ImportanceGraph from './Graph/ImportancegGraph';
import ReputationGraph from './Graph/ReputationGraph';
import axios from 'axios';

const DashBoard = () => {

 const [selectedYear, setSelectedYear] = useState(2023);
 const [countResponse, setCountResponse] = useState(null);

 useEffect(() => {
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
 };

 return (
  countResponse&&<div>
      <label htmlFor="yearSelect">Sélectionnez une année :</label>
      <select id="yearSelect" onChange={handleYearChange} value={selectedYear}>
        {/* Options pour chaque année de 2018 à 2023 */}
        {Array.from({ length: 6 }, (_, index) => 2018 + index).map((year) => (
         <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <h1>Dashboard for {selectedYear}</h1>
      <div>En {selectedYear}, nous avons reçu en tout {countResponse} réponses.</div>

   <ResponseGraph year={selectedYear}/>
   <SexeGraph year={selectedYear}/>
   <SatisfactionGraph year={selectedYear}/>
   <ImportanceGraph year={selectedYear}/>
   <ReputationGraph year={selectedYear}/>
  </div>
 
 )

}

export default DashBoard;
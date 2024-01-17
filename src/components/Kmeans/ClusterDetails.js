import React, { useState, useEffect } from 'react';

const ClusterDetails = ({ cluster, title }) => {
  const [selectedTitle, setSelectedTitle] = useState(title);
  const [showAllData, setShowAllData] = useState(false);
  console.log("cluster", cluster)
  
  useEffect(() => {
    console.log("ici",title);
    setSelectedTitle(title);
  }, [title]);
  
  const handleChange = (event) => {
    setSelectedTitle(event.target.value);
    setShowAllData(false);
  };
  
  const handleShowAllData = () => {
    setShowAllData(true);
  };

  console.log("title" , title )
  console.log("selectedTitle", selectedTitle);
  let selectedCluster = Object.values(cluster).find((c) => c.title === selectedTitle);
  if(selectedCluster === undefined){
    selectedCluster = cluster[0];
  }


  console.log("selectedCluster",selectedCluster);
  //verifier la taille de la liste
  let displayData = [];
  if(showAllData){
    console.log("showAllData", showAllData);
    displayData = selectedCluster.data;

  }else{
   if(selectedCluster.data.length > 10){
    console.log("sup 10");
    displayData = selectedCluster.data.slice(0, 10);

    }else{
      console.log("INF 10");
      displayData = selectedCluster.data;
    }
  }

  return (
   <div className="wrapper">
     <div className="select-wrapper">
        <label htmlFor="titleSelect">Sélectionnez un titre :</label>
        <select id="titleSelect" onChange={handleChange} value={selectedTitle}>
          {Object.values(cluster).map((c) => (
            <option key={c.title} value={c.title}>
              {c.title}
            </option>
          ))}
        </select>
      </div>

      <h2>{selectedCluster.title}</h2>
      <p>{selectedCluster.description}</p>

      <h3>Les 10 premières données :</h3>
      <ul>
        {displayData.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>

      {!showAllData && selectedCluster.data.length > 10 && (
        <button onClick={handleShowAllData}>Afficher toutes les données</button>
      )}
    </div>
  );
};

export default ClusterDetails;

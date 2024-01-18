import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScatterPlot from './ScatterPlot';
import ClusterDetails from './ClusterDetails';
import '../../css/Kmeans.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const Kmeans = () => {
    const [selectedFormation, setSelectedFormation] = useState('All');
    const [clusters, setClusters] = useState(null); 
    const [sizeData, setSizeData] = useState(0);
    const [title, setTitle] = useState(null);

    const handleFormationChange = (event) => {
        setSelectedFormation(event.target.value);
       
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response
                if (selectedFormation === 'All') {
                    response = await axios.get(`${BASE_URL}/kmeans/useful-lessons/`); // pour toutes les filieres 
                }else{
                    // valeur possible = "ig", "mea", "gba", "mat", "mi", "ste", "all" 
                    response = await axios.get(`${BASE_URL}/kmeans/useful-lessons?formation=${selectedFormation}`);
                }
                setTitle(response.data.question);
                setClusters(response.data.clusters);
                setSizeData(response.data["nombre de réponse"])
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [selectedFormation]);

    return (
        clusters&&
        <div className="wrapper">
        <div className="select-wrapper">
        <label htmlFor="yearSelect" id="yearSelectLabel">
          Sélectionnez une formation :
        </label>
        <select id="yearSelect" onChange={handleFormationChange} value={selectedFormation}>     
            <option key="All" value="All">
            All
            </option>
            <option key="ig" value="ig">
            IG
            </option>
            <option key="mea" value="mea">
            MEA
            </option>
            <option key="gba" value="gba">
            GBA
            </option>
            <option key="mat" value="mat">
            MAT
            </option>
            <option key="mi" value="mi">
            MI
            </option>
            <option key="ste" value="ste">
            STE
            </option>
    
        </select>
      </div>
      <div>
        <h2>{title}</h2>
        <div style={{width:"900px", height:"600px"}}>
            <ScatterPlot clusters={clusters} />
        </div>
        <div>
            <ClusterDetails cluster={clusters} title={clusters[0].title} size={sizeData}/>

        </div>

   
      </div>
        
       </div>
    );
}

export default Kmeans;
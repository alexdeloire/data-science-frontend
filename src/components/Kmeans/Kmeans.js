import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScatterPlot from './ScatterPlot';
import ClusterDetails from './ClusterDetails';
import '../../css/Kmeans.css';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const questions = [
    ["Quels enseignements vous semblent les plus utiles pour l'exercice de votre métier et votre insertion professionnelle ?", "useful-lessons"],
    ["Quels enseignements, absents de votre formation, vous auraient été utiles ?", "absent-lessons"],
    ["Quels conseils pourriez-vous donner aux étudiants actuellement en formation pour bien choisir leur stage de fin d'étude ? Réussir leur insertion professionnelle ?", "advice"],
]

const Kmeans = () => {
    const [selectedFormation, setSelectedFormation] = useState('All');
    const [clusters, setClusters] = useState(null); 
    const [sizeData, setSizeData] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);

    const handleFormationChange = (event) => {
        setSelectedFormation(event.target.value);
    }

    const fetchClusters = async (index) => {  
        try {
            if (index === undefined || index === null) {
                index = 0;
            }
            const questionRoute = questions[index][1];
            // valeur possible = "ig", "mea", "gba", "mat", "mi", "ste", "all" 
            const response = await axios.get(`${BASE_URL}/kmeans/${questionRoute}?formation=${selectedFormation}`);

            setClusters(response.data.clusters);
            setSizeData(response.data["nombre de réponse"])
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchClusters(questionIndex);
        console.log("question : " + questions[questionIndex][0])
    }, [selectedFormation, questionIndex]);

    const handleQuestionChange = (value) => {
        let newIndex = questionIndex + value;
        if (newIndex < 0) {
            newIndex = questions.length - 1;
        }
        if (newIndex >= questions.length) {
            newIndex = 0;
        }
        setQuestionIndex(newIndex);
    }


    return (
        clusters&&
        <div className="wrapper">
        <div className="select-wrapper">
        <label htmlFor="yearSelect" id="yearSelectLabel">
          Sélectionnez une formation :
        </label>
        <select id="yearSelect" onChange={handleFormationChange} value={selectedFormation}>     
            <option key="All" value="all">
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
        <h2>{questions[questionIndex][0]}</h2>
        <button onClick={() => handleQuestionChange(-1)}>
            Question précédente
        </button>
        <button onClick={() => handleQuestionChange(1)}>
            Question suivante
        </button>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const Kmeans = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/kmeans/useful-lessons/`); // pour toutes les filieres
                console.log(response.data);
                const formation = "ig" // valeur possible = "ig", "mea", "gba", "mat", "mi", "ste", "all" 
                const response2 = await axios.get(`${BASE_URL}/kmeans/useful-lessons?formation=${formation}`);
                console.log(response2.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Kmeans</h1>
            
        </div>
    );
}

export default Kmeans;
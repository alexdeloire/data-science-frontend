import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const ResponseGraph = ({year, onDataLoaded}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/formations/?year=${year}`);
                console.log(response.data.formations);
                setData(response.data.formations);
                onDataLoaded()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [year]);


    const getChartData = () => {
        console.log('data', data);
        const formations = Object.keys(data);
        const labels = formations.map((formation) => {
            const match = formation.match(/\((.*?)\)/);
            return match ? match[1] : formation;
          });
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Number of Answers',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                    hoverBorderColor: 'rgba(75,192,192,1)',
                    data: data ? Object.values(data) : [],
                },
            ],
        };

        console.log('chartData', chartData);
    
        return chartData;
    }


    const getChartOptions = () => {
        const chartOptions = {
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                },
            },
        };

        console.log('chartOptions', chartOptions);
        return chartOptions;
    }

    return (
        <div>
            <h2>Nombre de réponses par filière</h2>
            {data ? (
                   <div style={{ width:"100%" }}>
                <Bar data={getChartData()} options={getChartOptions()} />
                </div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

export default ResponseGraph;

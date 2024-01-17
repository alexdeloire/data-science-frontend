import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';


const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';
const ImportanceGraph = ({ year, onDataLoaded }) => {


    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/importance/?year=${year}`);
                setData(response.data.importance);
                onDataLoaded()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [year]);

    const renderChart = () => {
        if (!data) {
            return null;
        }

        // Extract data from the API response
        const formations = Object.keys(data);
        const satisfactionData = Object.values(data);
        const labels = formations.map((formation) => {
         const match = formation.match(/\((.*?)\)/);
         return match ? match[1] : formation;
       });

        // Prepare data for the chart
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: '1',
                    data: satisfactionData.map(form => form['1.0'] || 0),
                    backgroundColor: 'rgba(144, 238, 144, 0.7)',
                },
                {
                    label: '2',
                    data: satisfactionData.map(form => form['2.0'] || 0),
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                },
                {
                    label: '3',
                    data: satisfactionData.map(form => form['3.0'] || 0),
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                },
                {
                    label: '4',
                    data: satisfactionData.map(form => form['4.0'] || 0),
                    backgroundColor: 'rgba(255, 206, 86, 0.7)',
                },
                {
                    label: '5',
                    data: satisfactionData.map(form => form['5.0'] || 0),
                    backgroundColor: 'rgba(75, 192, 192, 0.7)',
                },
            ],
        };

        // Chart options
        const chartOptions = {
            scales: {
                x: { stacked: true },
                y: { stacked: true },
            },
        };

        return <Bar data={chartData} options={chartOptions} />;
    };

    return (
        <div>
            <h3>les elements suivants vous semblent-ils avoir joue un role dans votre recrutement ? - la formation</h3>
            <div style={{ width:"100%" }}>
            {renderChart()}
            </div>
        </div>
    );
};

export default ImportanceGraph;

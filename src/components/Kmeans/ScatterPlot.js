import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const ScatterPlot = ({ clusters }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (clusters.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    const clusterData = Object.values(clusters).map((cluster) => {
      const color = getRandomColor();

      const dataset = {
        label: cluster.title,
        data: [
          ...cluster.coordinates.map((coord) => ({ x: coord[0], y: coord[1], type: 'coordinates' })),
          { x: cluster.center[0], y: cluster.center[1], type: 'center' },
        ],
        backgroundColor: color,
        pointStyle: (context) => {
          return context.dataset.data[context.dataIndex].type === 'center' ? 'crossRot' : 'circle';
        },
        pointRadius: (context) => {
          return context.dataset.data[context.dataIndex].type === 'center' ? 9 : 2;
        },
        pointBorderColor: (context) => {
          // Utilisez une fonction pour définir la couleur du contour du point
          return context.dataset.data[context.dataIndex].type === 'center' ? color : "transparent";
        },
        pointBorderWidth: (context) => {
          // Utilisez une fonction pour définir la couleur du contour du point
          return context.dataset.data[context.dataIndex].type === 'center' ? 3 : 0;
        },
      };

      return dataset;
    });

    const scatterChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: clusterData,
      },
      options: {
        scales: {
          x: {
            ticks: {
              stepSize: 2, // Ajustez la taille de l'étape selon vos besoins
            },
          },
          y: {
            ticks: {
              stepSize: 2, // Ajustez la taille de l'étape selon vos besoins
            },
          },
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => {
              const index = tooltipItem[0].datasetIndex;
              return data.datasets[index].label;
            },
            label: (tooltipItem) => `(${tooltipItem.xLabel}, ${tooltipItem.yLabel})`,
          },
        },
        onClick: (_, chartElements) => {
          if (chartElements.length > 0) {
            const index = chartElements[0].datasetIndex;
            const selectedCluster = clusters[index];
            alert(selectedCluster.description);
          }
        },
      },
    });

    return () => {
      scatterChart.destroy();
    };
  }, [clusters]);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };


return <canvas width="1200" ref={chartRef} style={{ width: '700px', height: '700px' }} />;

};

export default ScatterPlot;

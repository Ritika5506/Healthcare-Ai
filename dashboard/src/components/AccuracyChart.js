import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const AccuracyChart = ({ trainingData }) => {

  const data = {
    labels: trainingData.map(d => "Round " + d.round),
    datasets: [
      {
        label: "Model Accuracy",
        data: trainingData.map(d => d.accuracy),
        borderColor: "#42a5f5",
        tension: 0.3
      }
    ]
  };

  return <Line data={data} />;
};

export default AccuracyChart;

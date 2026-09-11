import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Box, Paper } from "@mui/material";

import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";
import AccuracyChart from "../components/AccuracyChart";
import HospitalTable from "../components/HospitalTable";
import PredictionPanel from "../components/PredictionPanel";
import ModelStats from "../components/ModelStats";

const Dash = () => {

  const [trainingData, setTrainingData] = useState([]);
  const [status, setStatus] = useState({
    connected_hospitals: 0,
    training_rounds: 0,
    current_accuracy: 0,
    model_loaded: false
  });

  useEffect(() => {

    axios.get("https://healthcare-ai-backend-0kal.onrender.com/training")
      .then(res => setTrainingData(res.data))
      .catch(err => console.error(err));

    axios.get("https://healthcare-ai-backend-0kal.onrender.com/status")
      .then(res => setStatus(res.data))
      .catch(err => console.error(err));

  }, []);

  return (

    <Box sx={{ display: "flex", minHeight: "100vh", background:"#f4f6f8" }}>

      <Sidebar />

      <Container maxWidth="lg" sx={{ ml: "240px", pt: 4 }}>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Healthcare Federated AI Dashboard
        </Typography>

        <StatsCards status={status} />

        {/* Model Status */}
        <Box sx={{ mt: 4 }}>
          <ModelStats />
        </Box>

        {/* Prediction Panel */}
        <Box sx={{ mt: 4 }}>
          <PredictionPanel />
        </Box>

        {/* Training Metrics */}
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6">Accuracy Trend</Typography>
          <AccuracyChart trainingData={trainingData} />
        </Paper>

        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6">Hospital Contributions</Typography>
          <HospitalTable trainingData={trainingData} />
        </Paper>

      </Container>

    </Box>
  );
};

export default Dash;
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FederatedLearning = () => {
  // const [status, setStatus] = useState({});
  // const [trainingData, setTrainingData] = useState([]);
  const [federatedRound, setFederatedRound] = useState(0);
  const [globalAccuracy, setGlobalAccuracy] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [openStartRound, setOpenStartRound] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const hospitals = [
    { name: "Mayo Clinic", accuracy: 82.0, privacy: "ε=0.1 (DP)", status: "IDLE" },
    { name: "Cleveland Clinic", accuracy: 79.0, privacy: "ε=0.1 (DP)", status: "IDLE" },
    { name: "Johns Hopkins", accuracy: 85.0, privacy: "ε=0.1 (DP)", status: "IDLE" },
  ];

  const blockchainBlocks = [
    {
      id: 2,
      hash: "smv6fp",
      prevHash: "tokm5",
      timestamp: "9:29:50 AM",
      contributors: 4,
    },
    {
      id: 1,
      hash: "tokm6",
      prevHash: "0000000000000000",
      timestamp: "9:29:32 AM",
      contributors: 4,
    },
  ];

  useEffect(() => {
    // Fetch data from backend for reference
    // axios.get("http://127.0.0.1:8000/status")
    //   .then((res) => console.log("Backend status:", res.data))
    //   .catch((err) => console.error("Error:", err));

    // Simulate federated learning metrics
    setFederatedRound(2);
    setGlobalAccuracy(81.75);
    setTotalLoss(0.1857);
  }, []);

  const handleStartRound = () => {
    setOpenStartRound(false);
    setIsTraining(true);
    setTimeout(() => {
      setFederatedRound((prev) => prev + 1);
      setGlobalAccuracy((prev) => Math.min(prev + 0.5, 99.5));
      setTotalLoss((Math.random() * 0.3).toFixed(4));
      setIsTraining(false);
    }, 3000);
  };

  // Training convergence data
  const convergenceData = {
    labels: ["Round 0", "Round 1", "Round 2"],
    datasets: [
      {
        label: "Server Accuracy",
        data: [0.75, 0.78, globalAccuracy],
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.1)",
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: "#2196F3",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const convergenceOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: { font: { size: 12, weight: "bold" } },
      },
    },
    scales: {
      y: {
        min: 0.5,
        max: 1,
        beginAtZero: false,
      },
    },
  };

  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", background: theme.palette.background.default, p: 4 }}>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              🔒 MEDFED - Federated Learning Control
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Secure Federated Learning & Blockchain Framework
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Chip
              label="DECENTRALIZED AGGREGATOR ACTIVE"
              color="success"
              variant="outlined"
              icon={<SecurityIcon />}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenStartRound(true)}
              disabled={isTraining}
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "10px 30px",
                fontWeight: "bold",
              }}
              startIcon={<PlayArrowIcon />}
            >
              {isTraining ? "Training..." : "START FEDERATED ROUND"}
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column: Hospital Nodes */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, boxShadow: 3, background: "#fff" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <StorageIcon /> Hospital Nodes
              </Typography>
              <Chip label={`${hospitals.length} ACTIVE`} color="success" size="small" sx={{ mb: 2 }} />

              {hospitals.map((hospital, idx) => (
                <Card
                  key={idx}
                  sx={{
                    mb: 2,
                    border: "2px solid #e0e0e0",
                    boxShadow: 2,
                    transition: "all 0.3s ease",
                    "&:hover": { boxShadow: 4, borderColor: "#2196F3" },
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start", mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        🏥 {hospital.name}
                      </Typography>
                      <Chip label={hospital.status} size="small" variant="outlined" color="success" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      LOCAL ACCURACY
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#2196F3", fontWeight: "bold", mb: 1 }}>
                      {hospital.accuracy.toFixed(2)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={hospital.accuracy}
                      sx={{ mb: 1.5, height: 6, borderRadius: 3 }}
                    />
                    <Typography variant="caption" color="textSecondary" sx={{ fontFamily: "monospace" }}>
                      PRIVACY NOISE<br />
                      {hospital.privacy}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>

          {/* Middle Column: Training Metrics & Convergence */}
          <Grid item xs={12} md={5}>
            {/* Global Metrics */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                  <CardContent>
                    <Typography color="inherit" variant="body2" sx={{ opacity: 0.9 }}>
                      GLOBAL ROUND
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ my: 1 }}>
                      {federatedRound}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: 3, background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white" }}>
                  <CardContent>
                    <Typography color="inherit" variant="body2" sx={{ opacity: 0.9 }}>
                      GLOBAL ACCURACY
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ my: 1 }}>
                      {globalAccuracy.toFixed(2)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ boxShadow: 3, background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "white" }}>
                  <CardContent>
                    <Typography color="inherit" variant="body2" sx={{ opacity: 0.9 }}>
                      TOTAL LOSS
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" sx={{ my: 1 }}>
                      {totalLoss}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Training Convergence Chart */}
            <Paper sx={{ p: 3, boxShadow: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                📊 Training Convergence
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={convergenceData} options={convergenceOptions} />
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Blockchain Ledger */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, boxShadow: 3, background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", color: "white" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                🔗 Blockchain Ledger
                <span style={{ fontSize: "18px" }}>⏱️</span>
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {blockchainBlocks.map((block, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      p: 2,
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 2,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: "14px", textTransform: "uppercase" }}>
                        BLOCK #{block.id}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#64B5F6" }}>
                        {block.timestamp}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
                    <Typography variant="caption" sx={{ mb: 1, display: "block", color: "#90caf9" }}>
                      HASH
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: "monospace", mb: 1, display: "block", color: "#e1bee7" }}>
                      {block.hash}
                    </Typography>
                    <Typography variant="caption" sx={{ mb: 1, display: "block", color: "#90caf9" }}>
                      PREV HASH
                    </Typography>
                    <Typography variant="caption" sx={{ fontFamily: "monospace", mb: 1, display: "block", color: "#e1bee7" }}>
                      {block.prevHash}
                    </Typography>
                    <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="caption" sx={{ color: "#90caf9" }}>
                        CONTRIBUTORS
                      </Typography>
                      <Box sx={{ display: "flex", gap: -1 }}>
                        {[...Array(block.contributors)].map((_, i) => (
                          <Box
                            key={i}
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: "50%",
                              border: "2px solid #64B5F6",
                              background: "rgba(100, 181, 246, 0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "10px",
                              color: "#64B5F6",
                              fontWeight: "bold",
                              ml: i > 0 ? -1 : 0,
                            }}
                          >
                            H
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Bottom: Training Details */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                📋 Federated Learning Round Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Network Status
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#4caf50" }}>
                      ✓ Active
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Model Updates
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {hospitals.length} / {hospitals.length}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Privacy Level
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#2196F3" }}>
                      Differential Privacy
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      Consensus
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#ff9800" }}>
                      Pending Validation
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* Start Round Dialog */}
        <Dialog open={openStartRound} onClose={() => setOpenStartRound(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Start New Federated Round</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mt: 2 }}>
              This will initiate a new federated learning round where all hospital nodes will participate in training the global model.
            </Typography>
            <Box sx={{ mt: 3, p: 2, background: "#f5f5f5", borderRadius: 2 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                Round Parameters:
              </Typography>
              <Typography variant="body2">• Global Round: {federatedRound + 1}</Typography>
              <Typography variant="body2">• Participating Hospitals: {hospitals.length}</Typography>
              <Typography variant="body2">• Privacy Budget: ε=0.1 (DP)</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenStartRound(false)}>Cancel</Button>
            <Button onClick={handleStartRound} variant="contained" color="primary">
              Confirm & Start
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default FederatedLearning;

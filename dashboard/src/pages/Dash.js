import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Box, Paper, Grid, Card, CardContent, Button, Chip, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import StorageIcon from "@mui/icons-material/Storage";
import SecurityIcon from "@mui/icons-material/Security";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import StatsCards from "../components/StatsCards";
import AccuracyChart from "../components/AccuracyChart";
import HospitalTable from "../components/HospitalTable";
import PredictionPanel from "../components/PredictionPanel";
import ModelStats from "../components/ModelStats";

const Dash = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [trainingData, setTrainingData] = useState([]);
  const [status, setStatus] = useState({
    connected_hospitals: 0,
    training_rounds: 0,
    current_accuracy: 0,
    model_loaded: false
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/training")
      .then(res => setTrainingData(res.data))
      .catch(err => console.error(err));

    axios.get("http://127.0.0.1:8000/status")
      .then(res => setStatus(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", background: theme.palette.background.default, p: 4 }}>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
        
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="900" sx={{ background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", mb: 1 }}>
            🏥 Healthcare Federated AI
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Secure Federated Learning Platform with Blockchain Verification
          </Typography>
        </Box>

        {/* Quick Access Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`, 
              color: "white", 
              cursor: "pointer", 
              transition: "all 0.3s ease",
              "&:hover": { 
                transform: "translateY(-8px)",
                boxShadow: `0 12px 24px ${theme.palette.mode === 'dark' ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.2)'}`
              } 
            }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <SchoolIcon />
                  <Typography variant="subtitle2">Connected Hospitals</Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">{status.connected_hospitals}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>Active nodes in network</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`, 
              color: "white", 
              cursor: "pointer", 
              transition: "all 0.3s ease",
              "&:hover": { 
                transform: "translateY(-8px)",
                boxShadow: "0 12px 24px rgba(245, 87, 108, 0.2)"
              } 
            }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <StorageIcon />
                  <Typography variant="subtitle2">Training Rounds</Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">{status.training_rounds}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>Completed aggregations</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: `linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)`, 
              color: "#1a1a1a", 
              cursor: "pointer", 
              transition: "all 0.3s ease",
              "&:hover": { 
                transform: "translateY(-8px)",
                boxShadow: "0 12px 24px rgba(79, 172, 254, 0.2)"
              } 
            }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <SecurityIcon />
                  <Typography variant="subtitle2">Model Accuracy</Typography>
                </Box>
                <Typography variant="h4" fontWeight="bold">{status.current_accuracy}%</Typography>
                <Typography variant="caption" sx={{ opacity: 0.9 }}>Current global model</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ 
              background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.light} 100%)`, 
              color: "#1a1a1a", 
              cursor: "pointer", 
              transition: "all 0.3s ease",
              "&:hover": { 
                transform: "translateY(-8px)",
                boxShadow: `0 12px 24px ${theme.palette.mode === 'dark' ? 'rgba(102, 187, 106, 0.3)' : 'rgba(102, 187, 106, 0.2)'}`
              } 
            }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Typography variant="h5">⛓️</Typography>
                  <Typography variant="subtitle2">Network Status</Typography>
                </Box>
                <Chip label="ACTIVE" color="success" size="small" sx={{ fontWeight: "bold" }} />
                <Typography variant="caption" sx={{ display: "block", mt: 1 }}>All nodes operational</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Federated Learning Stats Section */}
        <Paper sx={{ 
          p: 3, 
          mb: 4,
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
          border: `1px solid ${theme.palette.divider}`,
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 16px rgba(102, 126, 234, 0.2)'
              : '0 8px 16px rgba(102, 126, 234, 0.1)'
          }
        }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                🔒 Federated Learning Control Panel
              </Typography>
              <Typography variant="body2" color="textSecondary">Manage distributed training rounds and monitor network health</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => navigate("/federated-learning")}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                padding: "10px 20px",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "0.95rem"
              }}
              startIcon={<PlayArrowIcon />}
            >
              Open Control Panel
            </Button>
          </Box>
          <Divider sx={{ my: 2, borderColor: theme.palette.divider }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: "bold" }}>GLOBAL ROUND</Typography>
                <Typography variant="h5" sx={{ color: theme.palette.info.main, fontWeight: "bold" }}>2</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: "bold" }}>GLOBAL ACCURACY</Typography>
                <Typography variant="h5" sx={{ color: theme.palette.success.main, fontWeight: "bold" }}>81.75%</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: "bold" }}>TOTAL LOSS</Typography>
                <Typography variant="h5" sx={{ color: theme.palette.warning.main, fontWeight: "bold" }}>0.1857</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: "bold" }}>PRIVACY (DP)</Typography>
                <Typography variant="h5" sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>ε=0.1</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Enhanced Stats */}
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
        <Paper elevation={1} sx={{ 
          mt: 4, 
          p: 3,
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>📊 Accuracy Trend</Typography>
          <AccuracyChart trainingData={trainingData} />
        </Paper>

        <Paper elevation={1} sx={{ 
          mt: 4, 
          p: 3,
          mb: 4,
          background: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>🏥 Hospital Contributions</Typography>
          <HospitalTable trainingData={trainingData} />
        </Paper>

      </Container>
    </Box>
  );
};

export default Dash;

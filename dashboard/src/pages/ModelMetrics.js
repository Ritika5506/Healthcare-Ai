import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Box, Paper, Grid, Card, CardContent, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

const ModelMetrics = () => {
  const theme = useTheme();
  const [metrics, setMetrics] = useState(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/model-stats")
      .then(res => setMetrics(res.data))
      .catch(err => console.error("Error fetching model stats:", err));

    axios.get("http://127.0.0.1:8000/status")
      .then(res => setStatus(res.data))
      .catch(err => console.error("Error fetching status:", err));
  }, []);

  if (!metrics) {
    return (
      <Box sx={{ width: "100%", minHeight: "100vh", background: "#f4f6f8", p: 4 }}>
        <Container maxWidth="lg">
          <Typography>Loading model metrics...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", background: theme.palette.background.default, p: 4 }}>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Model Metrics
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Model Status Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, background: metrics.model_loaded ? "#4caf50" : "#f44336", color: "white" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {metrics.model_loaded ? <CheckCircleIcon sx={{ fontSize: 40 }} /> : <WarningIcon sx={{ fontSize: 40 }} />}
                  <Box>
                    <Typography variant="h6">Model Status</Typography>
                    <Typography variant="body2">{metrics.model_loaded ? "✓ Loaded" : "✗ Not Loaded"}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Current Accuracy Card */}
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Current Model Accuracy
                </Typography>
                <Typography variant="h4" sx={{ color: "#2196F3", fontWeight: "bold" }}>
                  {status.current_accuracy || 0}%
                </Typography>
                <LinearProgress variant="determinate" value={status.current_accuracy || 0} sx={{ mt: 2, height: 8, borderRadius: 4 }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Model Architecture */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, boxShadow: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Model Architecture
              </Typography>
              <Box sx={{ background: "#f5f5f5", p: 2, borderRadius: 1, fontFamily: "monospace" }}>
                <Typography variant="body2" component="div">
                  <strong>Type:</strong> {metrics.task}
                </Typography>
                <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                  <strong>Input Shape:</strong> {JSON.stringify(metrics.input_shape)}
                </Typography>
                <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                  <strong>Output Shape:</strong> {metrics.output_shape}
                </Typography>
                <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                  <strong>Classes:</strong> {metrics.classes && metrics.classes.join(", ")}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Training Statistics */}
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
              <CardContent>
                <Typography color="inherit" gutterBottom>
                  Connected Hospitals
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {status.connected_hospitals || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "white" }}>
              <CardContent>
                <Typography color="inherit" gutterBottom>
                  Training Rounds
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {status.training_rounds || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ModelMetrics;

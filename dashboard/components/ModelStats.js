import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Typography,
  Box,
  Grid,
  Chip,
  LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const ModelStats = () => {
  const [modelStats, setModelStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/model-stats")
      .then((res) => setModelStats(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LinearProgress />;
  if (!modelStats || modelStats.error) {
    return (
      <Paper elevation={3} sx={{ p: 3, backgroundColor: "#ffebee" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ErrorIcon color="error" />
          <Typography color="error">
            {modelStats?.error || "Failed to load model stats"}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f0f7ff" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <CheckCircleIcon sx={{ color: "#4caf50" }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          🤖 Global Model Status
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Task
            </Typography>
            <Typography sx={{ fontWeight: "500" }}>
              {modelStats.task}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Status
            </Typography>
            <Chip
              label="Model Loaded ✓"
              color="success"
              size="small"
              variant="outlined"
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Input Size
            </Typography>
            <Typography sx={{ fontWeight: "500" }}>
              {modelStats.input_shape.join(" × ")} pixels
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="caption" color="textSecondary">
              Classes
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {modelStats.classes.map((cls) => (
                <Chip key={cls} label={cls} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ModelStats;

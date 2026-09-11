import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Alert } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SecurityAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulated security alerts
    const alertData = [
      {
        id: 1,
        level: "critical",
        type: "Model Injection Attempt",
        timestamp: "2026-03-07 12:45:00",
        source: "Hospital B Network",
        description: "Attempted unauthorized model parameter modification detected",
        action: "Blocked - Access denied"
      },
      {
        id: 2,
        level: "warning",
        type: "Unusual Data Access",
        timestamp: "2026-03-07 13:10:00",
        source: "Hospital A Dashboard",
        description: "Multiple failed authentication attempts from unusual IP address",
        action: "Logged - Account locked for review"
      },
      {
        id: 3,
        level: "info",
        type: "Successful Authentication",
        timestamp: "2026-03-07 13:20:00",
        source: "Hospital C API",
        description: "Secure model download completed with SSL/TLS encryption",
        action: "Allowed - Transaction complete"
      },
      {
        id: 4,
        level: "warning",
        type: "Checksum Mismatch",
        timestamp: "2026-03-07 13:30:00",
        source: "Hospital A Validation",
        description: "Model integrity check failed - possible tampering detected",
        action: "Alert - Redownloading verified version"
      },
      {
        id: 5,
        level: "info",
        type: "Blockchain Verification",
        timestamp: "2026-03-07 13:35:00",
        source: "Network Node 3",
        description: "All federated learning transactions validated",
        action: "Verified - No anomalies detected"
      }
    ];
    setAlerts(alertData);
  }, []);

  const getAlertColor = (level) => {
    switch (level) {
      case "critical":
        return "#f44336";
      case "warning":
        return "#ff9800";
      case "info":
        return "#2196F3";
      default:
        return "#757575";
    }
  };

  const getAlertIcon = (level) => {
    switch (level) {
      case "critical":
        return <ErrorIcon sx={{ color: "#f44336" }} />;
      case "warning":
        return <WarningIcon sx={{ color: "#ff9800" }} />;
      case "info":
        return <CheckCircleIcon sx={{ color: "#2196F3" }} />;
      default:
        return null;
    }
  };

  const criticalCount = alerts.filter(a => a.level === "critical").length;
  const warningCount = alerts.filter(a => a.level === "warning").length;
  const infoCount = alerts.filter(a => a.level === "info").length;

  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", background: theme.palette.background.default, p: 4 }}>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Security Alerts
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mt: 1, mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, background: "#ffebee", borderLeft: "4px solid #f44336" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Critical
                </Typography>
                <Typography variant="h5" sx={{ color: "#f44336", fontWeight: "bold" }}>
                  {criticalCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, background: "#fff3e0", borderLeft: "4px solid #ff9800" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Warnings
                </Typography>
                <Typography variant="h5" sx={{ color: "#ff9800", fontWeight: "bold" }}>
                  {warningCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, background: "#e3f2fd", borderLeft: "4px solid #2196F3" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Information
                </Typography>
                <Typography variant="h5" sx={{ color: "#2196F3", fontWeight: "bold" }}>
                  {infoCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 2, background: "#f3e5f5", borderLeft: "4px solid #9c27b0" }}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Events
                </Typography>
                <Typography variant="h5" sx={{ color: "#9c27b0", fontWeight: "bold" }}>
                  {alerts.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Alerts List */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              severity={alert.level === "critical" ? "error" : alert.level === "warning" ? "warning" : "info"}
              sx={{
                boxShadow: 2,
                background: alert.level === "critical" ? "#ffebee" : alert.level === "warning" ? "#fff3e0" : "#e3f2fd",
                border: `2px solid ${getAlertColor(alert.level)}`,
                borderRadius: 2,
                p: 2
              }}
              icon={getAlertIcon(alert.level)}
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {alert.type}
                  </Typography>
                  <Chip
                    label={alert.level.toUpperCase()}
                    size="small"
                    sx={{
                      background: getAlertColor(alert.level),
                      color: "white",
                      fontWeight: "bold"
                    }}
                  />
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                  <strong>Time:</strong> {alert.timestamp} | <strong>Source:</strong> {alert.source}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Description:</strong> {alert.description}
                </Typography>
                <Typography variant="body2" sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  ✓ {alert.action}
                </Typography>
              </Box>
            </Alert>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SecurityAlerts;

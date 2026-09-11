import React from "react";
import { Card, CardContent, Typography, Grid, Box, useTheme } from "@mui/material";

const StatsCards = ({ status }) => {
  const theme = useTheme();

  const cardStyles = {
    card: {
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: theme.palette.mode === 'dark'
          ? '0 8px 16px rgba(102, 126, 234, 0.15)'
          : '0 8px 16px rgba(102, 126, 234, 0.1)',
        transform: "translateY(-4px)"
      }
    }
  };

  return (
    <Grid container spacing={3}>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={cardStyles.card}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: "bold", display: "block", mb: 1 }}>
                  CONNECTED HOSPITALS
                </Typography>
                <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}>
                  {status.connected_hospitals}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "2rem" }}>🏥</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={cardStyles.card}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: "bold", display: "block", mb: 1 }}>
                  TRAINING ROUNDS
                </Typography>
                <Typography variant="h4" sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>
                  {status.training_rounds}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "2rem" }}>⚡</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Card sx={cardStyles.card}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: "bold", display: "block", mb: 1 }}>
                  MODEL ACCURACY
                </Typography>
                <Typography variant="h4" sx={{ color: theme.palette.success.main, fontWeight: "bold" }}>
                  {status.current_accuracy}%
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "2rem" }}>✓</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
};

export default StatsCards;

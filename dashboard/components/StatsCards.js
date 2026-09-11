import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const StatsCards = ({ status }) => {
  return (
    <Grid container spacing={3}>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Connected Hospitals</Typography>
            <Typography variant="h4">{status.connected_hospitals}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Training Rounds</Typography>
            <Typography variant="h4">{status.training_rounds}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Model Accuracy</Typography>
            <Typography variant="h4">{status.current_accuracy}%</Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
};

export default StatsCards;
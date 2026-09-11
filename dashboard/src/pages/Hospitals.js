import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Grid } from "@mui/material";

const Hospitals = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [hospitalStats, setHospitalStats] = useState({});

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/training")
      .then(res => {
        setTrainingData(res.data);
        // Aggregate data by hospital
        const stats = {};
        res.data.forEach(item => {
          if (!stats[item.hospital]) {
            stats[item.hospital] = { rounds: 0, totalAccuracy: 0, maxAccuracy: 0 };
          }
          stats[item.hospital].rounds++;
          stats[item.hospital].totalAccuracy += item.accuracy;
          stats[item.hospital].maxAccuracy = Math.max(stats[item.hospital].maxAccuracy, item.accuracy);
        });
        // Calculate averages
        Object.keys(stats).forEach(hospital => {
          stats[hospital].avgAccuracy = (stats[hospital].totalAccuracy / stats[hospital].rounds).toFixed(2);
        });
        setHospitalStats(stats);
      })
      .catch(err => console.error("Error fetching training data:", err));
  }, []);

  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", background: theme.palette.background.default, p: 4 }}>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Hospitals
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {Object.entries(hospitalStats).map(([hospital, stats]) => (
            <Grid item xs={12} sm={6} md={4} key={hospital}>
              <Card sx={{ boxShadow: 3, height: "100%", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {hospital}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Rounds Completed:</strong> {stats.rounds}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <strong>Average Accuracy:</strong> {stats.avgAccuracy}%
                  </Typography>
                  <Typography variant="body2">
                    <strong>Max Accuracy:</strong> {stats.maxAccuracy}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ mt: 4, p: 3, boxShadow: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Training History
          </Typography>
          <TableContainer>
            <Table>
              <TableHead sx={{ background: "#f0f0f0" }}>
                <TableRow>
                  <TableCell><strong>Round</strong></TableCell>
                  <TableCell><strong>Hospital</strong></TableCell>
                  <TableCell align="right"><strong>Accuracy</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainingData.map((row, idx) => (
                  <TableRow key={idx} sx={{ "&:hover": { background: "#fafafa" } }}>
                    <TableCell>{row.round}</TableCell>
                    <TableCell>{row.hospital}</TableCell>
                    <TableCell align="right">{row.accuracy}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Hospitals;

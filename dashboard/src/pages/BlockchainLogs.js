import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";

const BlockchainLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Simulated blockchain logs (in real scenario, these would come from backend)
    const blockchainData = [
      {
        id: "BC-0001",
        timestamp: "2026-03-07 13:02:00",
        type: "Model Update",
        hospital: "Hospital A",
        hash: "0x7a9f3a1b2c4d5e6f7g8h9i0j1k2l3m4n",
        status: "Confirmed",
        details: "Global model v1.0 updated"
      },
      {
        id: "BC-0002",
        timestamp: "2026-03-07 13:05:30",
        type: "Training Round",
        hospital: "Hospital B",
        hash: "0x8b0g4b2c3d5e6f7g8h9i0j1k2l3m4n5o",
        status: "Confirmed",
        details: "Round 2 training completed"
      },
      {
        id: "BC-0003",
        timestamp: "2026-03-07 13:08:45",
        type: "Model Update",
        hospital: "Hospital C",
        hash: "0x9c1h5c3d4e6f7g8h9i0j1k2l3m4n5o6p",
        status: "Confirmed",
        details: "Local model aggregated"
      },
      {
        id: "BC-0004",
        timestamp: "2026-03-07 13:12:15",
        type: "Verification",
        hospital: "All",
        hash: "0x0d2i6d4e5f7g8h9i0j1k2l3m4n5o6p7q",
        status: "Pending",
        details: "Waiting for network consensus"
      },
      {
        id: "BC-0005",
        timestamp: "2026-03-07 13:15:00",
        type: "Training Round",
        hospital: "Hospital A",
        hash: "0x1e3j7e5f6g8h9i0j1k2l3m4n5o6p7q8r",
        status: "Confirmed",
        details: "Round 3 training started"
      }
    ];
    setLogs(blockchainData);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";
      case "Pending":
        return "warning";
      case "Failed":
        return "error";
      default:
        return "default";
    }
  };

  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", background: theme.palette.background.default, p: 4 }}>
      <Container maxWidth="lg" sx={{ pt: 2, pb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Blockchain Logs
        </Typography>

        <Paper sx={{ p: 3, boxShadow: 3, mt: 3 }}>
          <Typography variant="body2" color="textSecondary" gutterBottom sx={{ mb: 2 }}>
            Total Blocks: {logs.length} | Network: Federated Learning Chain | Status: Active
          </Typography>

          <TableContainer>
            <Table>
              <TableHead sx={{ background: "#f0f0f0" }}>
                <TableRow>
                  <TableCell><strong>Block ID</strong></TableCell>
                  <TableCell><strong>Timestamp</strong></TableCell>
                  <TableCell><strong>Type</strong></TableCell>
                  <TableCell><strong>Hospital</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log, idx) => (
                  <TableRow key={idx} sx={{ "&:hover": { background: "#fafafa" } }}>
                    <TableCell sx={{ fontFamily: "monospace", fontSize: "0.85em" }}>{log.id}</TableCell>
                    <TableCell>{log.timestamp}</TableCell>
                    <TableCell>
                      <Chip label={log.type} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>{log.hospital}</TableCell>
                    <TableCell>
                      <Chip label={log.status} color={getStatusColor(log.status)} size="small" />
                    </TableCell>
                    <TableCell>{log.details}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 3, p: 2, background: "#f5f5f5", borderRadius: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              Hash: {logs[0]?.hash}
            </Typography>
            <Typography variant="caption" display="block" sx={{ fontFamily: "monospace", mt: 1 }}>
              Proof of Work: Valid
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default BlockchainLogs;

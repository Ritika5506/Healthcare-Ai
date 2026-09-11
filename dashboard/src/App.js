import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "./ThemeContext";
import Sidebar from "./components/Sidebar";
import Dash from "./pages/Dash";
import Hospitals from "./pages/Hospitals";
import ModelMetrics from "./pages/ModelMetrics";
import Login from "./pages/Login";
import BlockchainLogs from "./pages/BlockchainLogs";
import SecurityAlerts from "./pages/SecurityAlerts";
import FederatedLearning from "./pages/FederatedLearning";

function AppContent() {
  const location = useLocation();
  const getToken = () => localStorage.getItem('hfai_token') || "";
  

  const isLoginRoute = location.pathname === "/login";

  const Private = ({ children }) => {
    if (!getToken()) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "100%" }}>
      {!isLoginRoute && <Sidebar />}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: "auto",
          marginLeft: 0,
          width: "100%"
        }}
      >
        <Routes>
          <Route path="/" element={<Private><Dash /></Private>} />
          <Route path="/login" element={<Login />} />
          <Route path="/hospitals" element={<Private><Hospitals /></Private>} />
          <Route path="/model-metrics" element={<Private><ModelMetrics /></Private>} />
          <Route path="/blockchain-logs" element={<Private><BlockchainLogs /></Private>} />
          <Route path="/security-alerts" element={<Private><SecurityAlerts /></Private>} />
          <Route path="/federated-learning" element={<Private><FederatedLearning /></Private>} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

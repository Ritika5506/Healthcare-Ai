import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Alert, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

const demoAccounts = [
  { label: "Researcher", value: "researcher" },
  { label: "Admin", value: "admin" },
];

const Login = () => {
  const [hospitalId, setHospitalId] = useState("researcher");
  const [password, setPassword] = useState("admin");
  const [name, setName] = useState("");
  const [mode, setMode] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const completeAuth = (hospitalName) => {
    localStorage.setItem("hfai_token", `demo-${Date.now()}`);
    localStorage.setItem("hfai_hospital", hospitalName || hospitalId || "Researcher");
    navigate("/", { replace: true });
    window.location.href = "/";
  };

  const handleDemoFallback = (hospitalName) => {
    completeAuth(hospitalName || (hospitalId || "Researcher"));
  };

  const handleLogin = async () => {
    setError("");
    const loginId = hospitalId.trim();
    const loginPassword = password.trim();

    if (!loginId || !loginPassword) {
      setError("Hospital ID and password are required");
      return;
    }

    const demoMatch = loginId.toLowerCase() === "researcher" && loginPassword.toLowerCase() === "admin";
    if (demoMatch) {
      handleDemoFallback("Researcher");
      return;
    }

    try {
      const res = await axios.post("https://healthcare-ai-backend-0kal.onrender.com/login", { hospital_id: loginId, password: loginPassword });
      const { token, hospital_name } = res.data;
      localStorage.setItem("hfai_token", token);
      localStorage.setItem("hfai_hospital", hospital_name || loginId);
      navigate("/", { replace: true });
      window.location.href = "/";
    } catch (e) {
      const demoAdmin = loginId.toLowerCase() === "admin" && loginPassword.toLowerCase() === "admin";
      if (demoAdmin) {
        handleDemoFallback("Admin");
        return;
      }
      setError(e.response?.data?.detail || "Login failed. Use demo credentials or backend service.");
    }
  };

  const handleSignup = async () => {
    setError("");

    if (!hospitalId.trim() || !password.trim() || !name.trim()) {
      setError("Hospital ID, hospital name, and password are required");
      return;
    }

    try {
      const res = await axios.post("https://healthcare-ai-backend-0kal.onrender.com/signup", { hospital_id: hospitalId, name, password });
      const { token, hospital_name } = res.data;
      localStorage.setItem("hfai_token", token);
      localStorage.setItem("hfai_hospital", hospital_name || name);
      navigate("/", { replace: true });
      window.location.href = "/";
    } catch (e) {
      if (hospitalId.toLowerCase() === "researcher" || hospitalId.toLowerCase() === "admin") {
        handleDemoFallback(name || hospitalId);
        return;
      }
      setError(e.response?.data?.detail || "Signup failed");
    }
  };

  const handleSubmit = () => {
    if (mode === 0) handleLogin();
    else handleSignup();
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", background: "radial-gradient(circle at top, rgba(38,94,154,0.8), rgba(6,17,32,1) 42%)" }}>
      <Box sx={{ flex: 1, px: { xs: 3, md: 5 }, py: { xs: 4, md: 6 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Box sx={{ maxWidth: 680, mx: "auto", width: "100%" }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", px: 2, py: 0.8, borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.04)", mb: 3 }}>
            <SecurityOutlinedIcon sx={{ color: "#6cc8ff", mr: 1, fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: "#dceefe", fontWeight: 600 }}>
              Secure Federated Healthcare AI
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "3rem", md: "5rem" },
              lineHeight: 0.96,
              fontWeight: 900,
              letterSpacing: "-0.08em",
              color: "#f5fbff",
              mb: 2,
              maxWidth: 620,
              textShadow: "0 0 18px rgba(93,180,255,0.15)",
            }}
          >
            Collaborative AI,
            <Box component="span" display="block" sx={{ color: "#72c5ff" }}>Zero Data Exposure</Box>
          </Typography>

          <Typography variant="h6" sx={{ color: "#ccdfe9", maxWidth: 620, opacity: 0.9, fontWeight: 400, mb: 4 }}>
            Train pneumonia detection models across hospitals — without transferring a single patient record.
          </Typography>

          <Box sx={{ display: "grid", gap: 2, maxWidth: 620 }}>
            {[
              { icon: <SecurityOutlinedIcon />, title: "HIPAA / GDPR Compliant", subtitle: "End-to-end encrypted data pipeline" },
              { icon: <StorageOutlinedIcon />, title: "Federated Learning", subtitle: "Train without sharing raw patient data" },
              { icon: <VerifiedUserOutlinedIcon />, title: "Blockchain Audit Trail", subtitle: "Tamper-resistant, immutable logs" },
              { icon: <LockOutlinedIcon />, title: "Differential Privacy", subtitle: "ε-differential privacy guaranteed" },
            ].map((item, index) => (
              <Paper
                key={index}
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  px: 2.5,
                  py: 2,
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#eef7ff",
                }}
              >
                <Box sx={{ width: 36, height: 36, borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(98,175,255,0.12)", color: "#86d1ff" }}>
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "1.05rem", fontWeight: 700, color: "#f4fbff" }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#b7d4ea" }}>{item.subtitle}</Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          <Typography variant="caption" sx={{ mt: 4, display: "block", color: "rgba(220,238,255,0.7)", letterSpacing: ".12rem" }}>
            HIPAA · GDPR · ISO 27001 · SOC 2 TYPE II
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: { xs: "100%", md: "48%" }, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)" }}>
        <Paper elevation={0} sx={{ width: "100%", maxWidth: 640, height: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", boxShadow: "none", borderRadius: 0, px: { xs: 3, md: 5 } }}>
          <Box sx={{ width: "100%", maxWidth: 500 }}>
            <Box sx={{ display: "flex", gap: 1, background: "rgba(124,138,155,0.15)", p: 0.8, borderRadius: 2, mb: 3 }}>
              <Button onClick={() => setMode(0)} fullWidth sx={{ borderRadius: 1.5, py: 1.5, fontWeight: 700, background: mode === 0 ? "rgba(255,255,255,0.9)" : "transparent", color: mode === 0 ? "#1b2430" : "#607085" }}>
                Sign In
              </Button>
              <Button onClick={() => setMode(1)} fullWidth sx={{ borderRadius: 1.5, py: 1.5, fontWeight: 700, background: mode === 1 ? "rgba(255,255,255,0.9)" : "transparent", color: mode === 1 ? "#1b2430" : "#607085" }}>
                Create Account
              </Button>
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 800, color: "#1f2937", mb: 1 }}>Welcome back</Typography>
            <Typography variant="body1" sx={{ color: "#5d6a78", mb: 4 }}>
              {mode === 0 ? "Sign in to your institutional account to continue." : "Create your institutional account to begin secure collaboration."}
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
            )}

            {mode === 1 && (
              <TextField
                fullWidth
                label="Hospital Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { borderRadius: 2, background: '#f3f5f7' } }}
              />
            )}

            <TextField
              fullWidth
              label="Institutional Email"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { borderRadius: 2, background: '#f3f5f7' } }}
              InputProps={{
                startAdornment: <EmailOutlinedIcon sx={{ color: "#6c7788", mr: 1 }} />,
              }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography variant="body1" sx={{ color: "#1f2937", fontWeight: 700 }}>Password</Typography>
              <Typography variant="body2" sx={{ color: "#3f7bd5", fontWeight: 600, cursor: "pointer" }}>Forgot password?</Typography>
            </Box>
            <TextField
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2, background: '#f3f5f7' } }}
              InputProps={{
                startAdornment: <VisibilityOffOutlinedIcon sx={{ color: "#6c7788", mr: 1 }} />,
              }}
            />

            <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ height: 58, borderRadius: 2, background: "#0d1420", color: "#f9fcff", fontWeight: 800, fontSize: "1.05rem", textTransform: "none", mb: 3 }}>
              {mode === 0 ? "Sign In" : "Create Account"}
            </Button>

            <Box sx={{ borderRadius: 2, border: "1px solid #d6dbe1", background: "#f3f5f7", p: 2, mb: 3 }}>
              <Typography variant="body2" sx={{ color: "#4b5a69", fontWeight: 700, mb: 1.5 }}>Demo credentials</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {demoAccounts.map((account) => (
                  <Button
                    key={account.value}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1.5, borderColor: "#c9d0d8", color: "#243244", textTransform: "none", fontWeight: 700 }}
                    onClick={() => {
                      setHospitalId(account.value);
                      setPassword("admin");
                    }}
                  >
                    {account.label}
                  </Button>
                ))}
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body1" sx={{ textAlign: "center", color: "#1f2937" }}>
              Don’t have an account? <Box component="span" sx={{ color: "#1d4ed8", fontWeight: 800, cursor: "pointer" }} onClick={() => setMode(1)}>Request access</Box>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const PredictionPanel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sampleImages, setSampleImages] = useState({ normal: [], pneumonia: [] });

  useEffect(() => {
    // Load sample images
    axios
      .get("https://healthcare-ai-backend-0kal.onrender.com/sample-images")
      .then((res) => setSampleImages(res.data))
      .catch((err) => console.error("Error loading samples:", err));
    // If logged in, load hospital's own samples
    const token = localStorage.getItem('hfai_token');
    if (token) {
      axios.get("https://healthcare-ai-backend-0kal.onrender.com/my-samples", { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          if (res.data.files) {
            setSampleImages((s) => ({ ...s, my: res.data.files }));
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
      setPrediction(null);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem('hfai_token');
      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers.Authorization = `Bearer ${token}`;
      const res = await axios.post("https://healthcare-ai-backend-0kal.onrender.com/predict", formData, { headers });
      setPrediction(res.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setPrediction({ error: "Failed to get prediction" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (ev) => {
    const files = ev.target.files;
    const token = localStorage.getItem('hfai_token');
    if (!token) {
      alert('Please login to upload samples');
      return;
    }
    const form = new FormData();
    for (let i = 0; i < files.length; i++) form.append('files', files[i]);
    try {
      await axios.post('https://healthcare-ai-backend-0kal.onrender.com/upload-data', form, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } });
      // refresh my samples
      const res = await axios.get("https://healthcare-ai-backend-0kal.onrender.com/my-samples", { headers: { Authorization: `Bearer ${token}` } });
      setSampleImages((s) => ({ ...s, my: res.data.files }));
      alert('Uploaded');
    } catch (e) {
      console.error(e);
      alert('Upload failed');
    }
  };

  const handleSampleClick = (category, filename) => {
    // Use the sample from backend
    setSelectedFile({ name: filename });
    
    // Fetch and display the sample
    const token = localStorage.getItem('hfai_token');
    const opts = { responseType: 'blob' };
    if (category === 'uploads' && token) {
      opts.headers = { Authorization: `Bearer ${token}` };
    }

    axios.get(`https://healthcare-ai-backend-0kal.onrender.com/sample-image/${category}/${filename}`, opts)
      .then((res) => {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(res.data);
        
        // Create a File object for prediction
        const file = new File([res.data], filename, { type: "image/jpeg" });
        setSelectedFile(file);
        setPrediction(null);
      })
      .catch((err) => console.error("Error loading sample:", err));
  };

  return (
    <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
      {/* Upload Section */}
      <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          🔬 Model Prediction
        </Typography>

        <Box
          sx={{
            border: "2px dashed #1976d2",
            borderRadius: 2,
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: "#f0f7ff",
            mb: 2,
            transition: "all 0.3s",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          }}
          component="label"
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileSelect}
          />
          <CloudUploadIcon sx={{ fontSize: 40, color: "#1976d2", mb: 1 }} />
          <Typography variant="body2">
            Drag & drop an X-ray image or click to select
          </Typography>
        </Box>

        {preview && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="textSecondary">
              Preview:
            </Typography>
            <Box
              component="img"
              src={preview}
              sx={{
                maxWidth: "100%",
                height: "250px",
                objectFit: "contain",
                borderRadius: 1,
                mt: 1,
              }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handlePredict}
          disabled={!selectedFile || loading}
          sx={{ mb: 2 }}
        >
          {loading ? "Analyzing..." : "Predict"}
        </Button>

        {loading && <LinearProgress sx={{ mt: 2 }} />}

        {/* Results */}
        {prediction && !prediction.error && (
          <Card sx={{ mt: 2, backgroundColor: prediction.prediction === "Pneumonia" ? "#ffebee" : "#e8f5e9" }}>
            <CardContent>
              <Box sx={{ mb: 2, textAlign: "center", p: 2, background: prediction.prediction === "Pneumonia" ? "#ef5350" : "#66bb6a", color: "white", borderRadius: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  {prediction.prediction === "Pneumonia" ? "⚠️ PNEUMONIA DETECTED" : "✓ NORMAL"}
                </Typography>
                <Chip
                  label={`Confidence: ${prediction.confidence}%`}
                  sx={{ background: "rgba(255,255,255,0.3)", color: "white", fontWeight: "bold" }}
                />
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                Prediction Breakdown:
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    Normal (Healthy)
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: "bold", color: "#4caf50" }}>
                    {prediction.normal_probability}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={prediction.normal_probability}
                  sx={{ height: 8, borderRadius: 4, background: "#e0e0e0" }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: "bold" }}>
                    Pneumonia (Infected)
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: "bold", color: "#f44336" }}>
                    {prediction.pneumonia_probability}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={prediction.pneumonia_probability}
                  color="error"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ p: 1.5, background: "#f5f5f5", borderRadius: 1, mt: 2 }}>
                <Typography variant="caption" color="textSecondary">
                  <strong>Model Confidence Level:</strong> {prediction.model_confidence}
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mt: 0.5 }}>
                  <strong>Raw Prediction Score:</strong> {prediction.raw_prediction}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Paper>

      {/* Sample Images Section */}
      <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          📁 Test with Samples
        </Typography>

        {localStorage.getItem('hfai_token') && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Upload your hospital samples:</Typography>
            <input type="file" multiple accept="image/*" onChange={handleUpload} />
          </Box>
        )}

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Normal X-rays:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 3 }}>
          {sampleImages.normal.map((img) => (
            <Button
              key={img}
              variant="outlined"
              size="small"
              onClick={() => handleSampleClick("normal", img)}
              sx={{ textTransform: "none", fontSize: "0.8rem" }}
            >
              {img.substring(0, 15)}...
            </Button>
          ))}
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Pneumonia X-rays:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {sampleImages.pneumonia.map((img) => (
            <Button
              key={img}
              variant="outlined"
              size="small"
              onClick={() => handleSampleClick("pneumonia", img)}
              sx={{ textTransform: "none", fontSize: "0.8rem" }}
            >
              {img.substring(0, 15)}...
            </Button>
          ))}
        </Box>

        {sampleImages.my && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>My Uploaded Samples:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {sampleImages.my.map(f => (
                <Button key={f} variant="outlined" size="small" onClick={() => handleSampleClick('uploads', f)}>{f.substring(0,15)}...</Button>
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ mt: 3, p: 2, backgroundColor: "#fff3e0", borderRadius: 1 }}>
          <Typography variant="caption">
            💡 <strong>Tip:</strong> Click on sample images to test the model's
            predictions on X-ray images.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default PredictionPanel;

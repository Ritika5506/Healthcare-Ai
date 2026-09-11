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
  Grid,
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
      .get("http://127.0.0.1:8000/sample-images")
      .then((res) => setSampleImages(res.data))
      .catch((err) => console.error("Error loading samples:", err));
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
      const res = await axios.post("http://127.0.0.1:8000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(res.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setPrediction({ error: "Failed to get prediction" });
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (category, filename) => {
    // Use the sample from backend
    setSelectedFile({ name: filename });
    
    // Fetch and display the sample
    axios
      .get(`http://127.0.0.1:8000/sample-image/${category}/${filename}`, {
        responseType: "blob",
      })
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
          <Card sx={{ mt: 2, backgroundColor: "#f5f5f5" }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Prediction Result
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {prediction.prediction}
                </Typography>
                <Chip
                  label={`${prediction.confidence}% confidence`}
                  color={prediction.prediction === "Pneumonia" ? "error" : "success"}
                  variant="outlined"
                />
              </Box>

              <Typography variant="caption" color="textSecondary" block>
                Normal Probability: {prediction.normal_prob}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={prediction.normal_prob}
                sx={{ mb: 1 }}
              />

              <Typography variant="caption" color="textSecondary" block>
                Pneumonia Probability: {prediction.pneumonia_prob}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={prediction.pneumonia_prob}
                color="error"
              />
            </CardContent>
          </Card>
        )}
      </Paper>

      {/* Sample Images Section */}
      <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          📁 Test with Samples
        </Typography>

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

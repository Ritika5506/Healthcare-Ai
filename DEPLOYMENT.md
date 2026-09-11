# Deployment Guide

This repository includes a backend (FastAPI) and a React dashboard. Below are recommended ways to deploy locally (Docker) and to cloud providers.

1) Quick local deployment with Docker Compose

Prerequisites: Docker and Docker Compose installed.

From the repository root run:

```bash
docker compose build
docker compose up -d
```

- Backend will be available at `http://localhost:8000` (API docs at `/docs`).
- Frontend will be available at `http://localhost:3000`.

Notes:
- The `docker-compose.yml` mounts `backend/global_model.h5` or `backend/saved_model` into the container. Ensure your model file is present.
- TensorFlow images can be large and may require extra system packages. The backend Dockerfile uses `python:3.10-slim` and installs `requirements.txt` — if you run into build issues, consider using a full `tensorflow` base image or rebuild the model into a SavedModel format.

2) Production recommendations

- Use a process manager or container platform (AWS ECS/Fargate, Azure App Service, GCP Cloud Run, or Kubernetes).
- Build release images and push to a registry (Docker Hub, AWS ECR):

```bash
docker build -t yourrepo/healthcare-backend:latest -f backend/Dockerfile backend
docker push yourrepo/healthcare-backend:latest

docker build -t yourrepo/healthcare-frontend:latest -f dashboard/Dockerfile dashboard
docker push yourrepo/healthcare-frontend:latest
```

- For production, serve the backend behind a reverse proxy (nginx) and enable HTTPS (LetsEncrypt).
- Use environment variables for configuration (CORS, model path, PORT). Mount the model into a volume rather than baking it into the image.

3) Model serving alternatives

- For higher throughput and smaller images, export the model as a TensorFlow SavedModel and use `tensorflow/serving` or Triton Inference Server, then point the FastAPI server to that service.

4) Monitoring & scaling

- Add health checks, logging, and a metrics exporter (Prometheus). Scale backend replicas behind a load balancer.

If you want, I can:
- Build and run the Docker Compose here to verify, or
- Create cloud-specific deployment manifests (AWS ECS task + service, Azure Container Instances, or Kubernetes manifests). Tell me which provider to target.

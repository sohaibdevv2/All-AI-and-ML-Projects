# Production MLOps Deployment Wrapper

This repository contains a minimal production-ready FastAPI application that serves predictions from a serialized scikit-learn model, and a multi-stage Dockerfile to build a small production image.

Quick steps:

1. Build the Docker image (this will run the training script during build to embed the model):

```bash
docker build -t ml-fastapi:latest .
```

2. Run the container:

```bash
docker run --rm -p 8000:8000 ml-fastapi:latest
```

3. Health check:

```bash
curl http://localhost:8000/health
```

4. Example prediction (Iris features — 4 floats):

```bash
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"features": [5.1, 3.5, 1.4, 0.2]}'
```

5. Root endpoint

```bash
curl http://localhost:8000/
```

6. Container control (build, restart, stop)

```bash
# Rebuild image
docker build -t ml-fastapi:latest .

# Stop and remove existing container (if any), then start a new one
docker rm -f mltest 2>/dev/null || true
docker run -d --name mltest -p 8000:8000 ml-fastapi:latest

# Stop the container
docker rm -f mltest
```

Notes:
- The Docker build runs `train_model.py` to create `models/model.joblib` so the image contains the artifact out-of-the-box.
- Inputs are strictly validated by Pydantic. Type mismatches return HTTP 422 responses from FastAPI.

### Builder: install deps and produce model artifact
FROM python:3.11-slim AS builder
WORKDIR /src

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install pip and build-time tools if needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt --target /install
ENV PYTHONPATH=/install

# Copy source and train model during build so the final image already contains the artifact
COPY . /src
RUN python train_model.py


### Final: minimal runtime image
FROM python:3.11-slim
WORKDIR /app

# Create non-root user
RUN groupadd --system app && useradd --system --gid app --create-home --home-dir /home/app app

# Copy installed packages and application code from builder
COPY --from=builder /install /install
COPY --from=builder /src /app

ENV PATH="/install/bin:${PATH}"
ENV PYTHONPATH="/install:/app"

USER app
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

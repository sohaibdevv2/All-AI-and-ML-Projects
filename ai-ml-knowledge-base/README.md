# AI & ML Knowledge Base

Welcome to the **Complete AI & ML Knowledge Base**. This repository serves as a permanent reference for the core concepts, architectures, and emerging trends in Artificial Intelligence, from the math foundations to the cutting-edge of **Agentic AI** and **World Models**.

## Table of Contents
1. [📐 Mathematical Foundations](#-mathematical-foundations)
2. [🤖 Machine Learning (ML)](#-machine-learning-ml)
3. [🧠 Deep Learning (DL)](#-deep-learning-dl)
4. [✨ Generative AI (GenAI)](#-generative-ai-genai)
5. [🕵️ Agentic AI (The Current Frontier)](#️-agentic-ai-the-current-frontier)
6. [🧩 Compound AI & Architecture](#-compound-ai--architecture)
7. [⚡ Model Optimization & Engineering](#-model-optimization--engineering)
8. [🔄 The AI Development Lifecycle](#-the-ai-development-lifecycle)
9. [🛡️ Safety, Ethics & Governance](#️-safety-ethics--governance)
10. [🚀 Future Frontiers](#-future-frontiers)
11. [🛠️ Ecosystem & Frameworks](#-ecosystem--frameworks)

## Mathematical Foundations
*The "hidden logic" behind every algorithm.*
- **Linear Algebra:** Tensors, Eigenvectors, SVD, Matrix Decomposition.
- **Calculus:** Partial Derivatives, Chain Rule, Jacobians (essential for backpropagation).
- **Probability:** Bayes’ Theorem, Gaussian Distributions, Cross-Entropy Loss.
- **Optimization:** Stochastic Gradient Descent (SGD), Adam, RMSProp.

---

## Machine Learning (ML)
- **Supervised:** XGBoost, Random Forest, Logistic Regression, Support Vector Machines (SVM).
- **Unsupervised:** K-Means Clustering, PCA (Dimensionality Reduction), t-SNE.
- **Reinforcement Learning (RL):** Policy Gradients, Q-Learning, PPO (the tech used to align LLMs like ChatGPT).

---

## Deep Learning (DL)
- **Transformers:** Multi-Head Attention, Positional Encoding, Encoder-Only (BERT) vs Decoder-Only (GPT).
- **Neural Architectures:** CNNs (Computer Vision), RNNs/LSTMs (Time-series), GNNs (Graph Neural Networks).
- **Mechanics:** Dropout, Batch Normalization, Weight Initialization, Residual Connections.

---

## Generative AI (GenAI)
- **RAG (Retrieval-Augmented Generation):** Connecting LLMs to real-time, private data without retraining.
- **Fine-tuning (PEFT):** 
    - **LoRA:** Updating only tiny "adapter" layers to save compute.
    - **QLoRA:** Fine-tuning on 4-bit quantized models (allows training on consumer GPUs).
- **Prompting:** Chain-of-Thought (CoT), ReAct, Skeleton-of-Thought, Zero-shot vs. Few-shot.

## Agentic AI (The Current Frontier)
*Moving from "Chatbots" to "Autonomous Workers".*
- **Agency:** The ability to make autonomous decisions to achieve a high-level goal.
- **Reasoning Models:** OpenAI **o1** and DeepSeek-V3 (models that "think" and self-correct before responding).
- **Tool Use (Function Calling):** The ability for AI to browse the web, run Python code, or use SQL.
- **MCP (Model Context Protocol):** An open standard to connect AI models to any data source or tool seamlessly.

## Compound AI & Architecture
*Building systems that are more than just a single prompt.*
- **Modular AI:** Using a "routing" model to pick specialized smaller models for specific tasks.
- **Multi-Agent Systems (MAS):** Orchestrating multiple agents (e.g., a "Coder," a "Reviewer," and a "Manager") to solve complex projects.
- **Neuro-symbolic AI:** Combining Deep Learning (pattern recognition) with Symbolic Logic (rule-based math) to eliminate hallucinations.

## Model Optimization & Engineering
*Making AI fast, cheap, and deployable.*
- **Quantization:** Reducing weight precision (e.g., FP32 to INT4) to run huge models on small hardware.
- **Inference Engines:** 
    - **vLLM:** High-throughput serving using *PagedAttention*.
    - **Ollama:** The easiest way to run LLMs locally on MacOS, Linux, or Windows.
- **KV Caching:** Drastically speeding up token generation by storing previous context calculations.

## The AI Development Lifecycle

### 1. Traditional ML (Data-Centric)
*   **Data Prep:** Cleaning, Feature Engineering, Labeling.
*   **Training:** Hyperparameter tuning on local clusters.
*   **Eval:** Measuring Accuracy, Precision, Recall, and F1-score.

### 2. GenAI & RAG (Context-Centric)
*   **Embedding:** Converting text into vectors.
*   **Vector Storage:** Storing data in Pinecone, Weaviate, or ChromaDB.
*   **Orchestration:** Using LangChain or LlamaIndex to connect the model to the data.

### 3. Agentic AI (Goal-Centric)
*   **Task Decomposition:** Breaking a goal into sub-steps.
*   **Reflection Loop:** The agent reviews its output and fixes errors autonomously.
*   **Human-in-the-loop (HITL):** Strategic checkpoints where the AI asks for human approval.

## Safety, Ethics & Governance
- **Red Teaming:** Trying to "break" the AI to find security vulnerabilities or biases.
- **Guardrails:** Real-time filters (like NeMo Guardrails) that stop AI from discussing restricted topics.
- **Alignment:** Techniques like RLHF (Reinforcement Learning from Human Feedback) to ensure AI helps humans.
- **Hallucination Detection:** Using NLI (Natural Language Inference) to check if an answer is supported by the data.

## Future Frontiers
- **World Models:** AI that understands the physical laws of the world (e.g., Sora for video, or Wayve for self-driving).
- **Liquid Neural Networks:** Models that keep learning and adapting their parameters even *after* training is finished.
- **Embodied AI:** Integrating LLMs/Agents into humanoid robotics (e.g., Figure AI, Tesla Optimus).
- **Small Language Models (SLMs):** High-performance models (like Phi-3) that run entirely on a smartphone.

## Ecosystem & Frameworks
| Category | Popular Tools |
| :--- | :--- |
| **Foundations** | PyTorch, TensorFlow, JAX, Scikit-Learn |
| **LLM Orchestration** | LangChain, LlamaIndex, Haystack |
| **Agentic Frameworks** | **CrewAI, LangGraph, AutoGen, PydanticAI** |
| **Model Hosting** | Hugging Face, Groq, AWS Bedrock, Azure AI |
| **Vector DBs** | Pinecone, Milvus, Qdrant, MongoDB Atlas |

*Last Updated: 2026. This is a living roadmap star this repo to track the evolution of the field!*

## 🧱 Contributors Wall

<div align="center">
  <img src="https://contrib.rocks/image?repo=sohaibdevv/ai-ml-knowledge-base">
</div>

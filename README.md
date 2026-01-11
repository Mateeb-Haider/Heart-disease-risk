# Dil Sehat: Heart Disease Risk Assessment

A modern, high-precision web application for predicting heart disease risk using a Random Forest machine learning model.

## 🏗 Architecture
- **Backend**: FastAPI (Python) - Serves the ML model at `/predict`
- **Frontend**: React + Vite + Tailwind CSS - A premium "glassmorphism" UI
- **Model**: Scikit-learn Random Forest Classifier

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the API server:
   ```bash
   python server.py
   ```
   The backend will run on `http://localhost:8000`.

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:5173`.

## 🩺 Usage
1. Open `http://localhost:5173` in your browser.
2. Click **Start Assessment**.
3. Fill in the clinical data (Age, BP, Cholesterol, etc.).
4. Get an instant risk prediction with probability.

## 🛡 Privacy
All data processing happens locally or in your private deployment. No personal health information is stored.

## ⚠️ Disclaimer
This tool is for educational purposes only and does not conduct medical diagnosis. Consult a professional for advice.

---

## 📂 Backend Architecture Guide

This section explains the role of each file in the `backend/` directory and how data flows through the system.

### File Breakdown

#### 1. `train.py` (The "Teacher")
*   **Purpose**: Creates the brain of the application.
*   **What it does**:
    1.  Reads the raw data from `heart.csv`.
    2.  Preprocesses it (converts "Male"/"Female" to 1/0, etc.).
    3.  Trains the **Random Forest** machine learning model.
    4.  Saves the trained brain to `heart_model.pkl`.
*   **When to run**: Only when you generally want to re-train the model (e.g., if you have new data in `heart.csv`).

#### 2. `server.py` (The "Messenger")
*   **Purpose**: The bridge between the React Frontend and the Python Brain.
*   **What it does**:
    1.  Starts a web server using **FastAPI**.
    2.  Loads the saved `heart_model.pkl`.
    3.  Listens for requests at `http://localhost:8000/predict`.
    4.  Receives data from the frontend, gives it to the model, and sends the result back.
*   **When to run**: Always. This must be running for the app to work.

#### 3. `evaluate.py` (The "Grader")
*   **Purpose**: Checks how good the model is.
*   **What it does**:
    1.  Loads the model and the data.
    2.  Runs predictions on data the model hasn't seen.
    3.  Prints accuracy scores and reports.

#### 4. `heart.csv` (The "Textbook")
*   **Purpose**: The raw historical medical data used for training.

#### 5. `heart_model.pkl` (The "Brain")
*   **Purpose**: The saved, trained AI model file. `server.py` cannot work without this.

### 🔄 System Flow: What Happens When?

#### Phase 1: Training (One-time Setup)
1.  You run `python train.py`.
2.  Script reads `heart.csv`.
3.  Script learns patterns and creates `heart_model.pkl`.

#### Phase 2: Running the App (Runtime)
1.  You run `python server.py`.
2.  Server wakes up, loads `heart_model.pkl` into memory.
3.  Server waits at port 8000.

#### Phase 3: Making a Prediction (User Action)
1.  **User** fills out the form on the React Frontend (`localhost:5173`).
2.  **Frontend** sends a JSON message to **Backend** (`POST /predict`):
    ```json
    { "age": 45, "sex": "Male", "chol": 220, ... }
    ```
3.  **`server.py`** receives the message.
4.  **`server.py`** converts "Male" -> 1 (formats it for the model).
5.  **`heart_model.pkl`** (the brain) calculates the risk.
6.  **`server.py`** sends the answer back:
    ```json
    { "risk_detected": false, "probability": 12.5 }
    ```
7.  **Frontend** shows the "Low Risk" card to the user.

# ❤️ Heart Disease Prediction System

A professional machine learning web application for predicting heart disease risk using a trained Random Forest classifier. Built with Streamlit, this interactive tool provides instant cardiovascular risk assessments with a modern, medical-themed user interface.

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![Streamlit](https://img.shields.io/badge/Streamlit-1.28%2B-red)
![scikit--learn](https://img.shields.io/badge/scikit--learn-1.3%2B-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

- **Step-by-Step Wizard**: User-friendly 4-step form with progress indicator
- **Real-time Validation**: Input validation with helpful error messages
- **Medical-Grade UI**: Professional healthcare theme with calming colors
- **Instant Predictions**: Get risk assessment in under a second
- **Probability Scores**: See confidence levels for predictions
- **Input Summary**: Review all entered data before prediction
- **Privacy-First**: All processing happens locally, no data storage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Model Information](#model-information)
- [Input Parameters](#input-parameters)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher** ([Download Python](https://www.python.org/downloads/))
- **pip** (comes with Python)
- **Git** (optional, for cloning) ([Download Git](https://git-scm.com/downloads))

### Step 1: Clone or Download the Repository

**Option A: Using Git**

```bash
git clone https://github.com/Mateeb-Haider/Heart-disease-risk.git
cd heart-disease-prediction
```

**Option B: Download ZIP**

1. Download the project as a ZIP file
2. Extract to your desired location
3. Open terminal/command prompt in the project folder

### Step 2: Create a Virtual Environment (Recommended)

**On Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Required Packages

```bash
pip install streamlit pandas numpy scikit-learn pickle-mixin
```

Or `requirements.txt` is provided:

```bash
pip install -r requirements.txt
```

### Step 4: Verify Installation

Check if all packages are installed correctly:

```bash
python -c "import streamlit, pandas, numpy, sklearn; print('All packages installed successfully!')"
```

## 🎯 Usage

### Training the Model

If you need to train the model from scratch:

```bash
python train.py
```

This will:

- Load the heart disease dataset (`heart.csv`)
- Preprocess and encode categorical features
- Train a Random Forest classifier
- Save the trained model as `heart_model.pkl`

### Running the Web Application

Start the Streamlit app:

```bash
streamlit run app.py
```

The application will automatically open in your default browser at `http://localhost:8501`

### Using the Application

1. **Landing Page**: Click "Start Risk Assessment" to begin
2. **Step 1 - Basic Info**: Enter age and sex
3. **Step 2 - Cardiovascular Metrics**: Enter blood pressure, cholesterol, heart rate, and oldpeak
4. **Step 3 - Clinical Indicators**: Select chest pain type, ECG results, and other clinical parameters
5. **Step 4 - Review & Predict**: Review your inputs and click "Predict" to get results

### Stopping the Application

Press `Ctrl + C` in the terminal to stop the Streamlit server.

## 📁 Project Structure

```
heart-disease-prediction/
│
├── app.py                 # Main Streamlit application
├── train.py              # Model training script
├── evaluate.py           # Model evaluation script (optional)
├── styles.css            # Custom CSS for UI styling
├── heart.csv             # Heart disease dataset
├── heart_model.pkl       # Trained Random Forest model
├── README.md             # Project documentation
└── requirements.txt      # Python dependencies (optional)
```

## 🧠 Model Information

### Algorithm

- **Model Type**: Random Forest Classifier
- **Library**: scikit-learn
- **Purpose**: Binary classification (Heart Disease: Yes/No)

### Features Used

The model uses **15 features** after preprocessing:

**Numerical Features:**

- Age (1-120 years)
- Resting Blood Pressure (80-220 mm Hg)
- Serum Cholesterol (100-700 mg/dl)
- Maximum Heart Rate (60-230 bpm)
- ST Depression/Oldpeak (0.0-10.0)

**Categorical Features (One-Hot Encoded):**

- Sex (Male/Female)
- Chest Pain Type (TA, ATA, NAP, ASY)
- Resting ECG (Normal, ST, LVH)
- Fasting Blood Sugar > 120 mg/dl (Yes/No)
- Exercise Induced Angina (Yes/No)
- ST Slope (Up, Flat, Down)

### Training Process

```python
# Key steps in train.py
1. Load data from heart.csv
2. Encode Sex and ExerciseAngina as binary (M=1, F=0, Y=1, N=0)
3. One-hot encode ChestPainType, RestingECG, and ST_Slope
4. Split data: 80% training, 20% testing
5. Train RandomForestClassifier
6. Save model using pickle
```

## 📊 Input Parameters

| Parameter               | Type   | Range/Options     | Description                        |
| ----------------------- | ------ | ----------------- | ---------------------------------- |
| **Age**                 | Number | 1-120 years       | Patient's age                      |
| **Sex**                 | Select | Male, Female      | Biological sex                     |
| **Resting BP**          | Number | 80-220 mm Hg      | Blood pressure at rest             |
| **Cholesterol**         | Number | 100-700 mg/dl     | Serum cholesterol level            |
| **Max Heart Rate**      | Number | 60-230 bpm        | Maximum heart rate during exercise |
| **Oldpeak**             | Number | 0.0-10.0          | ST depression induced by exercise  |
| **Chest Pain**          | Select | TA, ATA, NAP, ASY | Type of chest pain                 |
| **Resting ECG**         | Select | Normal, ST, LVH   | ECG results at rest                |
| **Fasting Blood Sugar** | Select | Yes, No           | FBS > 120 mg/dl                    |
| **Exercise Angina**     | Select | Yes, No           | Chest pain during exercise         |
| **ST Slope**            | Select | Up, Flat, Down    | Slope of peak exercise ST segment  |

### Chest Pain Types:

- **TA**: Typical Angina
- **ATA**: Atypical Angina
- **NAP**: Non-Anginal Pain
- **ASY**: Asymptomatic

### Resting ECG:

- **Normal**: Normal ECG
- **ST**: ST-T wave abnormality
- **LVH**: Left Ventricular Hypertrophy

## 🖼️ Screenshots

### Landing Page

Professional landing page with features, statistics, and call-to-action.

### Step-by-Step Wizard

Guided input form with validation and progress indicator.

### Prediction Results

Color-coded risk assessment with probability and recommendations.

## 🛠️ Customization

### Changing Colors

Edit `styles.css` to customize the color scheme:

```css
:root {
  --primary: #0066cc; /* Primary blue */
  --success: #059669; /* Green for no risk */
  --danger: #dc2626; /* Red for risk detected */
}
```

### Modifying Validation Rules

Edit the `validate()` function in `app.py` to adjust input ranges.

## 🔧 Troubleshooting

### Issue: "Model file not found"

**Solution**: Run `python train.py` to generate `heart_model.pkl`

### Issue: "Module not found"

**Solution**: Ensure virtual environment is activated and run `pip install -r requirements.txt`

### Issue: Port 8501 already in use

**Solution**: Stop existing Streamlit instance or use: `streamlit run app.py --server.port 8502`

### Issue: Blank page or CSS not loading

**Solution**: Clear browser cache and refresh, or restart Streamlit server

## 📚 Dependencies

```txt
streamlit>=1.28.0
pandas>=1.5.0
numpy>=1.23.0
scikit-learn>=1.3.0
```

## ⚠️ Medical Disclaimer

**IMPORTANT**: This tool is designed for **educational and informational purposes only**. It should NOT be used as a substitute for professional medical advice, diagnosis, or treatment.

- Always consult qualified healthcare professionals for medical guidance
- Do not ignore professional medical advice based on this tool
- This is a machine learning model and may have limitations
- Seek immediate medical attention if you have symptoms

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contribution:

- Add model performance metrics visualization
- Implement SHAP or LIME for model explainability
- Add data export functionality
- Create unit tests
- Improve UI/UX
- Add multi-language support

## 👨‍💻 Author

**Your Name**

- GitHub: [@mateeb-haider](https://github.com/mateeb-haider)
- Email: muteebhdr@gmail.com

## 🙏 Acknowledgments
- Icons: Emoji icons for better visual appeal
- Framework: Built with [Streamlit](https://streamlit.io/)
- ML Library: [scikit-learn](https://scikit-learn.org/)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#troubleshooting) section
2. Search existing [GitHub Issues](https://github.com/Mateeb-Haider/Heart-disease-risk/issues)
3. Open a new issue with detailed description
4. Contact via email for urgent matters

---

**Made with ❤️ for better heart health awareness**

⭐ If you find this project helpful, please consider giving it a star!

import streamlit as st
import numpy as np
import pickle
import pandas as pd
from pathlib import Path


st.set_page_config(
    page_title="CardioPredict | Heart Disease Risk",
    page_icon="❤️",
    layout="wide",
    initial_sidebar_state="collapsed"
)


def load_css() -> None:
    """Inject external stylesheet if present."""
    css_path = Path("styles.css")
    if css_path.exists():
        st.markdown(f"<style>{css_path.read_text()}</style>", unsafe_allow_html=True)


@st.cache_resource(show_spinner=False)
def load_model():
    path = Path("heart_model.pkl")
    if not path.exists():
        return None
    with open(path, "rb") as f:
        return pickle.load(f)


model = load_model()
load_css()

if "page" not in st.session_state:
    st.session_state.page = "landing"
if "wizard_step" not in st.session_state:
    st.session_state.wizard_step = 1
if "form_inputs" not in st.session_state:
    st.session_state.form_inputs = {
        "age": 45,
        "sex": "Male",
        "trestbps": 120,
        "chol": 200,
        "thalach": 150,
        "oldpeak": 1.0,
        "cp": "ATA",
        "restecg": "Normal",
        "fbs": "No",
        "exang": "No",
        "slope": "Up",
    }


def hero_section():
    st.markdown(
        """
        <div class="hero">
            <div class="badge">CardioPredict AI</div>
            <h1 class="hero-title">Predict Heart Disease Risk with Confidence</h1>
            <p class="hero-subtitle">Lightweight, fast, and privacy-first risk assessment powered by a trained Random Forest model. Understand your cardiovascular profile in seconds.</p>
            <div class="hero-actions">
                <button class="btn-primary pulse" onclick="window.dispatchEvent(new Event('start-assessment'))">Start Assessment</button>
                <button class="btn-secondary" onclick="window.dispatchEvent(new Event('learn-more'))">Learn More</button>
            </div>
            <div class="hero-meta">
                <span>⚡ Instant predictions</span>
                <span>🔒 No data storage</span>
                <span>🩺 Clinically aligned features</span>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def features_section():
    st.markdown("<h2 class='section-heading'>Why choose CardioPredict?</h2>", unsafe_allow_html=True)
    st.markdown(
        "<p class='section-subheading'>Designed for clarity, speed, and trust. Built with a modern medical aesthetic.</p>",
        unsafe_allow_html=True,
    )
    cols = st.columns(3)
    items = [
        ("🎯", "High Accuracy", "Random Forest model trained on validated heart health data."),
        ("⚡", "Instant Results", "Predictions in under a second with optimized preprocessing."),
        ("🔒", "Privacy First", "Inputs stay on-device; nothing is stored or shared."),
        ("🧠", "Explainable Inputs", "Clear parameters: ECG, cholesterol, angina, slope, and more."),
        ("📈", "Balanced Insights", "Probabilities plus actionable wellness guidance."),
        ("📱", "Responsive UI", "Smooth experience on desktop, tablet, and mobile."),
    ]
    for col, item in zip(cols * 2, items):
        icon, title, text = item
        with col:
            st.markdown(
                f"""
                <div class="feature-card fade-in">
                    <div class="feature-icon">{icon}</div>
                    <div class="feature-title">{title}</div>
                    <div class="feature-text">{text}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )


def stats_section():
    st.markdown("<h2 class='section-heading'>Heart health at a glance</h2>", unsafe_allow_html=True)
    st.markdown(
        "<p class='section-subheading'>Awareness and early screening can prevent most cardiovascular events.</p>",
        unsafe_allow_html=True,
    )
    cols = st.columns(3)
    stats = [
        ("17.9M", "Annual global deaths from CVD"),
        ("80%", "Cases considered preventable"),
        ("< 60s", "Typical time to receive a prediction"),
    ]
    for col, (value, label) in zip(cols, stats):
        with col:
            st.markdown(
                f"""
                <div class="stat-card fade-in">
                    <div class="stat-value">{value}</div>
                    <div class="stat-label">{label}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )


def steps_section():
    st.markdown("<h2 class='section-heading'>How it works</h2>", unsafe_allow_html=True)
    steps = [
        ("1", "Enter your metrics", "Age, cholesterol, ECG, angina, blood pressure, and more."),
        ("2", "Model analyzes", "Features are encoded to mirror training-time preprocessing."),
        ("3", "Get your result", "See risk classification and probability instantly."),
        ("4", "Act smart", "Use guidance to consult clinicians and adjust lifestyle."),
    ]
    for number, title, text in steps:
        st.markdown(
            f"""
            <div class="step-card fade-in">
                <div class="step-number">{number}</div>
                <div>
                    <div class="step-title">{title}</div>
                    <div class="step-text">{text}</div>
                </div>
            </div>
            """,
            unsafe_allow_html=True,
        )


def disclaimer():
    st.markdown(
        """
        <div class="disclaimer fade-in">
            ⚠️ This tool is for informational purposes only and does not provide medical diagnosis. Please consult qualified healthcare professionals for personalized medical advice.
        </div>
        """,
        unsafe_allow_html=True,
    )


def render_landing_page():
    # Landing sections wrapped in centered container
    hero_section()
    st.markdown("<div class='spacer'></div>", unsafe_allow_html=True)
    features_section()
    st.markdown("<div class='spacer'></div>", unsafe_allow_html=True)
    stats_section()
    st.markdown("<div class='spacer'></div>", unsafe_allow_html=True)
    steps_section()
    st.markdown("<div class='cta-card fade-in'>Ready to explore your heart health?", unsafe_allow_html=True)
    # Center CTA button
    cta_left, cta_center, cta_right = st.columns([1, 2, 1])
    with cta_center:
        if st.button("🩺 Start Risk Assessment", use_container_width=True):
            st.session_state.page = "prediction"
            st.rerun()
    disclaimer()
    st.markdown("<div class='footer'>© 2026 CardioPredict AI · Built for clarity and speed.</div>", unsafe_allow_html=True)


def render_prediction_page():
    # Nav
    st.markdown("<div class='pill-nav'>", unsafe_allow_html=True)
    col_back, col_title = st.columns([1, 3])
    with col_back:
        if st.button("← Home", use_container_width=True):
            st.session_state.page = "landing"
            st.rerun()
    with col_title:
        st.markdown("<h2 style='margin:0; text-align:center'>Heart Disease Risk Assessment</h2>", unsafe_allow_html=True)
    st.markdown("</div>", unsafe_allow_html=True)

    if model is None:
        st.error("Model file not found. Please ensure heart_model.pkl is present.")
        return

    # Stepper
    st.markdown(
        f"""
        <div class="wizard-steps">
            <div class="wizard-step {('active' if st.session_state.wizard_step==1 else ('completed' if st.session_state.wizard_step>1 else ''))}">1. Basic</div>
            <div class="wizard-step {('active' if st.session_state.wizard_step==2 else ('completed' if st.session_state.wizard_step>2 else ''))}">2. Metrics</div>
            <div class="wizard-step {('active' if st.session_state.wizard_step==3 else ('completed' if st.session_state.wizard_step>3 else ''))}">3. Clinical</div>
            <div class="wizard-step {('active' if st.session_state.wizard_step==4 else '')}">4. Review</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    def validate(step_inputs):
        issues = []
        a = step_inputs.get("age")
        if a is None or a < 1 or a > 120:
            issues.append("Age must be between 1 and 120 years")
        bp = step_inputs.get("trestbps")
        if bp is None or bp < 80 or bp > 220:
            issues.append("Resting BP must be 80–220 mm Hg")
        ch = step_inputs.get("chol")
        if ch is None or ch < 100 or ch > 700:
            issues.append("Cholesterol must be 100–700 mg/dl")
        hr = step_inputs.get("thalach")
        if hr is None or hr < 60 or hr > 230:
            issues.append("Max Heart Rate must be 60–230 bpm")
        op = step_inputs.get("oldpeak")
        if op is None or op < 0 or op > 10:
            issues.append("Oldpeak must be 0.0–10.0")
        # Required selects
        for k in ["sex", "cp", "restecg", "fbs", "exang", "slope"]:
            if step_inputs.get(k) in [None, ""]:
                issues.append(f"Please provide: {k}")
        return issues

    # Step 1: Basic
    if st.session_state.wizard_step == 1:
        with st.form("step1", clear_on_submit=False):
            st.markdown("<div class='section-title'>Basic Info</div>", unsafe_allow_html=True)
            c1, c2 = st.columns(2)
            with c1:
                age = st.number_input("Age (years)", min_value=0, max_value=500, value=st.session_state.form_inputs["age"], step=1, help="Required")
            with c2:
                sex = st.selectbox("Sex", ["Male", "Female"], index=0 if st.session_state.form_inputs["sex"]=="Male" else 1, help="Required")
            prev, nxt = st.columns(2)
            back = prev.form_submit_button("Back")
            next1 = nxt.form_submit_button("Next")
            if next1:
                st.session_state.form_inputs.update({"age": age, "sex": sex})
                issues = validate(st.session_state.form_inputs)
                issues = [m for m in issues if not m.startswith("Resting BP") and not m.startswith("Cholesterol") and not m.startswith("Max Heart Rate") and not m.startswith("Oldpeak")]
                if issues:
                    st.error("Please fix the following:")
                    for m in issues:
                        st.markdown(f"- {m}")
                else:
                    st.session_state.wizard_step = 2
                    st.rerun()
            if back:
                st.session_state.page = "landing"
                st.rerun()

    # Step 2: Metrics
    if st.session_state.wizard_step == 2:
        with st.form("step2", clear_on_submit=False):
            st.markdown("<div class='section-title'>Cardiovascular Metrics</div>", unsafe_allow_html=True)
            c1, c2 = st.columns(2)
            with c1:
                trestbps = st.number_input("Resting Blood Pressure (mm Hg)", min_value=0, max_value=400, value=st.session_state.form_inputs["trestbps"], step=1, help="Required (80–220)")
                thalach = st.number_input("Max Heart Rate (bpm)", min_value=0, max_value=400, value=st.session_state.form_inputs["thalach"], step=1, help="Required (60–230)")
            with c2:
                chol = st.number_input("Cholesterol (mg/dl)", min_value=0, max_value=1200, value=st.session_state.form_inputs["chol"], step=1, help="Required (100–700)")
                oldpeak = st.number_input("ST Depression (Oldpeak)", min_value=-10.0, max_value=50.0, value=float(st.session_state.form_inputs["oldpeak"]), step=0.1, help="Required (0.0–10.0)")
            prev, nxt = st.columns(2)
            back = prev.form_submit_button("Back")
            next2 = nxt.form_submit_button("Next")
            if next2:
                st.session_state.form_inputs.update({"trestbps": trestbps, "chol": chol, "thalach": thalach, "oldpeak": oldpeak})
                issues = validate(st.session_state.form_inputs)
                # Show only metrics-related issues here
                issues = [m for m in issues if m.startswith("Resting BP") or m.startswith("Cholesterol") or m.startswith("Max Heart Rate") or m.startswith("Oldpeak")]
                if issues:
                    st.error("Please fix the following:")
                    for m in issues:
                        st.markdown(f"- {m}")
                else:
                    st.session_state.wizard_step = 3
                    st.rerun()
            if back:
                st.session_state.wizard_step = 1
                st.rerun()

    # Step 3: Clinical
    if st.session_state.wizard_step == 3:
        with st.form("step3", clear_on_submit=False):
            st.markdown("<div class='section-title'>Clinical Indicators</div>", unsafe_allow_html=True)
            c1, c2, c3 = st.columns(3)
            with c1:
                cp = st.selectbox("Chest Pain Type", ["TA", "ATA", "NAP", "ASY"], index=["TA","ATA","NAP","ASY"].index(st.session_state.form_inputs["cp"]), help="Required")
                restecg = st.selectbox("Resting ECG", ["Normal", "ST", "LVH"], index=["Normal","ST","LVH"].index(st.session_state.form_inputs["restecg"]), help="Required")
            with c2:
                fbs = st.selectbox("Fasting Blood Sugar > 120 mg/dl", ["No", "Yes"], index=["No","Yes"].index(st.session_state.form_inputs["fbs"]), help="Required")
                exang = st.selectbox("Exercise Induced Angina", ["No", "Yes"], index=["No","Yes"].index(st.session_state.form_inputs["exang"]), help="Required")
            with c3:
                slope = st.selectbox("ST Slope", ["Up", "Flat", "Down"], index=["Up","Flat","Down"].index(st.session_state.form_inputs["slope"]), help="Required")
            prev, nxt = st.columns(2)
            back = prev.form_submit_button("Back")
            next3 = nxt.form_submit_button("Next")
            if next3:
                st.session_state.form_inputs.update({"cp": cp, "restecg": restecg, "fbs": fbs, "exang": exang, "slope": slope})
                issues = validate(st.session_state.form_inputs)
                # Show only clinical-related issues here
                issues = [m for m in issues if m.startswith("Please provide")]
                if issues:
                    st.error("Please add required fields:")
                    for m in issues:
                        st.markdown(f"- {m}")
                else:
                    st.session_state.wizard_step = 4
                    st.rerun()
            if back:
                st.session_state.wizard_step = 2
                st.rerun()

    # Step 4: Review + Predict
    if st.session_state.wizard_step == 4:
        inputs = st.session_state.form_inputs
        summary = {
            "Age": inputs["age"],
            "Sex": inputs["sex"],
            "Resting BP (mm Hg)": inputs["trestbps"],
            "Cholesterol (mg/dl)": inputs["chol"],
            "Max Heart Rate (bpm)": inputs["thalach"],
            "Oldpeak": inputs["oldpeak"],
            "Chest Pain": inputs["cp"],
            "Resting ECG": inputs["restecg"],
            "Fasting Blood Sugar": inputs["fbs"],
            "Exercise Angina": inputs["exang"],
            "ST Slope": inputs["slope"],
        }
        st.markdown("<div class='card fade-in'>", unsafe_allow_html=True)
        st.markdown("<div class='section-title'>Review Your Inputs</div>", unsafe_allow_html=True)
        st.table(pd.DataFrame(summary, index=["Value"]).T)
        st.markdown("</div>", unsafe_allow_html=True)

        col_prev, col_predict = st.columns([1, 2])
        if col_prev.button("Back", use_container_width=True):
            st.session_state.wizard_step = 3
            st.rerun()
        if col_predict.button("Predict", use_container_width=True):
            # Final validation
            issues = validate(inputs)
            if issues:
                st.error("Please fix the following before prediction:")
                for m in issues:
                    st.markdown(f"- {m}")
                return

            sex_num = 1 if inputs["sex"] == "Male" else 0
            fbs_num = 1 if inputs["fbs"] == "Yes" else 0
            exang_num = 1 if inputs["exang"] == "Yes" else 0
            cp_ATA = 1 if inputs["cp"] == "ATA" else 0
            cp_NAP = 1 if inputs["cp"] == "NAP" else 0
            cp_ASY = 1 if inputs["cp"] == "ASY" else 0
            restecg_ST = 1 if inputs["restecg"] == "ST" else 0
            restecg_LVH = 1 if inputs["restecg"] == "LVH" else 0
            slope_Flat = 1 if inputs["slope"] == "Flat" else 0
            slope_Down = 1 if inputs["slope"] == "Down" else 0

            input_data = np.array([[
                inputs["age"], sex_num, inputs["trestbps"], inputs["chol"], fbs_num,
                inputs["thalach"], exang_num, inputs["oldpeak"],
                cp_ATA, cp_NAP, cp_ASY,
                restecg_ST, restecg_LVH,
                slope_Flat, slope_Down
            ]])

            with st.spinner("Analyzing your metrics..."):
                prediction = int(model.predict(input_data)[0])
                probability = None
                if hasattr(model, "predict_proba"):
                    probability = float(model.predict_proba(input_data)[0][1] * 100)
            prob_text = f"Estimated probability: {probability:.2f}%" if probability is not None else "Probability unavailable for this model"

            if prediction == 1:
                st.markdown(
                    f"""
                    <div class="result-card risk fade-in">
                        <div class="result-icon">⚠️</div>
                        <div>
                            <div class="result-title">High Risk Detected</div>
                            <div class="result-text">{prob_text}</div>
                            <ul class="result-list">
                                <li>Consult a cardiologist for clinical evaluation.</li>
                                <li>Consider stress testing and lipid profiling.</li>
                                <li>Adopt heart-healthy lifestyle: nutrition, activity, sleep.</li>
                            </ul>
                        </div>
                    </div>
                    """,
                    unsafe_allow_html=True,
                )
            else:
                st.markdown(
                    f"""
                    <div class="result-card safe fade-in">
                        <div class="result-icon">✅</div>
                        <div>
                            <div class="result-title">No Immediate Risk Detected</div>
                            <div class="result-text">{prob_text}</div>
                            <ul class="result-list">
                                <li>Maintain regular health check-ups.</li>
                                <li>Keep balanced diet and consistent activity.</li>
                                <li>Monitor blood pressure and lipid levels.</li>
                            </ul>
                        </div>
                    </div>
                    """,
                    unsafe_allow_html=True,
                )

            disclaimer()


if st.session_state.page == "landing":
    render_landing_page()
else:
    render_prediction_page()

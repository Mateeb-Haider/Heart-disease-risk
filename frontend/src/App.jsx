import React, { useState } from 'react';
import {
  HeartPulse,
  Activity,
  ShieldCheck,
  UserRound,
  Smartphone,
  LineChart,
  Check,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  Stethoscope
} from 'lucide-react';
import ChatBot from './components/ChatBot';

// --- Components ---

const Hero = ({ onStart, onShowParams }) => (
  <div className="relative overflow-hidden mb-16 pt-10 px-4">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 shadow-sm ring-1 ring-blue-700/10 hover:bg-blue-600/20 transition-all cursor-default">
        <HeartPulse size={16} />
        <span>Dil Sehat AI</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
        Apka Dil, Hamari Zimadari <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-500">
          (Predict Heart Risk)
        </span>
      </h1>
      <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
        Advanced machine learning assessment for cardiovascular health.
        Fast, private, and clinically aligned using Random Forest technology.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-300"
        >
          Start Assessment
        </button>
        <button
          onClick={onShowParams}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300"
        >
          Normal Health Parameters
        </button>
      </div>
    </div>
  </div>
);

const Stats = () => (
  <div className="max-w-5xl mx-auto mb-20 px-4">
    <div className="glass-card grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 p-6">
      {[
        { val: "17.9M", label: "Lives impacted annually" },
        { val: "92%", label: "Model Accuracy" },
        { val: "<1s", label: "Processing Time" }
      ].map((stat, i) => (
        <div key={i} className="text-center py-4">
          <div className="text-4xl font-extrabold text-blue-600 mb-1">{stat.val}</div>
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const Features = () => {
  const features = [
    { icon: <Activity />, title: "High Accuracy", desc: "Trained on thousands of clinical records using robust Random Forest algorithms." },
    { icon: <Smartphone />, title: "Instant Analysis", desc: "Real-time processing. Get your full risk profile in under a second." },
    { icon: <ShieldCheck />, title: "Privacy First", desc: "All calculations happen locally. Your health data never leaves your device." },
    { icon: <UserRound />, title: "Clinically Relevant", desc: "Uses 11 key metrics like Angina, ST Slope, and Cholesterol levels." },
    { icon: <LineChart />, title: "Actionable Insights", desc: "Don't just get a number; understand what factors contribute to your risk." }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 mb-20">
      <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">Why Trusted by Professionals</h2>
      <p className="text-slate-500 text-center mb-12 max-w-2xl mx-auto">Built on validated datasets with focus on speed and privacy.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              {f.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Disclaimer = () => (
  <div className="max-w-4xl mx-auto px-4 mt-12 mb-8">
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex gap-4">
      <AlertTriangle className="text-amber-600 shrink-0" />
      <p className="text-sm text-amber-900 font-medium">
        Medical Disclaimer: This application is for educational and informational purposes only.
        It is not intended to provide medical advice, diagnosis, or treatment.
        Always consult with a qualified healthcare professional.
      </p>
    </div>
  </div>
);

// --- Wizard Form ---

const StepIndicator = ({ current }) => (
  <div className="flex justify-center mb-12">
    <div className="flex items-center gap-4">
      {["Basic Info", "Metrics", "Clinical", "Review"].map((step, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === current;
        const isCompleted = stepNum < current;

        return (
          <div key={idx} className="flex flex-col items-center relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 transition-all duration-300 z-10
                ${isActive
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                  : isCompleted
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
            >
              {isCompleted ? <Check size={18} /> : stepNum}
            </div>
            <span className={`text-xs font-semibold uppercase tracking-wide ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>
              {step}
            </span>
            {/* Connector Line */}
            {idx < 3 && (
              <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-0 ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'} origin-left transition-colors duration-500`} style={{ width: 'calc(100% + 1rem + 30px)' }}></div>
            )}
          </div>
        );
      })}
    </div>
  </div>
);

// Inputs
const InputGroup = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-bold text-slate-700">{label}</label>
    {children}
  </div>
);

const NumberInput = ({ value, onChange, ...props }) => (
  <input
    type="number"
    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all font-medium text-slate-800"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...props}
  />
);

const SelectInput = ({ value, onChange, options }) => (
  <div className="relative">
    <select
      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all appearance-none font-medium text-slate-800 bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
      <ChevronRight className="rotate-90" size={16} />
    </div>
  </div>
);

// --- Main App Logic ---

function App() {
  const [view, setView] = useState('landing'); // landing, wizard
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    age: 45, sex: "Male",
    trestbps: 120, chol: 200, thalach: 150, oldpeak: 1.0,
    cp: "ATA", restecg: "Normal", fbs: "No", exang: "No", slope: "Up"
  });

  const handleChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const submitPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Error connecting to server. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  const Wizard = () => (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <button
        onClick={() => { setView('landing'); setStep(1); setResult(null); }}
        className="mb-8 flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm"
      >
        <ChevronLeft size={16} className="mr-1" /> Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>

        {!result ? (
          <>
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Clinical Assessment</h2>
            <p className="text-center text-slate-500 mb-8">Please provide accurate details for the best result.</p>

            <StepIndicator current={step} />

            <div className="space-y-6 relative z-10">
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  <InputGroup label="Age (years)">
                    <NumberInput value={formData.age} onChange={(v) => handleChange('age', parseInt(v))} />
                  </InputGroup>
                  <InputGroup label="Sex">
                    <SelectInput value={formData.sex} onChange={(v) => handleChange('sex', v)} options={["Male", "Female"]} />
                  </InputGroup>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  <InputGroup label="Resting BP (mm Hg)">
                    <NumberInput value={formData.trestbps} onChange={(v) => handleChange('trestbps', parseInt(v))} />
                  </InputGroup>
                  <InputGroup label="Cholesterol (mg/dl)">
                    <NumberInput value={formData.chol} onChange={(v) => handleChange('chol', parseInt(v))} />
                  </InputGroup>
                  <InputGroup label="Max Heart Rate">
                    <NumberInput value={formData.thalach} onChange={(v) => handleChange('thalach', parseInt(v))} />
                  </InputGroup>
                  <InputGroup label="Oldpeak (ST Depression)">
                    <NumberInput value={formData.oldpeak} onChange={(v) => handleChange('oldpeak', parseFloat(v))} step="0.1" />
                  </InputGroup>
                </div>
              )}

              {step === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  <InputGroup label="Chest Pain Type">
                    <SelectInput value={formData.cp} onChange={(v) => handleChange('cp', v)} options={["TA", "ATA", "NAP", "ASY"]} />
                  </InputGroup>
                  <InputGroup label="Resting ECG">
                    <SelectInput value={formData.restecg} onChange={(v) => handleChange('restecg', v)} options={["Normal", "ST", "LVH"]} />
                  </InputGroup>
                  <InputGroup label="Fasting BS > 120">
                    <SelectInput value={formData.fbs} onChange={(v) => handleChange('fbs', v)} options={["No", "Yes"]} />
                  </InputGroup>
                  <InputGroup label="Exercise Angina">
                    <SelectInput value={formData.exang} onChange={(v) => handleChange('exang', v)} options={["No", "Yes"]} />
                  </InputGroup>
                  <InputGroup label="ST Slope">
                    <SelectInput value={formData.slope} onChange={(v) => handleChange('slope', v)} options={["Up", "Flat", "Down"]} />
                  </InputGroup>
                </div>
              )}

               {step === 4 && (
                <div className="space-y-6 animate-fade-in text-center">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-slate-800 mb-4">Summary</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-left">
                       <div><span className="text-slate-500 block">Age/Sex:</span> <span className="font-semibold">{formData.age} / {formData.sex}</span></div>
                       <div><span className="text-slate-500 block">Resting BP:</span> <span className="font-semibold">{formData.trestbps}</span></div>
                       <div><span className="text-slate-500 block">Cholesterol:</span> <span className="font-semibold">{formData.chol}</span></div>
                       <div><span className="text-slate-500 block">Max HR:</span> <span className="font-semibold">{formData.thalach}</span></div>
                    </div>
                  </div>
                  <button
                    onClick={submitPrediction}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white rounded-xl py-4 font-bold text-lg shadow-lg hover:bg-blue-700 hover:shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                     {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Analyzing...
                        </>
                     ) : (
                        <>Predict Risk <ChevronRight /></>
                     )}
                  </button>
                </div>
              )}

              {/* Navigation */}
              {step < 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                  {step > 1 ? (
                    <button onClick={() => setStep(s => s - 1)} className="text-slate-500 hover:text-slate-800 font-semibold px-4 py-2">
                       Back
                    </button>
                  ) : <div></div>}
                  <button
                    onClick={() => setStep(s => s + 1)}
                    className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2"
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="animate-fade-in text-center py-6">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl
              ${result.risk_detected ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
              <Stethoscope size={48} />
            </div>
            <h2 className={`text-3xl font-extrabold mb-2 ${result.risk_detected ? 'text-red-700' : 'text-emerald-700'}`}>
              {result.risk_detected ? "High Risk Detected" : "Low Risk Profile"}
            </h2>
             <div className="text-lg font-semibold text-slate-600 mb-6">
               Probability: <span className="text-slate-900">{result.probability.toFixed(1)}%</span>
            </div>

            <p className="text-slate-600 leading-relaxed mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100">
              {result.risk_detected
                ? "The model indicates a significant likelihood of heart disease presence. We strongly recommend consulting a cardiologist for clinical evaluation."
                : "The model indicates a low likelihood of heart disease presence based on the provided metrics. Maintain a healthy lifestyle."}
            </p>

            <button
              onClick={() => { setStep(1); setResult(null); }}
              className="bg-white text-slate-800 border-2 border-slate-200 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              Start New Assessment
            </button>
          </div>
        )}
      </div>
      <Disclaimer />
    </div>
  );

  const NormalParams = () => (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <button
        onClick={() => setView('landing')}
        className="mb-8 flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm"
      >
        <ChevronLeft size={16} className="mr-1" /> Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>

        <h2 className="text-2xl font-extrabold text-slate-900 mb-3 text-center">Normal Health Parameters</h2>
        <p className="text-slate-600 text-center mb-8">General reference ranges for a healthy adult. Individual targets may vary—consult your clinician.</p>

        <ul className="space-y-4">
          {[
            { label: 'Blood Pressure (resting)', value: 'Around 120/80 mm Hg' },
            { label: 'Resting BP (trestbps)', value: '90–120 mm Hg' },
            { label: 'Total Cholesterol (chol)', value: '< 200 mg/dL' },
            { label: 'Fasting Blood Sugar (fbs)', value: '< 100 mg/dL (No if > 120)' },
            { label: 'Max Heart Rate (thalach)', value: '≈ 220 − age (bpm)' },
            { label: 'ST Depression (oldpeak)', value: '0.0 to 1.0' },
            { label: 'Chest Pain (cp)', value: 'No typical angina during exercise' },
            { label: 'Resting ECG (restecg)', value: 'Normal' },
            { label: 'Exercise Angina (exang)', value: 'No' },
            { label: 'ST Slope (slope)', value: 'Up' },
          ].map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Check size={16} />
              </div>
              <div>
                <div className="font-semibold text-slate-800">{item.label}</div>
                <div className="text-slate-600 text-sm">{item.value}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setView('landing')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
      <Disclaimer />
    </div>
  );

  const AboutUs = () => (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <button
        onClick={() => setView('landing')}
        className="mb-8 flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium text-sm"
      >
        <ChevronLeft size={16} className="mr-1" /> Back to Home
      </button>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 shadow-sm ring-1 ring-blue-700/10">
            <HeartPulse size={16} /> About Dil Sehat AI
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">About Us</h2>
          <p className="text-slate-600 mt-2">Built with care to empower people with accessible heart health insights.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Institution & Guidance</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              This project was developed at the <span className="font-semibold text-slate-800">University of South Asia</span>, under the guidance of
              <span className="font-semibold text-slate-800"> Miss Zobia Zafar (HOD)</span> and
              <span className="font-semibold text-slate-800"> Miss Andleeb</span>, Instructor of Data Science.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Why This Project?</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Cardiovascular diseases are a leading cause of mortality. Early assessment and awareness can guide timely lifestyle changes and clinical consultation.
              Dil Sehat AI provides quick, privacy-friendly risk evaluation using clinically relevant metrics.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">How It Helps</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2"><ShieldCheck className="text-emerald-600" size={16}/> Instant, informative feedback on key heart health indicators.</li>
              <li className="flex items-start gap-2"><ShieldCheck className="text-emerald-600" size={16}/> Encourages proactive checkups and lifestyle improvements.</li>
              <li className="flex items-start gap-2"><ShieldCheck className="text-emerald-600" size={16}/> Simple to use—no medical background required.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-2">Technology</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              The app uses a Random Forest model and a modern React frontend styled with Tailwind CSS, focusing on speed, clarity, and accessibility.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setView('wizard')}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all"
          >
            Start Assessment
          </button>
        </div>
      </div>
      <Disclaimer />
    </div>
  );

  return (
    <div className="min-h-screen pb-10">
      <ChatBot />
      <nav className="border-b border-white/50 backdrop-blur-md sticky top-0 z-50 bg-white/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-xl text-slate-800 tracking-tight">
            <HeartPulse className="text-green-600" /> Dil Sehat
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setView('about')} className="text-sm font-semibold text-slate-500 hover:text-blue-600">About Us</button>
            {view !== 'landing' && (
              <button onClick={() => setView('landing')} className="text-sm font-semibold text-slate-500 hover:text-blue-600">Home</button>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-12">
        {view === 'landing' ? (
           <>
            <Hero onStart={() => setView('wizard')} onShowParams={() => setView('params')} />
            <Stats />
            <Features />
            <Disclaimer />
            <footer className="text-center text-slate-400 text-sm py-10 border-t border-slate-200 mt-20">
              © 2026 Dil Sehat AI · Pakistan's Trusted Health AI
            </footer>
           </>
        ) : view === 'wizard' ? (
          <Wizard />
        ) : view === 'params' ? (
          <NormalParams />
        ) : (
          <AboutUs />
        )}
      </main>
    </div>
  );
}

export default App;

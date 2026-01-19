import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const KNOWLEDGE_BASE = {
  age: "Age (Umar/Ayera). Enter your age in years. \nUrdu: Apni umar likhein (Jaisay 45).",
  "resting bp":
    "Resting BP (Araam ke waqt ka Blood Pressure). Normal is 120/80.\nUrdu: Ye apka aam BP hai. Agar upar wala number 130 se ziada ho to khatra hai.",
  bp: "Blood Pressure (Khoon ka Dabao). Normal: 120. High Risk: 140+.\nUrdu: BP check karein. Agar 130 ya 140 se ziada hai to 'High' hai.",
  "heart rate":
    "Heart Rate (Dil ki Dharkan). Normal is 60-100 beats per minute.\nUrdu: Ek minute mein dil kitni baar dharkta hai? (Aam tor par 72).",
  "max heart rate":
    "Max Heart Rate (Ziada se ziada dharkan). Usual formula: 220 - Age. Low max HR during exercise can be risky.\nUrdu: Warzish ke doran dil ki raftaar kahan tak jati hai? 150 ya 170 tak hona chahiye.",
  "chest pain":
    "Chest Pain Types (Seenay ka dard):\n1. TA: Typical Angina (Mehnat se dard).\n2. ATA: Atypical Angina (Dard jo dil jaisa na lagay).\n3. NAP: Non-Anginal (Gais ya maiday ka dard).\n4. ASY: Asymptomatic (Koi dard nahi - Khamosh Khatra/Silent Killer).",
  "chest pain type":
    "Select Pain Type (Dard ki qisam chunein):\nTA: Exertional pain (Kaam se dard).\nATA: Unusual pain.\nNAP: Unrelated to heart (Jaisay pathon ka dard).\nASY: Silent (Dard nahi hota magar masla hai).",
  "resting ecg":
    "Resting ECG (Dil ki report).\nNormal: All good (Sab theek).\nST: Wave abnormality (Lehron mein masla).\nLVH: Thick heart wall (Dil ke pathay motay hain - High BP se hota hai).",
  "fasting bs":
    "Fasting Blood Sugar (Naashta se pehlay sugar).\nIf > 120 mg/dl: Diabetes Risk (Sugar ka marz).\nUrdu: Agar khaali pait sugar 120 se ziada hai to 'Yes' in choice.",
  "exercise angina":
    "Exercise Angina (Warzish se dard).\nDo you get chest pain when you walk fast or run?\nUrdu: Kia tez chalne ya bhaagne par seenay mein dard hota hai? (Yes/No).",
  "st slope":
    "ST Slope (ECG ki dhalwaan).\nUp: Normal (Aam halat).\nFlat/Down: Signs of blocked arteries (Ragon mein rukawat ke asaar).",
  cholesterol:
    "Cholesterol (Khoon mein Charbi).\nNormal: < 200 mg/dL.\nHigh: > 240 mg/dL.\nUrdu: Agar 200 se ziada hai to khatra hai. Ye ragon ko band karta hai.",
  trestbps:
    "Resting BP (Khoon ka dabao). See 'Resting BP'.\nUrdu: Upar wala number likhein (Systolic).",
  angina:
    "Angina (Dil ka dard). Pain caused by reduced blood flow.\nUrdu: Jab dil ko khoon kam milta hai to dard hota hai.",
  fbs: "Fasting Blood Sugar. See 'Fasting BS'.\nUrdu: Khaali pait sugar check karein.",
  cp: "Chest Pain Type. See 'Chest Pain'.\nUrdu: Dard ki qisam batayen (TA, ATA, NAP, ASY).",
  ecg: "Resting ECG. See 'Resting ECG'.\nUrdu: Dil ki bijli ki report.",
  restecg: "Resting ECG. See 'Resting ECG'.",
  slope:
    "ST Slope. See 'ST Slope'.\nUrdu: ECG wave ki shakal (Up, Flat, Down).",
  thalach: "Max Heart Rate. See 'Max Heart Rate'.",
  oldpeak:
    "Oldpeak (ST Depression).\nValue: 0 to 6.\nUrdu: Ye number ECG se milta hai. Agar 1.5 ya 2 se ziada ho to dil par boojh hai.",
  symptoms:
    "Symptoms (Alamaat):\n- Chest pain (Seenay mein dard)\n- Shortness of breath (Saans phoolna)\n- Palpitations (Dil ghabrana)",
  prevention:
    "Prevention (Bachao):\n1. Eat less oil/salt (Kam tail aur namak).\n2. Walk daily (Rozana paidal chalein).\n3. Stop smoking (Tambaku noshi chhor dein).",
  diet: "Diet (Khoraak):\nEat: Fruits, Veggies, Fish (Phal, Sabzi).\nAvoid: Fast food, Sweets, Red meat (Bara gosht, Meetha kam karein).",
  risk: "Risk Factors (Khatra):\nHigh BP, Sugar, Obesity (Motapa), Smoking, Family History (Khandani marz).",
  causes:
    "Causes (Wajuhaat):\nHigh levels of Cholesterol & BP block the arteries.\nUrdu: Charbi aur BP ki waja se dil ki ragein tang ho jati hain.",
  default:
    "I'm here to help! Ask about 'Chest Pain', 'BP', 'Sugar', 'Cholesterol', or 'Diet'.\nUrdu: Koi sawal karein, jaisay 'BP kia hai?' ya 'Chest Pain ki qismein'.",
};

const SUGGESTIONS = [
  "Age",
  "BP (Blood Pressure)",
  "Chest Pain",
  "Sugar (FBS)",
  "ECG",
  "Urdu Guide",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Salam! I am Dil Sehat Assistant. How can I help your heart health today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(""); // Error state
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (text = input) => {
    if (!text.trim()) {
      setError("Please type a question or select a topic.");
      return;
    }
    setError(""); // Clear error

    const userMsg = text.trim().toLowerCase();
    setMessages((prev) => [...prev, { text: text, sender: "user" }]);
    setInput("");

    // Simple keyword matching
    let botResponse = KNOWLEDGE_BASE["default"];
    // Check for exact matches first or include logic
    const keys = Object.keys(KNOWLEDGE_BASE);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "default" && userMsg.includes(key)) {
        botResponse = KNOWLEDGE_BASE[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl border border-slate-200 flex flex-col mb-4 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-green-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2 font-bold">
              <Bot size={20} /> Dil Sehat Assistant
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-green-700 p-1 rounded"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions & Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex flex-col gap-2">
            {/* Quick Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="whitespace-nowrap px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium hover:bg-green-100 border border-green-200"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (error) setError("");
                }}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about health terms..."
                className={`flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-green-500 transition-colors ${error ? "border-red-500 bg-red-50" : "border-slate-200"}`}
              />
              <button
                onClick={() => handleSend()}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            {error && (
              <span className="text-red-500 text-xs ml-1 font-medium">
                {error}
              </span>
            )}
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? "bg-slate-800" : "bg-green-600 hover:bg-green-700"} text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatBot;

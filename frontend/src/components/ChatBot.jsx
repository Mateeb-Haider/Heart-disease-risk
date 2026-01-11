import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const KNOWLEDGE_BASE = {
  "cholesterol": "Cholesterol is a fat-like substance in your blood. High levels (>200 mg/dL) can increase heart disease risk by clogging arteries.",
  "bp": "Blood Pressure (trestbps). Normal is around 120/80. High BP (>130-140) strains the heart.",
  "blood pressure": "Blood Pressure (trestbps). Normal is around 120/80. High BP (>130-140) strains the heart.",
  "trestbps": "Resting Blood Pressure (mm Hg). It measures the pressure in your arteries when your heart beats.",
  "angina": "Angina is chest pain caused by reduced blood flow to the heart. 'Exercise Angina' means pain happens during physical activity.",
  "fbs": "Fasting Blood Sugar. If > 120 mg/dl, it indicates diabetes risk, which correlates with heart disease.",
  "cp": "Chest Pain Type. 'ATA' (Atypical Angina), 'NAP' (Non-Anginal Pain), 'ASY' (Asymptomatic). ASY is often the most serious.",
  "ecg": "Resting ECG results. 'ST' abnormalities or 'LVH' (Hypertrophy) can indicate heart stress or damage.",
  "restecg": "Resting ECG results. 'ST' abnormalities or 'LVH' (Hypertrophy) can indicate heart stress or damage.",
  "slope": "ST Slope during exercise. 'Flat' or 'Down' slopes are concerning indicators of ischemia (lack of oxygen).",
  "thalach": "Maximum Heart Rate achieved during exercise. Lower max HR with age is normal, but very low values can be a risk.",
  "oldpeak": "ST Depression induced by exercise. Higher values (>1.5) usually indicate heart distress.",
  "default": "I can explain medical terms like Cholesterol, BP, Angina, ECG, etc. Just ask! (e.g. 'What is oldpeak?')"
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Salam! I am Dil Sehat Assistant. Start by asking about 'Cholesterol' or 'BP'.", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim().toLowerCase();
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput("");

    // Simple keyword matching
    let botResponse = KNOWLEDGE_BASE['default'];
    for (const key in KNOWLEDGE_BASE) {
      if (userMsg.includes(key)) {
        botResponse = KNOWLEDGE_BASE[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
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
            <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 p-1 rounded">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-xl p-3 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about health terms..."
              className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
            />
            <button onClick={handleSend} className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-slate-800' : 'bg-green-600 hover:bg-green-700'} text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default ChatBot;

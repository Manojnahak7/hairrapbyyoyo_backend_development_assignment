import { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/UserChatbot.css";
import { FiPlus } from "react-icons/fi";
import { HiOutlineMicrophone } from "react-icons/hi";
import { RiSoundModuleLine } from "react-icons/ri";

export default function UserChatbot() {
  const [messages, setMessages] = useState([]);
  const [step, setStep] = useState(null);
  const [context, setContext] = useState({});
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]); // 🔥 services / options

  // Initial bot message
  useEffect(() => {
    setMessages([{ from: "bot", text: "Hey! How can I help you today? 😊" }]);
  }, []);

  const send = async (text) => {
    if (!text.trim()) return;

    // clear options once user replies
    setOptions([]);

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");

    const res = await api.post("/chat/booking", {
      step,
      message: text,
      context,
    });

    if (res.data?.message) {
      setMessages((m) => [...m, { from: "bot", text: res.data.message }]);
    }

    // 🔥 SHOW SERVICES / OPTIONS
    if (res.data?.services) {
      setOptions(res.data.services);
    }

    if (res.data?.options) {
      setOptions(res.data.options);
    }

    setStep(res.data.step);
    setContext(res.data.context || {});
  };

  return (
    <div className="chatgpt-chat">
      {/* ===== MESSAGES ===== */}
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.from}`}>
            {m.text}
          </div>
        ))}

        {/* ===== SERVICE / OPTION BUTTONS ===== */}
        {options.length > 0 && (
          <div className="options">
            {options.map((opt, i) => (
              <button
                key={i}
                className="option-btn"
                onClick={() => send(String(opt.value))}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ===== INPUT ===== */}
      <div className="chatgpt-input-wrapper">
        <input
          className="chatgpt-input-top"
          placeholder="Browse help topics"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
        />

        <div className="chatgpt-input-bottom">
          <button className="circle-btn">
            <FiPlus />
          </button>

          <div className="right-icons">
            <button className="circle-btn">
              <HiOutlineMicrophone />
            </button>
            <button className="circle-btn">
              <RiSoundModuleLine />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

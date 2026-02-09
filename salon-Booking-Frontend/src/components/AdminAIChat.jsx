import { useState } from "react";
import api from "../api/api";

export default function AdminAIChat() {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");

  const send = async () => {
    const res = await api.post("/admin/ai/chat", { message: input });
    setMsgs([...msgs, { q: input, a: res.data.reply }]);
    setInput("");
  };

  return (
    <div>
      <h3>AI Assistant</h3>
      {msgs.map((m, i) => (
        <div key={i}>
          <b>You:</b> {m.q}
          <br />
          <b>AI:</b> {m.a}
        </div>
      ))}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={send}>Ask</button>
    </div>
  );
}

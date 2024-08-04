import { useState } from "react";
import axios from "axios";
import styles from "../app/Home.module.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { sender: "boyfriend", text: message };
    setChat([...chat, userMessage]);

    const response = await axios.post("/api/chat", { message });

    const botMessage = { sender: "girlfriend", text: response.data.text };
    setChat([...chat, userMessage, botMessage]);
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <h1>Girlfriend Chat Bot</h1>
      <div className={styles.chatBox}>
        {chat.map((msg, index) => (
          <div key={index} className={styles[msg.sender]}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          전송
        </button>
      </form>
    </div>
  );
}

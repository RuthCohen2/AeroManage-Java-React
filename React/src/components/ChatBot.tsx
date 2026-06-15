import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom'; // 1. ייבוא Link לניווט
import './ChatBot.css';

interface Message {
  text: string;
  isBot: boolean;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "שלום! אני העוזר הדיגיטלי של AeroManage. כיצד אוכל לסייע לך היום בנושאי טיסות ושירות לקוחות?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: string = inputValue.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInputValue("");
    setIsLoading(true);

    try {
      // 2. הוספת credentials: 'include' כדי להעביר את ה-Session מהשרת
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
        credentials: 'include', 
      });

      if (!response.ok) throw new Error('שגיאה בתקשורת');
      const data: { reply: string } = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { text: "שגיאה בחיבור לשרת.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>AeroManage Digital Assistant</h3>
      </div>
      
      <div className="chatbot-messages">
        {messages.map((msg, index) => {
          // בדיקה האם ההודעה מכילה נתיב של טיסה (למשל /flights/3)
          const flightPath = msg.text.match(/\/flights\/\d+/);
          
          return (
            <div key={index} className={`message-wrapper ${msg.isBot ? 'bot' : 'user'}`}>
              <div className="message-bubble">
                {msg.text}
                
                {/* 3. הצגת כפתור הזמנה רק אם הבוט מצא נתיב טיסה בהודעה */}
                {msg.isBot && flightPath && (
                  <div style={{ marginTop: '10px' }}>
                    <Link to={flightPath[0]} className="book-flight-btn">
                      ✈️ המשך להזמנת טיסה זו
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {isLoading && <div className="message-wrapper bot"><div className="message-bubble loading">מקליד...</div></div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chatbot-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="הקש את הודעתך כאן..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputValue.trim()}>שלח</button>
      </form>
    </div>
  );
};

export default ChatBot;
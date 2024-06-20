import React from "react";
import "./ChatContainer.css";


function ChatContainer({ chatLog, sendMessage, handleSubmit }) {
  return (
    <div className="chat-container">
      <div className="chat-log">
        {chatLog.map((entry, index) => (
          <div key={index}>
            {entry.user && <div>User: {entry.user}</div>}
            {entry.bot && (
              <div className="bot-message">
                Bot: <pre>{entry.bot}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="userInput"
          placeholder="Message ChatGPT..."
          autoFocus
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatContainer;

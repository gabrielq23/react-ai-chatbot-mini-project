import React, { useState } from "react";
import ChatContainer from "./components/ChatContainer";
import { OpenAIAPIKey } from "./config";

const API_URL = 'https://api.openai.com/v1/chat/completions';

function App() {
  const [chatLog, setChatLog] = useState([]);

  // function to send messages to the chatgpt api
  const sendMessage = async (message) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OpenAIAPIKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
          temperature: 0.7
        })
      });
      const responseData = await response.json();
      const botResponse = responseData.choices[0].message.content.trim();
      return botResponse;
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  // function to handle submitting forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInput = e.target.elements.userInput.value.trim();
    if (userInput !== '') {
      // add user input into the chatlog first
      setChatLog(prevChatLog => [...prevChatLog, { user: userInput }]);
      const botResponse = await sendMessage(userInput);
      setChatLog(prevChatLog => [...prevChatLog.slice(0, -1), { ...prevChatLog[prevChatLog.length - 1], bot: botResponse }]);
      e.target.elements.userInput.value = '';
    }
  };

  return (
    <div className="chat-container">
      <ChatContainer chatLog={chatLog} sendMessage={sendMessage} handleSubmit={handleSubmit} />
    </div>
  );
}

export default App;

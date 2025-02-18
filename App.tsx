import React, { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import './App.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
    };

    setMessages([...messages, userMessage]);

    // Simulate chatbot response
    setIsLoading(true);
    const aiResponse: Message = {
      id: Date.now().toString(),
      content: "Je suis votre chatbot, en train d'analyser votre message...",
      sender: 'assistant',
    };

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col p-4 bg-gray-100">
      <div className="flex flex-col bg-white rounded-lg shadow-md max-w-4xl mx-auto w-full h-full">
        <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
          <h1 className="text-xl font-bold">Chatbot IA</h1>
          <FaRobot size={30} />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <p className="text-gray-500">Chargement...</p>
            </div>
          )}
        </div>
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
};

export default App;

"use client";

import { useState } from "react";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ChatPage() {
  const user = useCurrentUser();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{text: string, sender: string}>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Add user message to chat history
    setChatHistory(prev => [...prev, { text: message, sender: 'user' }]);
    
    // TODO: Implement actual Watson Assistant API call here
    // For now, just echo the message back
    setChatHistory(prev => [...prev, { 
      text: `Echo: ${message}`, 
      sender: 'assistant'
    }]);
    
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-3xl mx-auto p-4">
      {/* Chat history */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {chatHistory.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
}

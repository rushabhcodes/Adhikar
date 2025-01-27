"use client";

import { useState } from "react";
import axios from "axios";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const splitNote = (content: string) => {
  const noteIndex = content.indexOf("Note:");
  if (noteIndex === -1) return { main: content, note: null };
  return {
    main: content.slice(0, noteIndex),
    note: content.slice(noteIndex)
  };
};

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    try {
      setIsLoading(true);
      setError(null);
      const userMessage = inputMessage;
      setInputMessage("");

      // Add user message immediately
      setMessages(prev => [...prev, { role: "user", content: userMessage }]);

      const response = await axios.post("/api/chat", {
        message: userMessage,
        conversation_id: conversationId,
        stream: false,
      });

      // Add assistant response
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: response.data.response }
      ]);
      setConversationId(response.data.conversation_id);
    } catch (error) {
      console.error("Chat error:", error);
      setError("Failed to process your message. Please try again.");
      setMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble responding. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {messages.map((message, index) => {
          const { main, note } = splitNote(message.content);
          
          return (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="space-y-2">
                    <MarkdownRenderer>{main}</MarkdownRenderer>
                    {note && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-sm text-gray-500">
                          <MarkdownRenderer>{note}</MarkdownRenderer>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
        {error && (
          <div className="mb-2 p-2 bg-red-100 text-red-600 rounded text-center">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading || !inputMessage.trim()}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}
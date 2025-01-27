"use client";

import { useState } from "react";
import axios from "axios";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const splitNote = (content: string) => {
  const noteIndex = content.indexOf("Note:");
  if (noteIndex === -1) return { main: content, note: null };
  return {
    main: content.slice(0, noteIndex),
    note: content.slice(noteIndex),
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

      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

      const response = await axios.post("/api/chat", {
        message: userMessage,
        conversation_id: conversationId,
        stream: false,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
      setConversationId(response.data.conversation_id);
    } catch (error) {
      console.error("Chat error:", error);
      setError("Failed to process your message. Please try again.");
      toast({
        title: "Error",
        description: "Failed to process your message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50/20 pt-24 px-4 pb-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
      <div className="absolute inset-0 animate-gradient-shift bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      <div className="max-w-3xl mx-auto space-y-8 relative">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 inline-block">
            AI Chat Assistant
          </h1>
          <p className="text-slate-600 text-lg font-medium">
            Ask questions and get intelligent responses
          </p>
        </div>

        {/* Chat Container */}
        <Card className="shadow-xl border border-gray-100 bg-white/70 backdrop-blur-sm h-[600px] flex flex-col">
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => {
              const { main, note } = splitNote(message.content);

              return (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white"
                        : "bg-white border border-gray-100"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="space-y-3">
                        <MarkdownRenderer>{main}</MarkdownRenderer>
                        {note && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-500">
                              <MarkdownRenderer>{note}</MarkdownRenderer>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="leading-relaxed">{message.content}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Generating response...</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {/* Input Area */}
          <div className="sticky bottom-0 border-t border-gray-100 bg-white/80 backdrop-blur-sm p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                disabled={isLoading || !inputMessage.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
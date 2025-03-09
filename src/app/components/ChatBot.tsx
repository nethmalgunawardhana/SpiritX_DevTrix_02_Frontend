"use client";

import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hello! I am your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      setInput("");
      setIsTyping(true);
      
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "This is a simulated response from the AI." },
        ]);
        setIsTyping(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-4 ${message.sender === "bot" ? "" : "justify-end"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 mr-3 flex-shrink-0 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                    <span className="text-teal-600 dark:text-teal-300 text-sm font-bold">AI</span>
                  </div>
                )}
                <div
                  className={`max-w-md rounded-lg p-4 ${
                    message.sender === "bot" 
                      ? "bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700" 
                      : "bg-teal-500 dark:bg-teal-600 text-white"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 ml-3 flex-shrink-0 rounded-full bg-teal-500 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">You</span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center mt-2 mb-4"
            >
              <div className="w-8 h-8 mr-3 flex-shrink-0 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                <span className="text-teal-600 dark:text-teal-300 text-sm font-bold">AI</span>
              </div>
              <div className="bg-white dark:bg-zinc-800 px-4 py-2 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-pulse delay-150"></div>
                  <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-pulse delay-300"></div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className=" border-gray-700 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end rounded-lg border border-gray-700 bg-zinc-800 overflow-hidden focus-within:ring-2 focus-within:ring-teal-500">
            <textarea
              className="flex-1 p-3 max-h-32 focus:outline-none resize-none bg-transparent text-white"
              placeholder="Ask me anything..."
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              className={`p-3 text-white rounded-r flex items-center justify-center transition-colors ${
                input.trim() ? "bg-teal-500 hover:bg-teal-600" : "bg-zinc-700 cursor-not-allowed"
              }`}
              onClick={handleSendMessage}
              disabled={!input.trim()}
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-center mt-2 text-zinc-500">
            Spiriter AI Chatbot - Powered by <a href="#" className="underline">DevTrix</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
"use client";

import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your Cricket AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const suggestions = [
    "Create the best cricket team",
    "Tell me about player Virat Kohli",
    "Who is the best batsman?",
    "Who is the best bowler?",
    "Who is the best all-rounder?",
    "Show me the best players",
    "Show me all batsmen",
    "List all bowlers",
    "Who are the all-rounders?"
  ];
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchResponse = async (query: string | number | boolean) => {
    try {
      setIsTyping(true);
      const response = await fetch(`http://localhost:5000/chatbot/query/?query=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: data.response || "Sorry, I couldn't process that request." },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Sorry, there was an error connecting to the server. Please try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages([...messages, { sender: "user", text: userMessage }]);
      setInput("");
      fetchResponse(userMessage);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessages([...messages, { sender: "user", text: suggestion }]);
    setInput("");
    fetchResponse(suggestion);
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

      {/* Suggestions */}
      <div className="px-4 pb-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-zinc-700 hover:bg-zinc-600 text-white text-xs px-3 py-1 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-gray-700 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-end rounded-lg border border-gray-700 bg-zinc-800 overflow-hidden focus-within:ring-2 focus-within:ring-teal-500">
            <textarea
              className="flex-1 p-3 max-h-32 focus:outline-none resize-none bg-transparent text-white"
              placeholder="Ask me about cricket..."
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
            Cricket AI Chatbot - Powered by <a href="#" className="underline">DevTrix</a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChatBot;
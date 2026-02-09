
import React, { useState, useRef, useEffect } from 'react';
import { BrainCircuit, X, Send, Sparkles, Loader2, MessageSquare } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Hi! I am your GenCart Shopping Assistant. How can I help you find the perfect product today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await geminiService.chatWithAssistant([], userMessage);
      setChatHistory(prev => [...prev, { role: 'model', text: aiResponse || 'Sorry, I encountered an issue.' }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'model', text: 'I am having trouble connecting right now. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#2874f0] hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2 group"
      >
        <BrainCircuit className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">
          Ask Assistant
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#2874f0] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">GenCart Assistant</h3>
                <p className="text-[10px] text-blue-100 opacity-80 uppercase tracking-widest font-bold">Powered by Gemini AI</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-md transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-hide">
            {chatHistory.map((chat, i) => (
              <div key={i} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                  chat.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                }`}>
                  {chat.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-xs text-gray-500 font-medium">GenCart AI is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl focus-within:ring-2 focus-within:ring-blue-400 transition-all">
              <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 bg-transparent border-none focus:outline-none p-2 text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-[#2874f0] text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;


import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '@/types';
import { Search, X, Send } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  formData: FormData;
  onClose: () => void;
  onShowRecommendations: () => void;
  onEditInfo: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  formData,
  onClose,
  onShowRecommendations,
  onEditInfo
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    text: "That's a great start. Now we'll ask you 5-6 questions to tailor your recommendations further.",
    isUser: false,
    timestamp: new Date()
  }]);
  const [questionCount, setQuestionCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const userMessage: Message = {
        text: message.trim(),
        isUser: true,
        timestamp: new Date()
      };

      // Add bot response and increment question count
      const botMessage: Message = {
        text: "Thanks for providing more details! Here's another question for you...",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage, botMessage]);
      setMessage('');
      setQuestionCount(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-800 text-white p-4 rounded-t-lg">
        <div>
          <h2 className="text-2xl font-bold">Tell us about your needs</h2>
          <p className="text-sm text-gray-300">We'll find the perfect plan for you</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">🛡️ Type of Cover</h3>
            <p className="font-medium">{formData.coverType}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">👥 Who's Covered</h3>
            <p className="font-medium">{formData.coverageFor}</p>
          </div>

          {formData.hospitalServices && formData.hospitalServices.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">🏥 Hospital Services</h3>
              <p className="font-medium">{formData.hospitalServices.join(', ')}</p>
            </div>
          )}
          
          {formData.extraServices && formData.extraServices.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">⭐ Extra Services</h3>
              <p className="font-medium">{formData.extraServices.join(', ')}</p>
            </div>
          )}
          
          {formData.postcode && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">📍 Postcode</h3>
              <p className="font-medium">{formData.postcode}</p>
            </div>
          )}
        </div>
        
        <Button 
          onClick={onEditInfo} 
          variant="ghost" 
          size="sm" 
          className="text-cc-green hover:text-cc-dark-green"
        >
          Edit Your Info
        </Button>
      </div>

      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 h-80 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${msg.isUser ? 'bg-cc-green text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          placeholder="Ask anything about health insurance..." 
          className="w-full pr-12 pl-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cc-green focus:border-transparent" 
        />
        <Button 
          type="submit" 
          disabled={!message.trim()} 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cc-green hover:text-cc-dark-green hover:bg-transparent"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>

      <div className="flex justify-center">
        <Button 
          type="button" 
          onClick={onShowRecommendations} 
          disabled={questionCount < 4}
          className={`flex items-center ${
            questionCount < 4 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-cc-green hover:bg-cc-dark-green'
          }`}
        >
          <Search className="mr-2 h-4 w-4" />
          Show Recommendations Now {questionCount < 4 ? `(${4 - questionCount} questions remaining)` : ''}
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;

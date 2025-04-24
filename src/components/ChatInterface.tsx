
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '@/types';
import { Send, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ChatInterfaceProps {
  formData: FormData;
  onClose: () => void;
  onShowRecommendations: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  formData,
  onClose,
  onShowRecommendations,
}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    text: "Hi! How can I help you with your health insurance needs today?",
    isUser: false,
    timestamp: new Date()
  }]);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      const userMessage: Message = {
        text: message.trim(),
        isUser: true,
        timestamp: new Date()
      };
      
      // Add bot response
      const botMessage: Message = {
        text: "Thanks for providing more details! I'll take that into consideration when recommending plans.",
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage, botMessage]);
      toast({
        title: "Message received",
        description: "Thanks for providing more details!",
      });
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#1a3352] text-white p-4 rounded-t-lg">
        <h2 className="text-lg font-medium">Tell us more about your needs</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="text-white hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* User Selections Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 m-4 p-4">
        <div className="space-y-3">
          <h3 className="font-medium text-[#1a3352]">Your Selections:</h3>
          <div className="space-y-2 text-gray-700">
            <p>🛡️ <span className="font-medium">Cover Type:</span> {formData.coverType}</p>
            <p>👥 <span className="font-medium">Who's Covered:</span> {formData.coverageFor}</p>
            {formData.hospitalServices && formData.hospitalServices.length > 0 && (
              <p>🏥 <span className="font-medium">Hospital Services:</span> {formData.hospitalServices.join(', ')}</p>
            )}
            {formData.extraServices && formData.extraServices.length > 0 && (
              <p>⭐ <span className="font-medium">Extra Services:</span> {formData.extraServices.join(', ')}</p>
            )}
            {formData.postcode && (
              <p>📍 <span className="font-medium">Postcode:</span> {formData.postcode}</p>
            )}
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser
                    ? 'bg-cc-green text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about health insurance..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cc-green focus:border-transparent"
          />
          <Button 
            type="submit"
            disabled={!message.trim()}
            className="bg-cc-green hover:bg-cc-dark-green text-white rounded-full px-6"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <Button 
            onClick={onShowRecommendations}
            className="bg-cc-green hover:bg-cc-dark-green text-white px-6 py-2"
          >
            Show Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;



import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '@/types';
import { Search, X, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
        description: "Thanks for providing more details!"
      });
      setMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-800 text-white p-4 rounded-t-lg">
        <h2 className="font-medium">Tell us more about your needs</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
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
          className="bg-cc-green hover:bg-cc-dark-green flex items-center"
        >
          <Search className="mr-2 h-4 w-4" />
          Show Recommendations Now
        </Button>
      </div>
    </div>
  );
};

export default ChatInterface;



import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '@/components/ChatMessage';
import { Send, MessageSquare, X } from 'lucide-react';
import { chatResponses, sampleQuestions } from '@/data/mockData';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatInterfaceProps {
  planNames: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  planNames
}) => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: "Hi there! I'm your insurance guide. Feel free to ask me any questions about these plans.",
    isUser: false,
    timestamp: new Date().toLocaleTimeString()
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate response based on keywords
    setTimeout(() => {
      let responseContent = "I don't have specific information on that. Would you like to speak with a health insurance specialist?";
      const lowerCaseInput = inputValue.toLowerCase();
      
      if (lowerCaseInput.includes('pregnancy')) {
        responseContent = chatResponses.pregnancy;
      } else if (lowerCaseInput.includes('wait') || lowerCaseInput.includes('period')) {
        responseContent = chatResponses.waitingPeriods;
      } else if (lowerCaseInput.includes('child') || lowerCaseInput.includes('kid')) {
        responseContent = chatResponses.children;
      } else if (lowerCaseInput.includes('dental')) {
        responseContent = chatResponses.dental;
      } else if (lowerCaseInput.includes('discount')) {
        responseContent = chatResponses.discounts;
      }
      
      const botResponse: Message = {
        id: Date.now().toString(),
        content: responseContent,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSampleQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleClose = () => {
    navigate('/recommended-plans');
  };

  const handleBuyPlan = (planId: string) => {
    navigate('/purchase-now', {
      state: {
        planId
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-md border border-white/30 shadow-lg rounded-lg overflow-hidden">
      <div className="bg-[#1E293B] text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <h2 className="font-medium">Ask questions about these plans</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClose} className="hover:bg-cc-dark-green text-white">
          <X size={20} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 bg-white/60 backdrop-blur-md rounded-b-lg shadow-sm">
        <div className="p-4">
          {messages.map(message => <ChatMessage key={message.id} content={message.content} isUser={message.isUser} timestamp={message.timestamp} />)}
          
          {isTyping && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse delay-300"></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="bg-white/70 backdrop-blur-md rounded-md p-3 mb-4 mx-3">
        <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => (
            <button 
              key={index} 
              onClick={() => handleSampleQuestion(question)} 
              className="whitespace-nowrap px-3 py-1 bg-white/80 backdrop-blur-sm border border-white/40 rounded-full hover:border-cc-green text-xs"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-white/20 bg-white/70 backdrop-blur-md">
        <div className="flex gap-2 px-3 pb-3">
          <Input 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            onKeyPress={handleKeyPress} 
            placeholder="Ask a question about these plans..." 
            className="flex-1 bg-white/90" 
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={inputValue.trim() === ''} 
            className="hover:bg-cc-dark-green text-white bg-slate-800 hover:bg-slate-700"
          >
            <Send size={16} className="mr-1" /> Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

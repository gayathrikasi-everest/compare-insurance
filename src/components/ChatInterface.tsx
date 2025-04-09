
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import ChatMessage from '@/components/ChatMessage';
import { Send, MessageSquare, X } from 'lucide-react';
import { chatResponses, sampleQuestions } from '@/data/mockData';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatInterfaceProps {
  planNames: string[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ planNames }) => {
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className="flex flex-col h-full">
      <div className="bg-[#E83F6F] text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <h2 className="font-medium">Ask questions about these plans</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={handleClose} className="hover:bg-[#d03861] text-white">
          <X size={20} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-hidden mb-4 bg-white/80 rounded-b-lg shadow-sm border border-gray-100">
        <ScrollArea className="h-full p-4">
          <div className="p-4">
            {messages.map(message => (
              <ChatMessage 
                key={message.id} 
                content={message.content} 
                isUser={message.isUser} 
                timestamp={message.timestamp} 
              />
            ))}
            
            {isTyping && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-2 h-2 bg-[#E83F6F] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#E83F6F] rounded-full animate-pulse delay-150"></div>
                <div className="w-2 h-2 bg-[#E83F6F] rounded-full animate-pulse delay-300"></div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      
      {/* Updated suggestion questions to match the image design */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-3">
          {sampleQuestions.map((question, index) => (
            <button 
              key={index} 
              onClick={() => handleSampleQuestion(question)} 
              className="px-5 py-3 text-sm bg-white border border-gray-200 rounded-full hover:border-[#E83F6F] hover:shadow-sm transition-all"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-gray-100 bg-[#f8f9fa]">
        <div className="flex gap-2">
          <Input 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            onKeyPress={handleKeyPress} 
            placeholder="Ask a question about these plans..." 
            className="flex-1 py-6 px-5 rounded-full"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={inputValue.trim() === ''} 
            className="bg-[#E83F6F] hover:bg-[#d03861] text-white rounded-full"
          >
            <Send size={16} className="mr-1" /> Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

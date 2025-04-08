
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

  return (
    <div className="flex flex-col h-full pb-[3%]">
      {/* Chat header bar */}
      <div className="bg-cc-green text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} />
          <h2 className="font-medium">Ask questions about these plans</h2>
        </div>
        <Button variant="ghost" size="icon" className="hover:bg-cc-dark-green text-white">
          <X size={20} />
        </Button>
      </div>
      
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto mb-4 bg-white/80 rounded-b-lg shadow-sm border border-gray-100">
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
              <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse delay-150"></div>
              <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse delay-300"></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Sample questions */}
      <div className="bg-gray-50 border border-gray-100 rounded-md p-3 mb-4">
        <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((question, index) => (
            <button 
              key={index} 
              onClick={() => handleSampleQuestion(question)} 
              className="whitespace-nowrap px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:border-cc-green"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      {/* Input area - now with proper spacing for navbar */}
      <div className="mt-auto pt-4 border-t border-gray-100 bg-[#f8f9fa]">
        <div className="flex gap-2">
          <Input 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)} 
            onKeyPress={handleKeyPress} 
            placeholder="Ask a question about these plans..." 
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={inputValue.trim() === ''} 
            className="bg-cc-green hover:bg-cc-dark-green text-white"
          >
            <Send size={16} className="mr-1" /> Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

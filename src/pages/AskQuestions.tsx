
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import ChatMessage from '@/components/ChatMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import InsurancePlanCard from '@/components/InsurancePlanCard';
import { mockInsurancePlans, sampleQuestions, chatResponses } from '@/data/mockData';
import { UserInfo } from '@/types';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

const AskQuestions: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: "Hi there! I'm your insurance guide. Feel free to ask me any questions about these plans.",
    isUser: false,
    timestamp: new Date().toLocaleTimeString()
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"query": ""}') as UserInfo;
  
  const steps = [{
    number: 1,
    title: "Understanding you",
    description: "Tell us about your needs",
    completed: true,
    active: false
  }, {
    number: 2,
    title: "Recommended plans",
    description: "View your personalized options",
    completed: true,
    active: false
  }, {
    number: 3,
    title: "Ask questions",
    description: "Get expert answers",
    completed: false,
    active: true
  }];
  
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
  
  const handleBack = () => {
    navigate('/recommended-plans');
  };
  
  const handleBuyPlan = (planId: string) => {
    navigate('/purchase-now', { state: { planId } });
  };
  
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-cc-light-green animate-fade-in">
      {/* Left sidebar with progress */}
      <div className="w-3/8 bg-white p-8 border-r">
        <h2 className="text-2xl font-bold text-cc-blue mb-6">
          Find and contract your ideal<br />health insurance
        </h2>
        
        <ProgressBar steps={steps} currentStep={3} />
        
        <Button variant="outline" onClick={handleBack} className="mt-4 text-cc-blue border-cc-blue hover:bg-cc-light-blue">
          &lt; Back to recommended plans
        </Button>
      </div>
      
      {/* Right content area */}
      <div className="w-5/8 flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Compact plan cards */}
          <div className="flex flex-wrap gap-4 mb-8">
            {mockInsurancePlans.map(plan => <div key={plan.id} className="glass-card p-4 flex-1 min-w-[200px]">
                <h3 className="text-sm font-bold text-cc-blue">{plan.name}</h3>
                <p className="text-xs text-gray-500">{plan.provider}</p>
                <div className="flex items-center justify-between mt-2 bg-gray-100">
                  <span className="text-sm font-bold text-cc-blue">${plan.price}/mo</span>
                  <Button onClick={() => handleBuyPlan(plan.id)} className="bg-cc-green hover:bg-cc-dark-green text-white text-xs py-1 px-3 h-auto">
                    Buy
                  </Button>
                </div>
              </div>)}
          </div>
          
          {/* Chat section */}
          <div className="glass-card mb-4 overflow-hidden flex flex-col" style={{
          height: 'calc(100vh - 300px)'
        }}>
            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map(message => <ChatMessage key={message.id} content={message.content} isUser={message.isUser} timestamp={message.timestamp} />)}
              
              {isTyping && <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-cc-green rounded-full animate-pulse delay-300"></div>
                </div>}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Sample questions */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex overflow-x-auto gap-2">
              {sampleQuestions.map((question, index) => <button key={index} onClick={() => handleSampleQuestion(question)} className="whitespace-nowrap px-3 py-1 text-sm bg-white border border-gray-200 rounded-full hover:border-cc-green">
                  {question}
                </button>)}
            </div>
            
            {/* Input area */}
            <div className="p-4 border-t border-gray-100 flex gap-2 bg-white">
              <Input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask a question about these plans..." className="flex-1" />
              <Button onClick={handleSendMessage} disabled={inputValue.trim() === ''} className="bg-cc-green hover:bg-cc-dark-green text-white">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskQuestions;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserInfo } from '@/types';
import { ArrowRight } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
const UnderstandingYou: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const steps = [{
    number: 1,
    title: 'Understanding You',
    description: 'Tell us about your needs',
    completed: false,
    active: true
  }, {
    number: 2,
    title: 'Recommended Plans',
    description: 'Review your top options',
    completed: false,
    active: false
  }, {
    number: 3,
    title: 'Ask Questions',
    description: 'Get answers about your plans',
    completed: false,
    active: false
  }];
  const handleSubmit = () => {
    if (query.trim() === '') return;
    setIsSubmitting(true);

    // In a real app, this would send the query to an API
    const userInfo: UserInfo = {
      query
    };
    setTimeout(() => {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/recommended-plans');
      setIsSubmitting(false);
    }, 1000);
  };
  return <div className="min-h-[calc(100vh-65px)] flex bg-gradient-to-br from-white to-cc-light-green animate-fade-in bg-gray-100">
      {/* Left sidebar with progress */}
      <div className="w-3/8 bg-white/80 backdrop-blur-md p-8 border-r border-white/20 shadow-md hidden md:block">
        <ProgressBar steps={steps} currentStep={1} />
      </div>
      
      {/* Main content area */}
      <div className="w-full md:w-5/8 flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-2xl p-4 md:p-8">
          <div className="text-center mb-8">
            <img alt="Health Insurance" className="w-36 h-36 mx-auto mb-6" src="/lovable-uploads/ba50f7a2-cf55-4430-91c6-39b46030b83e.png" />
            <h1 className="text-3xl md:text-4xl font-bold text-cc-blue mb-2 glass-card py-2 px-4">
              Find your ideal health insurance
            </h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Tell us about your needs and we'll find the perfect plan for you
            </p>
          </div>
          
          <div className="glass-card backdrop-blur-md bg-white/50 border border-white/20 shadow-xl p-6 mb-8">
            <label className="block text-cc-blue font-medium mb-2">How can we help you today?</label>
            <Textarea placeholder="Ask something like: I'm married and we are expecting a baby and want the best plan out there for our new family..." value={query} onChange={e => setQuery(e.target.value)} className="min-h-[150px] backdrop-blur-md bg-white/50 border-gray-200 focus:border-cc-green focus:ring-cc-green" />
          </div>
          
          <Button onClick={handleSubmit} disabled={query.trim() === '' || isSubmitting} className="w-full glass-card bg-gradient-to-r from-cc-green to-cc-dark-green hover:opacity-90 text-white py-6 text-lg font-medium shadow-md flex items-center justify-center border-none">
            {isSubmitting ? 'Processing...' : <>
                FIND YOUR INSURANCE 
                <ArrowRight className="ml-2" size={18} />
              </>}
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            We compare policies from 15+ leading Australian health insurers
          </p>
        </div>
      </div>
    </div>;
};
export default UnderstandingYou;
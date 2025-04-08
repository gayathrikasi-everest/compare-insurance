
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { UserInfo } from '@/types';

const UnderstandingYou: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (query.trim() === '') return;
    
    setIsSubmitting(true);
    
    // In a real app, this would send the query to an API
    const userInfo: UserInfo = { query };
    setTimeout(() => {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/recommended-plans');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-cc-light-green animate-fade-in">
      <div className="w-full max-w-2xl p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-cc-blue mb-4">
            Find and contract your ideal<br/>health insurance
          </h1>
        </div>
        
        <div className="glass-card p-6 mb-8">
          <Textarea
            placeholder="Ask something like I'm married and we are expecting a baby and want the best plan out there for our new family..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[150px] border-gray-200 focus:border-cc-green focus:ring-cc-green"
          />
        </div>
        
        <Button
          onClick={handleSubmit}
          disabled={query.trim() === '' || isSubmitting}
          className="w-full bg-cc-blue hover:bg-cc-dark-blue text-white py-6 text-lg font-medium"
        >
          {isSubmitting ? 'Processing...' : 'FIND YOUR INSURANCE'}
        </Button>
      </div>
    </div>
  );
};

export default UnderstandingYou;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import { UserInfo } from '@/types';
import InsurancePlanList from '@/components/InsurancePlanList';
import RecommendationExplanation from '@/components/RecommendationExplanation';
import { recommendedInsurancePlans, recommendationText } from '@/data/mockData';
import { Toaster } from "@/components/ui/toaster";

const RecommendedPlans: React.FC = () => {
  const navigate = useNavigate();
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  // In a real app, this would come from an API based on user input
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"query": ""}') as UserInfo;
  const steps = [{
    number: 1,
    title: 'Understanding You',
    description: 'Tell us about your needs',
    completed: true,
    active: false
  }, {
    number: 2,
    title: 'Recommended Plans',
    description: 'Review your top options',
    completed: false,
    active: true
  }, {
    number: 3,
    title: 'Ask Questions',
    description: 'Get answers about your plans',
    completed: false,
    active: false
  }, {
    number: 4,
    title: 'Purchase Insurance',
    description: 'Buy your ideal insurance',
    completed: false,
    active: false
  }];

  const handleRegenerateOptions = () => {
    // In a real app, this would fetch new recommendations
    console.log('Regenerating insurance options based on preferences');
  };

  const handleSeeMore = (planId: string) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  const handleBuyPlan = (planId: string) => {
    navigate('/purchase-now', { state: { planId } });
  };

  const handleAskQuestions = () => {
    navigate('/chat-plans');
  };

  return (
    <>
      <div className="h-[calc(100vh-56px)] flex bg-white overflow-hidden">
        {/* Left sidebar with progress */}
        <div className="w-1/4 bg-white/80 backdrop-blur-md p-6 border-r border-white/20 shadow-md">
          <ProgressBar steps={steps} currentStep={2} />
        </div>
        
        {/* Right content area */}
        <div className="w-3/4 flex bg-[#f8f9fa]">
          {/* Left column: Insurance plan cards - 35% width */}
          <div className="w-[35%] p-4 flex flex-col h-full">
            <InsurancePlanList 
              plans={recommendedInsurancePlans} 
              expandedPlanId={expandedPlanId} 
              onSeeMore={handleSeeMore} 
              onBuyPlan={handleBuyPlan}
              onRegenerateOptions={handleRegenerateOptions} 
            />
          </div>
          
          {/* Right column: Recommendation explanation - 65% width */}
          <div className="w-[65%] p-4 flex flex-col h-full">
            <RecommendationExplanation 
              recommendationText={recommendationText} 
              onAskQuestions={handleAskQuestions} 
            />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default RecommendedPlans;

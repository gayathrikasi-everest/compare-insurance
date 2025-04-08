
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import { UserInfo } from '@/types';
import InsurancePlanList from '@/components/InsurancePlanList';
import RecommendationExplanation from '@/components/RecommendationExplanation';
import { recommendedInsurancePlans, recommendationText } from '@/data/mockData';

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
    alert('This would regenerate new insurance options based on your preferences');
  };

  const handleSeeMore = (planId: string) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  const handleBuyPlan = (planId: string) => {
    alert(`In a real application, this would start the process to purchase plan ${planId}`);
  };

  const handleAskQuestions = () => {
    navigate('/ask-questions');
  };

  return (
    <div className="h-screen flex bg-white overflow-hidden">
      {/* Left sidebar with progress */}
      <div className="w-1/4 bg-white/80 backdrop-blur-md p-6 border-r border-white/20 shadow-md">
        <ProgressBar steps={steps} currentStep={2} />
      </div>
      
      {/* Right content area - taking full height */}
      <div className="w-3/4 flex bg-[#EEE] h-screen">
        {/* Left column: Stacked insurance plan cards - 35% width */}
        <div className="w-[35%] pr-4">
          <InsurancePlanList 
            plans={recommendedInsurancePlans} 
            expandedPlanId={expandedPlanId} 
            onSeeMore={handleSeeMore} 
            onBuyPlan={handleBuyPlan}
            onRegenerateOptions={handleRegenerateOptions} 
          />
        </div>
        
        {/* Right column: Profile-based recommendation explanation - 65% width */}
        <div className="w-[65%] p-4">
          <RecommendationExplanation 
            recommendationText={recommendationText} 
            onAskQuestions={handleAskQuestions} 
          />
        </div>
      </div>
    </div>
  );
};

export default RecommendedPlans;

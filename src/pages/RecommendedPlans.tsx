
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import { UserInfo } from '@/types';
import InsurancePlanList from '@/components/InsurancePlanList';
import RecommendationExplanation from '@/components/RecommendationExplanation';
import { recommendedInsurancePlans, recommendationText } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const RecommendedPlans: React.FC = () => {
  const navigate = useNavigate();
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  // In a real app, this would come from an API based on user input
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"query": ""}') as UserInfo;
  
  const steps = [
    { 
      number: 1, 
      title: 'Understanding You', 
      description: 'Tell us about your needs',
      completed: true, 
      active: false 
    },
    { 
      number: 2, 
      title: 'Recommended Plans', 
      description: 'Review your top options',
      completed: false, 
      active: true 
    },
    { 
      number: 3, 
      title: 'Ask Questions', 
      description: 'Get answers about your plans',
      completed: false, 
      active: false 
    },
    { 
      number: 4, 
      title: 'Purchase Insurance', 
      description: 'Buy your ideal insurance',
      completed: false, 
      active: false 
    }
  ];

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
      
      {/* Right content area with new layout - taking full height */}
      <div className="w-3/4 py-4 px-[8%] bg-[#EEE] flex flex-col h-screen">
        {/* Title for the section */}
        <h2 className="text-2xl font-bold text-cc-blue mb-4">Your recommended plans</h2>
        
        <div className="flex-grow flex flex-col md:flex-row gap-8">
          {/* Left column: Stacked insurance plan cards - 35% width */}
          <div className="md:w-[35%] flex flex-col justify-between pr-4">
            <div className="flex-grow flex flex-col justify-between">
              <div className="flex-shrink">
                <InsurancePlanList
                  plans={recommendedInsurancePlans}
                  expandedPlanId={expandedPlanId}
                  onSeeMore={handleSeeMore}
                  onBuyPlan={handleBuyPlan}
                />
              </div>
              
              {/* "I don't like..." button positioned at the bottom of this column */}
              <div className="mb-6 mt-4">
                <Button 
                  variant="outline" 
                  onClick={handleRegenerateOptions}
                  className="text-cc-blue border-cc-blue hover:bg-cc-light-blue backdrop-blur-md flex items-center gap-2 w-full"
                >
                  <RefreshCw size={16} />
                  I don't like these options
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right column: Profile-based recommendation explanation - 65% width */}
          <div className="md:w-[65%]">
            <RecommendationExplanation 
              recommendationText={recommendationText} 
              onAskQuestions={handleAskQuestions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPlans;

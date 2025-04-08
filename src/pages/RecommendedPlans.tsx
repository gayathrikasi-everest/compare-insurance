
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import InsurancePlanCard from '@/components/InsurancePlanCard';
import { Button } from '@/components/ui/button';
import { mockInsurancePlans } from '@/data/mockData';
import { UserInfo } from '@/types';

const RecommendedPlans: React.FC = () => {
  const navigate = useNavigate();
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  // In a real app, this would come from an API based on user input
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"query": ""}') as UserInfo;
  
  const steps = [
    { 
      number: 1, 
      title: 'Understanding you', 
      description: userInfo.query.slice(0, 100) + (userInfo.query.length > 100 ? '...' : ''),
      completed: true, 
      active: false 
    },
    { 
      number: 2, 
      title: 'Finding your best insurance options', 
      completed: true, 
      active: true 
    },
    { 
      number: 3, 
      title: 'Clarify any questions', 
      completed: false, 
      active: false 
    },
    { 
      number: 4, 
      title: 'Easily contract online with best price guarantee', 
      completed: false, 
      active: false 
    }
  ];

  const handleRegenerateOptions = () => {
    // In a real app, this would fetch new recommendations
    alert('This would regenerate new insurance options based on your preferences');
  };

  const handleEditInfo = () => {
    navigate('/');
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
    <div className="min-h-screen flex bg-gradient-to-br from-white to-cc-light-green animate-fade-in">
      {/* Left sidebar with progress */}
      <div className="w-3/8 bg-white p-8 border-r">
        <h2 className="text-2xl font-bold text-cc-blue mb-6">
          Find and contract your ideal<br/>health insurance
        </h2>
        
        <ProgressBar steps={steps} currentStep={2} />
        
        <Button 
          variant="outline" 
          onClick={handleEditInfo}
          className="mt-4 text-cc-blue border-cc-blue hover:bg-cc-light-blue"
        >
          &lt; Edit info
        </Button>
      </div>
      
      {/* Right content area */}
      <div className="w-5/8 flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {/* Plan cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mockInsurancePlans.map(plan => (
              <InsurancePlanCard
                key={plan.id}
                name={plan.name}
                provider={plan.provider}
                price={plan.price}
                onSeeMore={() => handleSeeMore(plan.id)}
                onBuyPlan={() => handleBuyPlan(plan.id)}
              />
            ))}
          </div>
          
          {/* Expanded plan details */}
          {expandedPlanId && (
            <div className="glass-card p-6 mb-8 animate-fade-in">
              {mockInsurancePlans.filter(p => p.id === expandedPlanId).map(plan => (
                <div key={plan.id}>
                  <h3 className="text-xl font-bold text-cc-blue mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <h4 className="font-semibold text-cc-blue mt-4 mb-2">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          {/* Profile-based recommendation explanation */}
          <div className="glass-card p-6 mb-8 max-h-60 overflow-y-auto">
            <p className="text-gray-700">
              Based on your profile as a young couple with a child and another baby on the way, 
              your health insurance needs will focus on comprehensive coverage for both hospital 
              and extras services, particularly those related to pregnancy, childbirth, and pediatric care.
            </p>
            <ol className="mt-4 space-y-4">
              <li>
                <strong className="text-cc-blue">Medibank Gold Protect and Growing Family 60:</strong>{' '}
                This combined policy offers extensive hospital coverage, including pregnancy and birth services, 
                which is crucial for your expanding family. The extras cover includes dental, optical, and 
                physiotherapy, which are beneficial for both adults and children.
              </li>
            </ol>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={handleRegenerateOptions}
              className="text-cc-blue border-cc-blue hover:bg-cc-light-blue"
            >
              I don't like these options
            </Button>
            
            <Button 
              onClick={handleAskQuestions}
              className="bg-cc-green hover:bg-cc-dark-green text-white"
            >
              Ask questions about these plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPlans;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import InsurancePlanCard from '@/components/InsurancePlanCard';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserInfo } from '@/types';

// Real insurance plan data
const insurancePlans = [
  {
    id: "5",
    name: "Gold Protect & Growing Family 60",
    provider: "Medibank",
    price: 650,
    description: "Extensive hospital coverage including pregnancy and birth services. Extras cover for dental, optical, and physiotherapy.",
    features: [
      "Comprehensive pregnancy and birth services",
      "Full hospital cover",
      "Dental and optical extras",
      "Physiotherapy coverage",
      "Family-friendly benefits"
    ],
    isTopRecommendation: true
  },
  {
    id: "3",
    name: "My Family Silver Plus",
    provider: "HCF",
    price: 780,
    description: "Good balance of hospital and extras coverage, including pregnancy and birth services.",
    features: [
      "Pregnancy and birth services",
      "Wide range of covered procedures",
      "Flexible extras",
      "Family health services",
      "Standard waiting periods"
    ],
    isTopRecommendation: false
  },
  {
    id: "2",
    name: "Gold Comprehensive Hospital + Freedom 60",
    provider: "Bupa",
    price: 771.30,
    description: "Robust option with extensive hospital cover and a wide range of extras. Includes comprehensive maternity services.",
    features: [
      "Comprehensive maternity services",
      "Pediatric care",
      "Extensive hospital cover",
      "Wide range of extras",
      "Competitive pricing"
    ],
    isTopRecommendation: false
  }
];

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

  const recommendationText = `Based on your profile as a young couple with a 2-year-old child and another baby on the way, your health insurance needs will focus on comprehensive coverage for both hospital and extras services, particularly those related to pregnancy, childbirth, and pediatric care. 

1. **Medibank Gold Protect and Growing Family 60 (Policy ID: 5)**: This combined policy offers extensive hospital coverage, including pregnancy and birth services, which is crucial for your expanding family. The extras cover includes dental, optical, and physiotherapy, which are beneficial for both adults and children. However, the premium is relatively high at $650 per month, and there are waiting periods for certain services, particularly for pre-existing conditions and pregnancy-related claims. 

2. **HCF My Family Silver Plus (Policy ID: 3)**: This policy provides a good balance of hospital and extras coverage, including pregnancy and birth services. The premium is slightly higher at $780 per month, but it offers a wide range of covered procedures and flexible extras. The waiting periods are standard, but the policy does have some exclusions, such as certain high-cost treatments. 

3. **Bupa Gold Comprehensive Hospital + Freedom 60 Extras (Policy ID: 2)**: This is a robust option with extensive hospital cover and a wide range of extras. It includes comprehensive maternity services and pediatric care, which are essential for your family. The total premium is $771.30 per month, which is competitive given the extensive coverage. However, there are potential out-of-pocket costs at non-agreement hospitals, and some services may have waiting periods. 

After evaluating these options, the **Medibank Gold Protect and Growing Family 60** policy stands out as the top recommendation due to its comprehensive coverage for both hospital and extras, particularly for your current and future family needs. While the premium is high, the extensive benefits and coverage for pregnancy and child-related services justify the cost, making it the best fit for your situation.`;

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-cc-light-green animate-fade-in">
      {/* Left sidebar with progress */}
      <div className="w-3/8 bg-white/80 backdrop-blur-md p-8 border-r border-white/20 shadow-md">
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
            {insurancePlans.map(plan => (
              <InsurancePlanCard
                key={plan.id}
                name={plan.name}
                provider={plan.provider}
                price={plan.price}
                isTopRecommendation={plan.isTopRecommendation}
                onSeeMore={() => handleSeeMore(plan.id)}
                onBuyPlan={() => handleBuyPlan(plan.id)}
              />
            ))}
          </div>
          
          {/* Expanded plan details */}
          {expandedPlanId && (
            <div className="glass-card backdrop-blur-md bg-white/70 border border-white/20 shadow-xl p-6 mb-8 animate-fade-in">
              {insurancePlans.filter(p => p.id === expandedPlanId).map(plan => (
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
          
          {/* Profile-based recommendation explanation with scrollbar */}
          <div className="glass-card backdrop-blur-md bg-white/70 border border-white/20 shadow-xl p-6 mb-8">
            <ScrollArea className="h-60">
              <div className="pr-4">
                <h3 className="text-lg font-bold text-cc-blue mb-2">Your Personalized Recommendation</h3>
                <p className="text-gray-700 whitespace-pre-line">{recommendationText}</p>
              </div>
            </ScrollArea>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <Button 
              variant="outline" 
              onClick={handleRegenerateOptions}
              className="text-cc-blue border-cc-blue hover:bg-cc-light-blue backdrop-blur-md"
            >
              I don't like these options
            </Button>
            
            <Button 
              onClick={handleAskQuestions}
              className="bg-gradient-to-r from-cc-green to-cc-dark-green hover:opacity-90 text-white shadow-md"
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

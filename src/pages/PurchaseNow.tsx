
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import InsurancePlanCard from '@/components/InsurancePlanCard';
import { mockInsurancePlans } from '@/data/mockData';
import { InsurancePlan } from '@/types';

const PurchaseNow: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the plan ID from URL state
    const planId = location.state?.planId;
    if (planId) {
      const plan = mockInsurancePlans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      }
    }

    // Progress animation
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 300);

    // Simulate redirect after completion (in a real app, this would redirect to a payment gateway)
    const redirect = setTimeout(() => {
      // Replace this with actual redirection logic
      // For now, we'll just log a message
      console.log('Redirecting to payment gateway...');
    }, 7000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [location.state, navigate]);

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center bg-[#f8f9fa] p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-cc-blue text-center mb-6">
          Finalizing Your Selection
        </h1>

        {/* Selected plan */}
        {selectedPlan && (
          <div className="mb-8">
            <p className="text-center font-medium text-cc-green mb-2">
              That's an amazing choice!!
            </p>
            <InsurancePlanCard
              name={selectedPlan.name}
              provider={selectedPlan.provider}
              price={selectedPlan.price}
              isTopRecommendation={selectedPlan.isTopRecommendation}
              onSeeMore={() => {}}
              onBuyPlan={() => {}}
            />
          </div>
        )}

        {/* Progress bar */}
        <div className="mb-4">
          <Progress 
            value={progress} 
            className="h-2 bg-gray-100" 
          />
        </div>
        <p className="text-center text-sm text-gray-600">
          Redirecting you to view contract and confirm insurance plan
        </p>
      </div>
    </div>
  );
};

export default PurchaseNow;

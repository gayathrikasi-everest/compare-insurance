
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { mockInsurancePlans } from '@/data/mockData';
import { InsurancePlan } from '@/types';
import ProgressBar from '@/components/ProgressBar';
import { useToast } from "@/hooks/use-toast";

const PurchaseNow: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Define the steps for the progress bar
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
    completed: true,
    active: false
  }, {
    number: 3,
    title: 'Ask Questions',
    description: 'Get answers about your plans',
    completed: true,
    active: false
  }, {
    number: 4,
    title: 'Purchase Insurance',
    description: 'Buy your ideal insurance',
    completed: false,
    active: true
  }];

  useEffect(() => {
    // First try to get the plan from the state
    const planId = location.state?.planId;
    const planFromState = location.state?.planDetails;
    
    if (planFromState) {
      // Use the plan object passed directly in the state
      setSelectedPlan(planFromState);
    } else if (planId) {
      // Fallback: Find the plan in our mock data if only ID was passed
      const plan = mockInsurancePlans.find(p => p.id === planId);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        // Show error toast if plan not found
        toast({
          title: "Error",
          description: "Could not find the selected plan. Please try again.",
          variant: "destructive",
        });
        // Redirect back to recommendations
        setTimeout(() => navigate('/recommended-plans'), 2000);
      }
    } else {
      // No plan ID was passed, redirect back
      toast({
        title: "Error",
        description: "No plan was selected. Please choose a plan first.",
        variant: "destructive",
      });
      setTimeout(() => navigate('/recommended-plans'), 2000);
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
      console.log('Redirecting to payment gateway...');
    }, 7000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [location.state, navigate, toast]);

  return (
    <div className="h-[calc(100vh-56px)] flex bg-white overflow-hidden">
      {/* Left sidebar with progress */}
      <div className="w-1/4 bg-white/80 backdrop-blur-md p-6 border-r border-white/20 shadow-md">
        <ProgressBar steps={steps} currentStep={4} />
      </div>
      
      {/* Right content area */}
      <div className="w-3/4 flex flex-col items-center justify-center bg-[#f8f9fa] p-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-cc-blue text-center mb-6">
            Finalizing Your Selection
          </h1>

          {/* Selected plan - without buttons */}
          {selectedPlan && (
            <div className="mb-8">
              <p className="text-center font-medium text-cc-green mb-2">
                That's an amazing choice!!
              </p>
              <div className="rounded-xl bg-white border border-gray-200 p-4 relative mt-4">
                {selectedPlan.isTopRecommendation && (
                  <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-cc-green text-white text-xs px-3 py-1 rounded-full z-10">
                    Best Match
                  </div>
                )}
                
                {/* Plan Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{selectedPlan.name}</h3>
                  <p className="text-sm text-gray-500">{selectedPlan.provider}</p>
                </div>
                
                {/* Price */}
                <div>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-gray-900">${selectedPlan.price}</span>
                    <span className="text-gray-500 ml-1 text-sm">/ month</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!selectedPlan && (
            <div className="text-center text-red-500 mb-4">
              Loading plan details...
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
    </div>
  );
};

export default PurchaseNow;

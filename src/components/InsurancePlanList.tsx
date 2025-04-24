
import React from 'react';
import InsurancePlanCard from '@/components/InsurancePlanCard';
import { InsurancePlan } from '@/types';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface InsurancePlanListProps {
  plans: Array<InsurancePlan>;
  expandedPlanId: string | null;
  onSeeMore: (planId: string) => void;
  onBuyPlan: (planId: string) => void;
  onRegenerateOptions?: () => void; // This is kept optional to fix TypeScript error
}

const InsurancePlanList: React.FC<InsurancePlanListProps> = ({
  plans,
  expandedPlanId,
  onSeeMore,
  onBuyPlan,
  onRegenerateOptions
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSeeMore = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      toast({
        title: plan.name,
        description: `Learn more about ${plan.name} by ${plan.provider}. This would show detailed plan information in a full implementation.`,
        duration: 5000,
      });
    }
    onSeeMore(planId);
  };

  const handleBuyPlan = (planId: string) => {
    // Find the plan to pass its complete data to the purchase page
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      // Navigate with the entire plan object instead of just the ID
      navigate('/purchase-now', { 
        state: { 
          planId: plan.id,
          planDetails: plan
        } 
      });
    } else {
      // Show error toast if plan not found
      toast({
        title: "Error",
        description: "Could not find the selected plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-[#1a3352]">Your recommended plans</h2>
      </div>
      
      {/* Cards container - using flex-1 to allow it to grow/shrink */}
      <div className="flex-1 overflow-y-auto mb-4">
        {plans.map((plan, index) => (
          <div key={plan.id} className="mb-6">
            <InsurancePlanCard
              name={plan.name}
              provider={plan.provider}
              price={plan.price}
              optionNumber={index + 1}
              isTopRecommendation={plan.isTopRecommendation}
              onSeeMore={() => handleSeeMore(plan.id)}
              onBuyPlan={() => handleBuyPlan(plan.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsurancePlanList;

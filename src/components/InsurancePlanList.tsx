
import React from 'react';
import InsurancePlanCard from '@/components/InsurancePlanCard';
import { InsurancePlan } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface InsurancePlanListProps {
  plans: Array<InsurancePlan & { isTopRecommendation?: boolean }>;
  expandedPlanId: string | null;
  onSeeMore: (planId: string) => void;
  onBuyPlan: (planId: string) => void;
  onRegenerateOptions: () => void;
}

const InsurancePlanList: React.FC<InsurancePlanListProps> = ({
  plans,
  expandedPlanId,
  onSeeMore,
  onBuyPlan,
  onRegenerateOptions
}) => {
  const { toast } = useToast();
  
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

  return (
    <div className="flex flex-col h-full relative">
      {/* Header - 10vh */}
      <div className="h-[10vh] flex items-center">
        <h2 className="text-2xl font-bold text-cc-blue">Your recommended plans</h2>
      </div>
      
      {/* Cards container */}
      <div className="overflow-y-auto pr-2 mb-16">
        <div className="flex flex-col space-y-4 pb-4">
          {plans.map(plan => (
            <InsurancePlanCard
              key={plan.id}
              name={plan.name}
              provider={plan.provider}
              price={plan.price}
              isTopRecommendation={plan.isTopRecommendation}
              onSeeMore={() => handleSeeMore(plan.id)}
              onBuyPlan={() => onBuyPlan(plan.id)}
            />
          ))}
        </div>
      </div>
      
      {/* "I don't like" button - fixed to the bottom of the viewport */}
      <div className="fixed bottom-0 left-0 w-[35%] p-4 bg-[#f8f9fa] border-t border-gray-100">
        <Button 
          variant="outline" 
          onClick={onRegenerateOptions}
          className="text-cc-blue border-cc-blue hover:bg-cc-light-blue backdrop-blur-md flex items-center gap-2 w-full"
        >
          <RefreshCw size={16} />
          I don't like these options
        </Button>
      </div>
    </div>
  );
};

export default InsurancePlanList;

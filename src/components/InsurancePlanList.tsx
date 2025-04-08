
import React from 'react';
import InsurancePlanCard from '@/components/InsurancePlanCard';
import ExpandedPlanDetails from '@/components/ExpandedPlanDetails';
import { InsurancePlan } from '@/types';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

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
  return (
    <div className="flex flex-col h-[100vh]">
      {/* Header - 10vh */}
      <div className="h-[10vh] flex items-center">
        <h2 className="text-2xl font-bold text-cc-blue">Your recommended plans</h2>
      </div>
      
      {/* Cards container - 85vh */}
      <div className="flex flex-col gap-3 h-[85vh] overflow-y-auto pr-2">
        {plans.map(plan => (
          <InsurancePlanCard
            key={plan.id}
            name={plan.name}
            provider={plan.provider}
            price={plan.price}
            isTopRecommendation={plan.isTopRecommendation}
            onSeeMore={() => onSeeMore(plan.id)}
            onBuyPlan={() => onBuyPlan(plan.id)}
          />
        ))}
        
        {expandedPlanId && (
          <ExpandedPlanDetails planId={expandedPlanId} plans={plans} />
        )}
      </div>
      
      {/* Footer with button - 5vh */}
      <div className="h-[5vh] flex items-center mt-auto">
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

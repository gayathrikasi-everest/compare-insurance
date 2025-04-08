
import React from 'react';
import InsurancePlanCard from '@/components/InsurancePlanCard';
import ExpandedPlanDetails from '@/components/ExpandedPlanDetails';
import { InsurancePlan } from '@/types';

interface InsurancePlanListProps {
  plans: Array<InsurancePlan & { isTopRecommendation?: boolean }>;
  expandedPlanId: string | null;
  onSeeMore: (planId: string) => void;
  onBuyPlan: (planId: string) => void;
}

const InsurancePlanList: React.FC<InsurancePlanListProps> = ({
  plans,
  expandedPlanId,
  onSeeMore,
  onBuyPlan
}) => {
  return (
    <div className="flex flex-col gap-4">
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
      
      <ExpandedPlanDetails planId={expandedPlanId} plans={plans} />
    </div>
  );
};

export default InsurancePlanList;

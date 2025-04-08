
import React from 'react';
import { Button } from '@/components/ui/button';

interface InsurancePlanProps {
  name: string;
  provider: string;
  price: number;
  onSeeMore: () => void;
  onBuyPlan: () => void;
}

const InsurancePlanCard: React.FC<InsurancePlanProps> = ({
  name,
  provider,
  price,
  onSeeMore,
  onBuyPlan
}) => {
  return (
    <div className="glass-card p-6 transition-all hover:shadow-xl">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold text-cc-blue">{name}</h3>
        <p className="text-gray-500">{provider}</p>
        
        <div className="my-4">
          <span className="text-2xl font-bold text-cc-blue">${price}</span>
          <span className="text-gray-500 ml-1">/ month</span>
        </div>
        
        <div className="flex flex-col space-y-3 mt-auto">
          <button 
            onClick={onSeeMore} 
            className="text-cc-green hover:text-cc-dark-green hover:underline text-sm font-medium"
          >
            see more
          </button>
          
          <Button 
            onClick={onBuyPlan}
            className="bg-cc-green hover:bg-cc-dark-green text-white w-full"
          >
            Buy plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsurancePlanCard;

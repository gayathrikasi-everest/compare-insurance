
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

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
        <div className="mb-3">
          <div className="h-6 w-20 bg-gray-100 rounded mb-2"></div>
          <h3 className="text-lg font-bold text-cc-blue">{name}</h3>
          <p className="text-sm text-gray-500">{provider}</p>
        </div>
        
        <div className="my-4 flex items-baseline">
          <span className="text-2xl font-bold text-cc-blue">${price}</span>
          <span className="text-gray-500 ml-1 text-sm">/ month</span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-start space-x-2 mb-2">
            <Check size={18} className="text-cc-green mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">Full hospital cover</p>
          </div>
          <div className="flex items-start space-x-2 mb-2">
            <Check size={18} className="text-cc-green mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">Extra dental benefits</p>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3 mt-auto">
          <button 
            onClick={onSeeMore} 
            className="text-cc-green hover:text-cc-dark-green hover:underline text-sm font-medium"
          >
            View details
          </button>
          
          <Button 
            onClick={onBuyPlan}
            className="bg-cc-green hover:bg-cc-dark-green text-white w-full font-medium"
          >
            Buy plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsurancePlanCard;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Tag } from 'lucide-react';

interface InsurancePlanProps {
  name: string;
  provider: string;
  price: number;
  isTopRecommendation?: boolean;
  onSeeMore: () => void;
  onBuyPlan: () => void;
}

const InsurancePlanCard: React.FC<InsurancePlanProps> = ({
  name,
  provider,
  price,
  isTopRecommendation = false,
  onSeeMore,
  onBuyPlan
}) => {
  return (
    <div className={`glass-card backdrop-blur-md bg-white/70 border border-white/20 shadow-xl p-6 transition-all hover:shadow-2xl ${isTopRecommendation ? 'ring-2 ring-cc-green' : ''}`}>
      <div className="flex flex-col h-full">
        {isTopRecommendation && (
          <div className="absolute -top-3 -right-2">
            <div className="bg-gradient-to-r from-cc-green to-cc-dark-green text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
              <Tag size={12} className="mr-1" />
              Best Match
            </div>
          </div>
        )}
        
        <div className="mb-3">
          <div className="h-6 w-20 bg-cc-light-green rounded-full mb-2"></div>
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
            className="bg-gradient-to-r from-cc-green to-cc-dark-green hover:opacity-90 text-white w-full font-medium shadow-md"
          >
            Buy plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsurancePlanCard;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Tag, ShoppingCart, Info } from 'lucide-react';

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
  return <div className={`glass-card backdrop-blur-md bg-white/70 border border-white/20 shadow-xl p-6 transition-all hover:shadow-2xl ${isTopRecommendation ? 'ring-2 ring-cc-green' : ''}`}>
      <div className="flex flex-col h-full">
        {isTopRecommendation && <div className="absolute -top-3 -right-2">
            <div className="bg-gradient-to-r from-cc-green to-cc-dark-green text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
              <Tag size={12} className="mr-1" />
              Best Match
            </div>
          </div>}
        
        <div className="mb-3">
          <div className="h-6 w-20 bg-cc-light-green rounded-full mb-2"></div>
          <h3 className="font-bold text-cc-blue text-base">{name}</h3>
          <p className="text-sm text-gray-500">{provider}</p>
        </div>
        
        <div className="my-4 flex items-baseline">
          <span className="font-bold text-cc-blue text-xl">${price}</span>
          <span className="text-gray-500 ml-1 text-sm">/ month</span>
        </div>
        
        <div className="mt-auto">
          {/* Buttons side by side */}
          <div className="flex space-x-2">
            <a 
              onClick={onSeeMore} 
              className="flex-1 text-cc-blue hover:text-cc-green cursor-pointer flex items-center justify-center gap-1 border border-cc-blue rounded-md py-2"
            >
              <Info size={16} />
              Learn more
            </a>
            
            <Button 
              onClick={onBuyPlan} 
              className="flex-1 bg-gradient-to-r from-cc-green to-cc-dark-green hover:opacity-90 text-white font-medium shadow-md flex items-center justify-center gap-1"
            >
              <ShoppingCart size={16} />
              Buy plan
            </Button>
          </div>
        </div>
      </div>
    </div>;
};

export default InsurancePlanCard;

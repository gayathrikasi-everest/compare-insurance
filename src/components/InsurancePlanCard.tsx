
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
  return (
    <div className={`glass-card backdrop-blur-md bg-white/70 border border-white/20 shadow-xl p-2 transition-all hover:shadow-2xl ${isTopRecommendation ? 'ring-2 ring-cc-green' : ''}`}>
      <div className="flex flex-col">
        {isTopRecommendation && 
          <div className="absolute -top-2 -right-2">
            <div className="bg-gradient-to-r from-cc-green to-cc-dark-green text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
              <Tag size={8} className="mr-1" />
              Best Match
            </div>
          </div>
        }
        
        <div className="flex justify-between items-start mb-1">
          <div>
            <div className="h-2 w-12 bg-cc-light-green rounded-full mb-1"></div>
            <h3 className="font-bold text-cc-blue text-xs">{name}</h3>
            <p className="text-xs text-gray-500">{provider}</p>
          </div>
          <div className="flex items-baseline">
            <span className="font-bold text-cc-blue text-base">${price}</span>
            <span className="text-gray-500 ml-1 text-xs">/ mo</span>
          </div>
        </div>
        
        <div className="flex space-x-1 mt-1">
          <a 
            onClick={onSeeMore} 
            className="flex-1 text-cc-blue hover:text-cc-green cursor-pointer flex items-center justify-center gap-1 border border-cc-blue rounded-md py-0.5 text-xs"
          >
            <Info size={10} />
            Learn more
          </a>
          
          <Button 
            onClick={onBuyPlan} 
            className="flex-1 bg-gradient-to-r from-cc-green to-cc-dark-green hover:opacity-90 text-white font-medium shadow-md flex items-center justify-center gap-1 h-5 text-xs"
          >
            <ShoppingCart size={10} />
            Buy plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InsurancePlanCard;

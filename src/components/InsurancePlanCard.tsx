
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info } from 'lucide-react';

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
    <div className={`rounded-xl bg-white border ${isTopRecommendation ? 'border-cc-green' : 'border-gray-200'} p-4 relative mt-4`}>
      {/* Best Match Badge */}
      {isTopRecommendation && (
        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-cc-green text-white text-xs px-3 py-1 rounded-full z-10">
          Best Match
        </div>
      )}
      
      {/* Plan Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{provider}</p>
      </div>
      
      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500 ml-1 text-sm">/ month</span>
        </div>
      </div>
      
      {/* Action Buttons - Side by side */}
      <div className="flex gap-2">
        <Button 
          variant="outline"
          onClick={onSeeMore} 
          className="flex-1 border-cc-blue text-cc-blue hover:bg-cc-light-blue"
        >
          <Info size={16} className="mr-1" />
          Learn more
        </Button>
        
        <Button 
          onClick={onBuyPlan} 
          className="flex-1 bg-cc-green hover:bg-cc-dark-green text-white"
        >
          <ShoppingCart size={16} className="mr-1" />
          Buy plan
        </Button>
      </div>
    </div>
  );
};

export default InsurancePlanCard;

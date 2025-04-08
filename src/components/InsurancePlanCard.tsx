
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
    <div className={`rounded-xl bg-white border ${isTopRecommendation ? 'border-cc-green' : 'border-gray-200'} p-4 relative`}>
      {/* Best Match Badge */}
      {isTopRecommendation && (
        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-cc-green text-white text-xs px-3 py-1 rounded-full">
          Best Match
        </div>
      )}
      
      {/* Plan Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{provider}</p>
      </div>
      
      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-gray-900">${price}</span>
          <span className="text-gray-500 ml-1 text-sm">/ month</span>
        </div>
      </div>
      
      {/* Action Buttons - Learn more and Buy plan */}
      <div className="flex flex-col gap-2">
        <div 
          onClick={onSeeMore} 
          className="flex justify-center items-center cursor-pointer text-cc-blue hover:text-cc-green"
        >
          <Info size={16} className="mr-1" />
          <span className="text-sm">Learn more</span>
        </div>
        
        <Button 
          onClick={onBuyPlan} 
          className="w-full bg-cc-green hover:bg-cc-dark-green text-white"
        >
          <ShoppingCart size={16} className="mr-2" />
          Buy plan
        </Button>
      </div>
    </div>
  );
};

export default InsurancePlanCard;

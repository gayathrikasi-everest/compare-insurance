
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Info } from 'lucide-react';

interface InsurancePlanProps {
  name: string;
  provider: string;
  price: number;
  optionNumber?: number;
  isTopRecommendation?: boolean;
  onSeeMore: () => void;
  onBuyPlan: () => void;
}

const InsurancePlanCard: React.FC<InsurancePlanProps> = ({
  name,
  provider,
  price,
  optionNumber,
  isTopRecommendation = false,
  onSeeMore,
  onBuyPlan
}) => {
  // Get the badge color based on the option number
  const getBadgeColor = () => {
    switch(optionNumber) {
      case 1:
        return 'bg-[#00b67a]'; // Green for option 1
      case 2:
        return 'bg-[#3a86ff]'; // Blue for option 2
      case 3:
        return 'bg-[#8338ec]'; // Purple for option 3
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`rounded-xl bg-white border ${isTopRecommendation ? 'border-[#00b67a]' : 'border-gray-200'} p-4 relative mt-4`}>
      {/* Option Number Badge */}
      {optionNumber && (
        <Badge className={`absolute top-0 left-4 transform -translate-y-1/2 ${getBadgeColor()} text-white px-3 py-1 z-10`}>
          Option {optionNumber}
        </Badge>
      )}
      
      {/* Best Match Badge */}
      {isTopRecommendation && (
        <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#00b67a] text-white text-xs px-3 py-1 rounded-full z-10">
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
          className="flex-1 border-[#1a3352] text-[#1a3352] hover:bg-[#e5f1ff]"
        >
          <Info size={16} className="mr-1" />
          Learn more
        </Button>
        
        <Button 
          onClick={onBuyPlan} 
          className="flex-1 bg-[#00b67a] hover:bg-[#018e5f] text-white"
        >
          <ShoppingCart size={16} className="mr-1" />
          Buy plan
        </Button>
      </div>
    </div>
  );
};

export default InsurancePlanCard;

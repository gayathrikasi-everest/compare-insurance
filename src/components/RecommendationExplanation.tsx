
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecommendationExplanationProps {
  recommendationText: string;
}

const RecommendationExplanation: React.FC<RecommendationExplanationProps> = ({ recommendationText }) => {
  return (
    <div className="h-full">
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="pr-4">
          <h3 className="text-lg font-bold text-cc-blue mb-4">Your Personalized Recommendation</h3>
          <p className="text-gray-700 whitespace-pre-line">{recommendationText}</p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecommendationExplanation;

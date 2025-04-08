
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecommendationExplanationProps {
  recommendationText: string;
}

const RecommendationExplanation: React.FC<RecommendationExplanationProps> = ({ recommendationText }) => {
  return (
    <div className="glass-card backdrop-blur-md bg-white/70 border border-white/20 shadow-xl p-6 h-full">
      <ScrollArea className="h-[600px]">
        <div className="pr-4">
          <h3 className="text-lg font-bold text-cc-blue mb-4">Your Personalized Recommendation</h3>
          <p className="text-gray-700 whitespace-pre-line">{recommendationText}</p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecommendationExplanation;

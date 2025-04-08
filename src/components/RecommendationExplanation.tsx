
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RecommendationExplanationProps {
  recommendationText: string;
}

const RecommendationExplanation: React.FC<RecommendationExplanationProps> = ({ recommendationText }) => {
  // Function to format text with asterisks as bold
  const formatTextWithBold = (text: string) => {
    // Split the text by the bold marker pattern **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      // Check if this part is wrapped in ** markers
      if (part.startsWith('**') && part.endsWith('**')) {
        // Remove the ** markers and wrap the content in a <strong> tag
        const boldText = part.substring(2, part.length - 2);
        return <strong key={index}>{boldText}</strong>;
      }
      // Return regular text
      return part;
    });
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="pr-4">
          <h3 className="text-lg font-bold text-cc-blue mb-4">Your Personalized Recommendation</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {formatTextWithBold(recommendationText)}
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecommendationExplanation;


import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface RecommendationExplanationProps {
  recommendationText: string;
  onAskQuestions: () => void;
}

const RecommendationExplanation: React.FC<RecommendationExplanationProps> = ({ 
  recommendationText, 
  onAskQuestions 
}) => {
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
    <div className="h-full flex flex-col">
      {/* Header area - 10vh to match the left column */}
      <div className="h-[10vh]">
        <h3 className="text-lg font-bold text-cc-blue">Your Personalized Recommendation</h3>
      </div>
      
      {/* Content area - 85vh to match cards container */}
      <ScrollArea className="h-[85vh] pr-4">
        <div className="pr-4">
          <p className="text-gray-700 whitespace-pre-line mb-6">
            {formatTextWithBold(recommendationText)}
          </p>
        </div>
      </ScrollArea>
      
      {/* Footer area - 5vh to match the bottom button */}
      <div className="h-[5vh] mt-auto">
        <Button 
          onClick={onAskQuestions}
          className="bg-green-500 hover:bg-green-600 text-white shadow-md flex items-center gap-2 w-full"
        >
          <MessageCircle size={16} />
          Ask questions about these plans
        </Button>
      </div>
    </div>
  );
};

export default RecommendationExplanation;

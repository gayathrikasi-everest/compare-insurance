
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

  // Format numbered explanations for readability
  const formatNumberedExplanations = (text: string) => {
    const paragraphs = text.split('\n\n');
    
    return (
      <>
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-bold text-cc-blue">Your Personalized Recommendation</h3>
          <div className="bg-green-50 px-3 py-1 rounded-full text-green-800 text-xs font-medium inline-flex items-center ml-3">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            AI powered suggestions
          </div>
        </div>
        
        {/* Introduction paragraph */}
        <p className="text-gray-700 mb-6">
          {formatTextWithBold(paragraphs[0] || '')}
        </p>
        
        {/* Numbered points with bold policy names */}
        <div className="space-y-6">
          {paragraphs.slice(1).map((paragraph, index) => {
            if (paragraph.trim().match(/^\d+\.\s/)) {
              return (
                <div key={index} className="border-l-2 border-cc-blue pl-3">
                  <p className="text-gray-700">{formatTextWithBold(paragraph)}</p>
                </div>
              );
            }
            return <p key={index} className="text-gray-700 mt-6">{formatTextWithBold(paragraph)}</p>;
          })}
        </div>
      </>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header area - 10vh to match the left column */}
      <div className="h-[10vh]">
        {/* Empty space to match height */}
      </div>
      
      {/* Content area - 80vh to match cards container + space for still have doubts */}
      <ScrollArea className="h-[80vh] pr-4">
        <div className="pr-4">
          {formatNumberedExplanations(recommendationText)}
        </div>
      </ScrollArea>
      
      {/* "Still have doubts" section - 10vh to match the regenerate button */}
      <div className="h-[10vh] mt-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between">
          <p className="text-gray-900 font-medium">Still have doubts? We get it.</p>
          <Button 
            onClick={onAskQuestions}
            className="bg-cc-green hover:bg-cc-dark-green text-white shadow-md flex items-center gap-2"
          >
            <MessageCircle size={16} />
            Ask questions about these plans
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationExplanation;

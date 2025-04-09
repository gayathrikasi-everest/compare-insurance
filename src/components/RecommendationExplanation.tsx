
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
          <h3 className="text-lg font-bold text-[#1a3352]">Your Personalized Recommendation</h3>
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
                <div key={index} className="border-l-2 border-[#1a3352] pl-3">
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
    <div className="flex flex-col h-full">
      {/* Content area - takes remaining space but leaves room for the bottom section */}
      <div className="flex-1 overflow-y-auto mb-4">
        <ScrollArea className="h-full pr-4">
          {formatNumberedExplanations(recommendationText)}
        </ScrollArea>
      </div>
      
      {/* "Still have doubts" section at the bottom */}
      <div className="border-t border-gray-100 bg-[#f8f9fa] py-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center justify-between">
          <p className="text-gray-900 font-medium">Still have doubts? We get it.</p>
          <Button 
            onClick={onAskQuestions}
            className="bg-[#E83F6F] hover:bg-[#d03861] text-white shadow-md flex items-center gap-2"
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

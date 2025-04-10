
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { MessageCircle, Star } from 'lucide-react';

interface RecommendationExplanationProps {
  recommendationText: string;
  onAskQuestions: () => void;
}

const RecommendationExplanation: React.FC<RecommendationExplanationProps> = ({
  recommendationText,
  onAskQuestions
}) => {
  return <div className="flex flex-col h-full">
      {/* Content area - takes remaining space but leaves room for the bottom section */}
      <div className="flex-1 overflow-y-auto mb-4">
        <ScrollArea className="h-full pr-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-[#1a3352]"></h3>
            <div className="bg-green-50 px-3 py-1 rounded-full text-green-800 text-xs font-medium inline-flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              AI powered suggestions
            </div>
          </div>
          
          {/* Introduction paragraph */}
          <p className="text-gray-700 mb-6">
            Based on your profile as a young couple with a 2-year-old child and another baby on the way, your health insurance needs will focus on comprehensive coverage for both hospital and extras services, particularly those related to pregnancy, childbirth, and pediatric care.
          </p>
          
          {/* Numbered points with option badges and details */}
          <div className="space-y-6">
            {/* Option 1 */}
            <div className="border-l-4 border-[#00b67a] pl-4">
              <div className="flex items-start mb-2">
                <div className="bg-[#00b67a] text-white text-xs px-2 py-1 rounded mr-2">
                  Option 1
                </div>
                <div className="bg-[#00b67a] text-white text-xs px-2 py-1 rounded mr-2 flex items-center">
                  <Star size={12} className="mr-1" /> Best Match
                </div>
                <div>
                  <strong className="text-gray-900">1. Medibank Gold Protect and Growing Family 60 (Policy ID: 5):</strong>
                </div>
              </div>
              <p className="text-gray-700">
                This combined policy offers extensive hospital coverage, including pregnancy and birth services, which is crucial for your expanding family. The extras cover includes dental, optical, and physiotherapy, which are beneficial for both adults and children. However, the premium is relatively high at $650 per month, and there are waiting periods for certain services, particularly for pre-existing conditions and pregnancy-related claims.
              </p>
            </div>
            
            {/* Option 2 */}
            <div className="border-l-4 border-[#1E293B] pl-4">
              <div className="flex items-start mb-2">
                <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded mr-2">
                  Option 2
                </div>
                <div>
                  <strong className="text-gray-900">2. HCF My Family Silver Plus (Policy ID: 3):</strong>
                </div>
              </div>
              <p className="text-gray-700">
                This policy provides a good balance of hospital and extras coverage, including pregnancy and birth services. The premium is slightly higher at $780 per month, but it offers a wide range of covered procedures and flexible extras. The waiting periods are standard, but the policy does have some exclusions, such as certain high-cost treatments.
              </p>
            </div>
            
            {/* Option 3 */}
            <div className="border-l-4 border-[#3DA6E1] pl-4">
              <div className="flex items-start mb-2">
                <div className="bg-[#3DA6E1] text-white text-xs px-2 py-1 rounded mr-2">
                  Option 3
                </div>
                <div>
                  <strong className="text-gray-900">3. Bupa Gold Comprehensive Hospital + Freedom 60 Extras (Policy ID: 2):</strong>
                </div>
              </div>
              <p className="text-gray-700">
                This is a robust option with extensive hospital cover and a wide range of extras. It includes comprehensive maternity services and pediatric care, which are essential for your family. The total premium is $771.30 per month, which is competitive given the extensive coverage. However, there are potential out-of-pocket costs at non-agreement hospitals, and some services may have waiting periods.
              </p>
            </div>
            
            {/* Recommendation summary */}
            <p className="text-gray-700 mt-6">
              After evaluating these options, the <strong>Medibank Gold Protect and Growing Family 60</strong> policy stands out as the top recommendation due to its comprehensive coverage for both hospital and extras, particularly for your current and future family needs. While the premium is high, the extensive benefits and coverage for pregnancy and child-related services justify the cost, making it the best fit for your situation.
            </p>
          </div>
        </ScrollArea>
      </div>
      
      {/* "Ask questions" button at the bottom, centered */}
      <div className="border-t border-gray-100 bg-[#f8f9fa] py-4 flex justify-center">
        <Button onClick={onAskQuestions} className="bg-[#00b67a] hover:bg-[#018e5f] text-white shadow-md flex items-center gap-2 text-lg py-7 px-6">
          <MessageCircle size={20} />
          Ask questions about these plans
        </Button>
      </div>
    </div>;
};

export default RecommendationExplanation;

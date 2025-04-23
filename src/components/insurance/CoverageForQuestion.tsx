
import React from 'react';
import { CoverageFor } from '@/types';

interface CoverageForQuestionProps {
  selectedCoverageFor?: CoverageFor;
  onSelect: (coverageFor: CoverageFor) => void;
}

const CoverageForQuestion: React.FC<CoverageForQuestionProps> = ({ selectedCoverageFor, onSelect }) => {
  const options: { type: CoverageFor; emoji: string }[] = [
    { type: 'Myself only', emoji: '🙋‍♂️' },
    { type: 'Couple / Family', emoji: '👨‍👩‍👧' },
    { type: 'Single Parent Family', emoji: '👩‍👧' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-cc-blue">2. Who will be covered under this policy?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <div 
            key={option.type}
            className={`p-6 border rounded-xl cursor-pointer transition-all text-center ${
              selectedCoverageFor === option.type
                ? 'border-cc-green bg-green-50 shadow-md'
                : 'border-gray-200 hover:border-cc-green/50 hover:bg-gray-50'
            }`}
            onClick={() => onSelect(option.type)}
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              <span className="text-4xl">{option.emoji}</span>
              <h4 className="font-medium text-gray-900">{option.type}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverageForQuestion;

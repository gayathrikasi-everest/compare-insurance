
import React from 'react';
import { CoverType } from '@/types';

interface CoverTypeQuestionProps {
  selectedCoverType?: CoverType;
  onSelect: (coverType: CoverType) => void;
}

const CoverTypeQuestion: React.FC<CoverTypeQuestionProps> = ({ selectedCoverType, onSelect }) => {
  const options: { type: CoverType; emoji: string; description?: string; isPopular?: boolean }[] = [
    { type: 'Hospital Only', emoji: '🏥' },
    { 
      type: 'Extras Only', 
      emoji: '🦷', 
      description: 'Includes Dental, Optical, Physiotherapy, Psychology, Chiropractic, etc.' 
    },
    { type: 'Hospital + Extras', emoji: '💼', isPopular: true },
    { type: 'I don\'t know yet', emoji: '❓' },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-cc-blue">1. What type of cover do you need?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div 
            key={option.type}
            className={`relative p-6 border rounded-xl cursor-pointer transition-all ${
              selectedCoverType === option.type
                ? 'border-cc-green bg-green-50 shadow-md'
                : 'border-gray-200 hover:border-cc-green/50 hover:bg-gray-50'
            }`}
            onClick={() => onSelect(option.type)}
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{option.emoji}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{option.type}</h4>
                {option.description && (
                  <p className="text-sm text-gray-500">{option.description}</p>
                )}
              </div>
            </div>
            {option.isPopular && (
              <div className="absolute -top-2 -right-2 bg-cc-green text-white text-xs px-2 py-1 rounded-full">
                Most Popular
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverTypeQuestion;

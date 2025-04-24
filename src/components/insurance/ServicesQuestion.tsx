
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ServicesQuestionProps {
  title: string;
  questionNumber: number;
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
}

const ServicesQuestion: React.FC<ServicesQuestionProps> = ({ 
  title, 
  questionNumber, 
  options, 
  selectedOptions, 
  onToggle 
}) => {
  const getDescription = () => {
    if (title.toLowerCase().includes('hospital')) {
      return "Select the hospital services that matter most to you. This helps us find plans with the right level of hospital coverage.";
    }
    return "Choose the extras services you use regularly. This ensures your plan includes coverage for your day-to-day health needs.";
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-cc-blue">{`${questionNumber}. ${title}`}</h3>
        <p className="text-gray-600">{getDescription()}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => (
          <div key={option} className="flex items-start space-x-2">
            <Checkbox 
              id={`option-${option}`}
              checked={selectedOptions.includes(option)} 
              onCheckedChange={() => onToggle(option)}
            />
            <Label 
              htmlFor={`option-${option}`}
              className="text-gray-700 font-medium cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesQuestion;


import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HospitalService, ExtraService } from '@/types';

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
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-cc-blue">{`${questionNumber}. ${title}`}</h3>
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

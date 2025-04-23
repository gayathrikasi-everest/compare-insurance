
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Step {currentStep} of {totalSteps}</span>
        <span className="font-medium text-cc-blue">{progress}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default FormProgress;

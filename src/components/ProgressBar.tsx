
import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  title: string;
  description?: string;
  completed: boolean;
  active: boolean;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative pt-8 pb-12">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        return (
          <div key={step.number} className="relative mb-16">
            {!isLast && (
              <div 
                className={cn(
                  "progress-line h-16", 
                  index < currentStep - 1 ? "progress-line-active" : ""
                )}
              />
            )}
            
            <div className="flex items-center">
              <div 
                className={cn(
                  "progress-step",
                  step.active ? "progress-step-active" : "progress-step-inactive"
                )}
              >
                {step.number}
              </div>
              
              <div className="ml-4">
                <h3 className="font-semibold text-lg text-cc-blue">{step.title}</h3>
                {step.description && (
                  <p className="text-sm text-gray-600 mt-1 max-w-xs">{step.description}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;

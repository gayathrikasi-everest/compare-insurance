
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Circle } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative py-4 max-w-xs">
      <h1 className="text-2xl font-bold text-cc-blue mb-8">Find Your Ideal Health Plan</h1>
      
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        return (
          <div key={step.number} className="relative">
            {/* Connecting Line */}
            {!isLast && (
              <div 
                className={cn(
                  "absolute h-16 w-0.5 left-7 top-14 -z-10",
                  step.completed ? "bg-cc-green" : "bg-gray-200"
                )}
              />
            )}
            
            <div className="flex items-start mb-8">
              {/* Step Circle */}
              <div 
                className={cn(
                  "flex items-center justify-center w-14 h-14 rounded-full text-lg font-semibold mr-4",
                  step.completed ? "bg-cc-light-green text-cc-green" : 
                  step.active ? "bg-cc-green text-white" : 
                  "bg-gray-100 text-gray-400"
                )}
              >
                {step.completed ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.number
                )}
              </div>
              
              {/* Step Text */}
              <div>
                <h3 className={cn(
                  "font-semibold text-lg",
                  step.active || step.completed ? "text-cc-blue" : "text-gray-500"
                )}>
                  {step.title}
                </h3>
                <p className="text-gray-500 mt-1">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Trust Badge */}
      <div className="mt-10 bg-gray-100 rounded-xl p-4">
        <div className="flex items-center">
          <div className="bg-cc-green rounded-full p-2 mr-4">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-cc-blue font-semibold text-lg">Trusted by 400,000+ Australians</p>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>{star}</span>
                ))}
              </div>
              <span className="ml-2 text-gray-700">4.6/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

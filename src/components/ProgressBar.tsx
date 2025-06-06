import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Circle, Edit } from 'lucide-react';
import { UserInfo } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  onEditInfoClick?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  onEditInfoClick
}) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"query": ""}') as UserInfo;
  const navigate = useNavigate();
  
  const handleEditInfo = () => {
    if (onEditInfoClick) {
      onEditInfoClick();
    } else {
      navigate('/understanding-you');
    }
  };
  
  return (
    <div className="relative py-4 max-w-xs">
      <h1 className="text-2xl font-bold text-[#1a3352] mb-8">Find Your Ideal Health Plan</h1>
      
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const showUserQuery = step.number === 1 && step.completed && userInfo.query;
        
        return (
          <div key={step.number} className="relative">
            {!isLast && (
              <div 
                className={cn(
                  "absolute h-full w-0.5 left-7 top-14 -z-10", 
                  step.completed ? "bg-[#00b67a]" : "bg-gray-200"
                )} 
              />
            )}
            
            <div className="flex items-start mb-8">
              <div 
                className={cn(
                  "flex items-center justify-center w-14 h-14 rounded-full text-lg font-semibold mr-4 flex-shrink-0", 
                  step.completed ? "bg-[#e0f7ef] text-[#00b67a] border border-[#00b67a]" : 
                  step.active ? "bg-[#00b67a] text-white" : 
                  "bg-gray-100 text-gray-400"
                )}
              >
                {step.completed ? <Check className="w-6 h-6" /> : step.number}
              </div>
              
              <div className="bg-transparent flex-1">
                <h3 className={cn(
                  "font-semibold text-lg", 
                  step.active || step.completed ? "text-[#1a3352]" : "text-gray-500"
                )}>
                  {step.title}
                </h3>
                <p className="text-gray-500 mt-1">
                  {step.description}
                </p>
                
                {step.number === 1 && step.completed && (
                  <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                    {userInfo.query && (
                      <p className="mb-3">{userInfo.query}</p>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={handleEditInfo} 
                      className="text-[#1a3352] border-[#1a3352] hover:bg-[#e5f1ff] flex items-center gap-2 w-full justify-center"
                    >
                      <Edit className="h-4 w-4" />
                      Edit information
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      <div className="mt-10 bg-gray-100 rounded-md p-4">
        <div className="flex items-center">
          <div className="rounded-md p-2 mr-4 bg-slate-800">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-[#1a3352] font-semibold text-lg">Trusted by 400,000+ Australians</p>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
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

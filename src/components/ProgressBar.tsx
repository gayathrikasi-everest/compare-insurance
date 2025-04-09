import React from 'react';
import { cn } from '@/lib/utils';
import { Check, Circle, ArrowLeft } from 'lucide-react';
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
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep
}) => {
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"query": ""}') as UserInfo;
  const navigate = useNavigate();
  const handleEditInfo = () => {
    navigate('/understanding-you');
  };
  return <div className="relative py-4 max-w-xs">
      <h1 className="text-2xl font-bold text-cc-blue mb-8">Find Your Ideal Health Plan</h1>
      
      {steps.map((step, index) => {
      const isLast = index === steps.length - 1;
      const showUserQuery = step.number === 1 && step.completed && userInfo.query;
      return <div key={step.number} className="relative">
            {/* Connecting Line - Adjusted height to connect steps properly */}
            {!isLast && <div className={cn("absolute h-full w-0.5 left-7 top-14 -z-10", step.completed ? "bg-cc-green" : "bg-gray-200")} />}
            
            <div className="flex items-start mb-8">
              {/* Step Circle */}
              <div className={cn("flex items-center justify-center w-14 h-14 rounded-full text-lg font-semibold mr-4", step.completed ? "bg-cc-light-green text-cc-green" : step.active ? "bg-cc-green text-white" : "bg-gray-100 text-gray-400")}>
                {step.completed ? <Check className="w-6 h-6" /> : step.number}
              </div>
              
              {/* Step Text */}
              <div className="bg-transparent">
                <h3 className={cn("font-semibold text-lg", step.active || step.completed ? "text-cc-blue" : "text-gray-500")}>
                  {step.title}
                </h3>
                <p className="text-gray-500 mt-1">
                  {step.description}
                </p>
                
                {/* User Query Display */}
                {showUserQuery && <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                    {userInfo.query}
                    
                    {/* Edit info button */}
                    <Button variant="outline" onClick={handleEditInfo} className="mt-3 text-cc-blue border-cc-blue hover:bg-cc-light-blue flex items-center gap-2">
                      <ArrowLeft size={16} />
                      Edit info
                    </Button>
                  </div>}
              </div>
            </div>
          </div>;
    })}
      
      {/* Trust Badge */}
      <div className="mt-10 bg-gray-100 rounded-md p-4">
        <div className="flex items-center">
          <div className="rounded-md p-2 mr-4 bg-slate-800">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-cc-blue font-semibold text-lg">Trusted by 400,000+ Australians</p>
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
              </div>
              <span className="ml-2 text-gray-700">4.6/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ProgressBar;
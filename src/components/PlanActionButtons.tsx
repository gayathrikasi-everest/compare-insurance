
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, MessageCircle } from 'lucide-react';

interface PlanActionButtonsProps {
  onRegenerateOptions: () => void;
  onAskQuestions: () => void;
}

const PlanActionButtons: React.FC<PlanActionButtonsProps> = ({ 
  onRegenerateOptions,
  onAskQuestions
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
      <Button 
        variant="outline" 
        onClick={onRegenerateOptions}
        className="text-cc-blue border-cc-blue hover:bg-cc-light-blue backdrop-blur-md flex items-center gap-2"
      >
        <RefreshCw size={16} />
        I don't like these options
      </Button>
      
      <Button 
        onClick={onAskQuestions}
        className="bg-gradient-to-r from-cc-green to-cc-dark-green hover:opacity-90 text-white shadow-md flex items-center gap-2"
      >
        <MessageCircle size={16} />
        Ask questions about these plans
      </Button>
    </div>
  );
};

export default PlanActionButtons;

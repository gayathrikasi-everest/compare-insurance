
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface PlanActionButtonsProps {
  onAskQuestions: () => void;
}

const PlanActionButtons: React.FC<PlanActionButtonsProps> = ({ 
  onAskQuestions
}) => {
  return (
    <div className="flex justify-end gap-4 mt-8">
      <Button 
        onClick={onAskQuestions}
        className="bg-[#E83F6F] hover:bg-[#d03861] text-white shadow-md flex items-center gap-2"
      >
        <MessageCircle size={16} />
        Ask questions about these plans
      </Button>
    </div>
  );
};

export default PlanActionButtons;

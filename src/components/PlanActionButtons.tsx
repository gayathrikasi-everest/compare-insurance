
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
    <div className="flex justify-center mt-8">
      <Button 
        onClick={onAskQuestions}
        className="bg-[#E83F6F] hover:bg-[#d03861] text-white shadow-md flex items-center gap-2 text-[1.15em] py-6 px-5"
      >
        <MessageCircle size={18} />
        Ask questions about these plans
      </Button>
    </div>
  );
};

export default PlanActionButtons;

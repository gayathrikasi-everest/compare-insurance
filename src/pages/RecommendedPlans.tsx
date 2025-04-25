import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import { UserInfo } from '@/types';
import InsurancePlanList from '@/components/InsurancePlanList';
import RecommendationExplanation from '@/components/RecommendationExplanation';
import { recommendedInsurancePlans, recommendationText } from '@/data/mockData';
import { Toaster } from "@/components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const RecommendedPlans: React.FC = () => {
  const navigate = useNavigate();
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);
  const [showEditConfirmDialog, setShowEditConfirmDialog] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"query": ""}') as UserInfo;
  const steps = [
    {
      number: 1,
      title: 'Understanding You',
      description: 'Tell us about your needs',
      completed: true,
      active: false
    },
    {
      number: 2,
      title: 'Recommended Plans',
      description: 'Review your top options',
      completed: false,
      active: true
    },
    {
      number: 3,
      title: 'Ask Questions',
      description: 'Get answers about your plans',
      completed: false,
      active: false
    },
    {
      number: 4,
      title: 'Purchase Insurance',
      description: 'Buy your ideal insurance',
      completed: false,
      active: false
    }
  ];

  const handleSeeMore = (planId: string) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  const handleBuyPlan = (planId: string) => {
    navigate('/purchase-now', {
      state: {
        planId
      }
    });
  };

  const handleAskQuestions = () => {
    navigate('/chat-plans');
  };
  
  const handleEditConfirm = () => {
    navigate('/understanding-you', { state: { showAcknowledgment: true } });
    setShowEditConfirmDialog(false);
  };

  return <>
      <div className="h-[calc(100vh-56px)] flex bg-white overflow-hidden">
        {/* Left sidebar with progress */}
        <div className="w-1/4 bg-white/80 backdrop-blur-md p-6 border-r border-white/20 shadow-md">
          <ProgressBar 
            steps={steps} 
            currentStep={2} 
            onEditInfoClick={() => setShowEditConfirmDialog(true)} 
          />
        </div>
        
        {/* Right content area */}
        <div className="w-3/4 flex bg-[#f8f9fa] my-0 py-[10px] px-[10px]">
          {/* Left column: Insurance plan cards - 35% width */}
          <div className="w-[35%] p-4 flex flex-col h-full">
            <InsurancePlanList 
              plans={recommendedInsurancePlans} 
              expandedPlanId={expandedPlanId} 
              onSeeMore={handleSeeMore} 
              onBuyPlan={handleBuyPlan} 
            />
          </div>
          
          {/* Right column: Recommendation explanation - 65% width */}
          <div className="w-[65%] p-4 flex flex-col h-full">
            <RecommendationExplanation 
              recommendationText={recommendationText} 
              onAskQuestions={handleAskQuestions} 
            />
          </div>
        </div>
      </div>
      
      {/* Edit Info Confirmation Dialog */}
      <Dialog open={showEditConfirmDialog} onOpenChange={setShowEditConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit your information?</DialogTitle>
            <DialogDescription>
              Are you sure you want to go back to edit the info you provided?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditConfirmDialog(false)}>
              No
            </Button>
            <Button onClick={handleEditConfirm}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Toaster />
    </>;
};

export default RecommendedPlans;

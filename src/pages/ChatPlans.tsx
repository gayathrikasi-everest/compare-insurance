import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/components/ProgressBar';
import { UserInfo } from '@/types';
import InsurancePlanList from '@/components/InsurancePlanList';
import ChatInterface from '@/components/ChatInterface';
import { recommendedInsurancePlans } from '@/data/mockData';
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
const ChatPlans: React.FC = () => {
  const navigate = useNavigate();
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

  // In a real app, this would come from an API based on user input
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{"query": ""}') as UserInfo;
  const steps = [{
    number: 1,
    title: 'Understanding You',
    description: 'Tell us about your needs',
    completed: true,
    active: false
  }, {
    number: 2,
    title: 'Recommended Plans',
    description: 'Review your top options',
    completed: true,
    active: false
  }, {
    number: 3,
    title: 'Ask Questions',
    description: 'Get answers about your plans',
    completed: false,
    active: true
  }, {
    number: 4,
    title: 'Purchase Insurance',
    description: 'Buy your ideal insurance',
    completed: false,
    active: false
  }];
  const handleRegenerateOptions = () => {
    // In a real app, this would fetch new recommendations
    alert('This would regenerate new insurance options based on your preferences');
  };
  const handleSeeMore = (planId: string) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };
  const handleBuyPlan = (planId: string) => {
    alert(`In a real application, this would start the process to purchase plan ${planId}`);
  };
  const handleBack = () => {
    navigate('/recommended-plans');
  };

  // Extract plan names for the chat context
  const planNames = recommendedInsurancePlans.map(plan => plan.name);
  return <>
      
      <Toaster />
    </>;
};
export default ChatPlans;
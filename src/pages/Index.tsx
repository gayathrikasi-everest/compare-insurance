import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
const Index = () => {
  const navigate = useNavigate();
  const steps = [{
    number: 1,
    title: "Understanding you",
    description: "Tell us about your needs",
    completed: false,
    active: true
  }, {
    number: 2,
    title: "Recommended plans",
    description: "View your personalized options",
    completed: false,
    active: false
  }, {
    number: 3,
    title: "Ask questions",
    description: "Get expert answers",
    completed: false,
    active: false
  }];
  return <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4 md:p-8">
      <div className="w-full md:w-1/2 max-w-xl">
        <img src="/lovable-uploads/856d3ede-141c-42e6-9b25-045580f72363.png" alt="Insurance Illustration" className="w-[40%] max-w-[40%] mx-auto mb-8 object-scale-down" />
        <div className="text-center md:text-left mb-8">
          <h1 className="text-4xl font-bold text-cc-blue mb-4">Find Your Ideal Health Plan</h1>
          <p className="text-xl text-gray-600">We'll guide you through finding the perfect health insurance coverage for your needs.</p>
        </div>
        <Button onClick={() => navigate('/understanding-you')} className="w-full md:w-auto bg-gradient-to-r from-cc-green to-cc-green/80 hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl shadow-lg backdrop-blur-sm border border-white/20">
          Start Comparing Now <ArrowRight className="ml-2" />
        </Button>
      </div>
      
      <div className="w-full md:w-1/2 max-w-md mt-16 md:mt-0">
        <ProgressBar steps={steps} currentStep={1} />
      </div>
    </div>;
};
export default Index;
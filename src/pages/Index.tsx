import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeDollarSign } from 'lucide-react';
import { Check } from 'lucide-react';
const Index = () => {
  const navigate = useNavigate();
  const steps = [{
    number: 1,
    title: "Understanding You",
    description: "Tell us about your needs",
    completed: false,
    active: true
  }, {
    number: 2,
    title: "Recommended Plans",
    description: "Review your top options",
    completed: false,
    active: false
  }, {
    number: 3,
    title: "Ask Questions",
    description: "Get answers about your plans",
    completed: false,
    active: false
  }, {
    number: 4,
    title: "Purchase Insurance",
    description: "Buy your ideal insurance",
    completed: false,
    active: false
  }];
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4 md:p-8">
      <div className="w-full max-w-5xl flex flex-col items-center">
        {/* Insurance Illustration */}
        <div className="mb-8">
          <img alt="Insurance Illustration" className="w-48 h-48 object-contain" src="/lovable-uploads/9979bce1-a280-4089-91eb-da4039a2faef.png" />
        </div>
        
        {/* Main Text */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cc-blue mb-4">Find Your Ideal Health Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl">Get personalised guidance to find the perfect health plan, with negotiated discounts that we pass on to you.</p>
        </div>
        
        {/* Action Button */}
        <div className="flex flex-col items-center">
          <Button onClick={() => navigate('/understanding-you')} className="bg-cc-green hover:opacity-90 text-white px-8 py-6 text-lg rounded-xl shadow-lg mb-2">
            Start Comparing Now <ArrowRight className="ml-2" />
          </Button>
          
          <div className="flex items-center justify-center text-sm text-cc-green mt-2">
            <BadgeDollarSign size={16} className="mr-2" />
            You only pay the insurer, not us
          </div>
        </div>
        
        {/* Process Steps */}
        <div className="w-full max-w-4xl flex justify-between items-start mb-16 mt-12">
          {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return <div key={index} className="relative flex flex-col items-center text-center">
                {/* Step Circle */}
                <div className={`flex items-center justify-center w-14 h-14 rounded-full text-lg font-semibold 
                  bg-[#0A1D39] bg-opacity-80 text-white`}>
                  {step.number}
                </div>
                
                {/* Step Title */}
                <div className="mt-3">
                  <h3 className="font-semibold text-cc-blue">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
                
                {/* Connecting Arrow */}
                {!isLast && <div className="absolute top-7 left-full w-20 h-0.5 bg-gray-200 -z-10 transform translate-x-1">
                    <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>}
              </div>;
        })}
        </div>
        
        {/* Trust Badge */}
        <div className="border-2 border-cc-green rounded-md p-6 max-w-md">
          <div className="flex items-center">
            <div className="bg-cc-green rounded-md p-2 mr-4">
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
      </div>
    </div>;
};
export default Index;
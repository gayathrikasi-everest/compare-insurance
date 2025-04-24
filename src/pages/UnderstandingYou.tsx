import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FormData, UserInfo, CoverType, CoverageFor, HospitalService, ExtraService } from '@/types';
import { ArrowRight, ArrowLeft, SendHorizontal, Shield } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';
import FormProgress from '@/components/insurance/FormProgress';
import CoverTypeQuestion from '@/components/insurance/CoverTypeQuestion';
import CoverageForQuestion from '@/components/insurance/CoverageForQuestion';
import ServicesQuestion from '@/components/insurance/ServicesQuestion';
import PostcodeQuestion from '@/components/insurance/PostcodeQuestion';
import AcknowledgmentScreen from '@/components/insurance/AcknowledgmentScreen';
import ChatInput from '@/components/insurance/ChatInput';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
const UnderstandingYou: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    hospitalServices: [],
    extraServices: []
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [chatQuery, setChatQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();

  // Hospital and extra services options
  const hospitalServiceOptions: HospitalService[] = ['Maternity', 'Heart Surgery', 'Joint Replacements', 'Cancer Treatment', 'General Emergency Cover'];
  const extraServiceOptions: ExtraService[] = ['Dental', 'Optical', 'Physiotherapy', 'Psychology', 'Chiropractic'];

  // Calculate total steps based on cover type
  const getTotalSteps = (): number => {
    // Base steps: cover type, coverage for, and postcode
    let totalSteps = 4;

    // If cover type is Extras Only, we don't need the hospital services question
    if (formData.coverType === 'Extras Only') {
      return totalSteps;
    }

    // If cover type is Hospital Only, we don't need the extras services question
    if (formData.coverType === 'Hospital Only') {
      return totalSteps;
    }

    // For Hospital + Extras or I don't know yet, include both questions
    return totalSteps + 1;
  };

  // Load saved form data if exists
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      const userInfo = JSON.parse(savedUserInfo) as UserInfo;
      if (userInfo.formData) {
        setFormData(userInfo.formData);
      } else if (userInfo.query) {
        setChatQuery(userInfo.query);
      }
    }
  }, []);
  const handleCoverTypeSelect = (coverType: CoverType) => {
    setFormData(prev => ({
      ...prev,
      coverType
    }));
    handleNext();
  };
  const handleCoverageForSelect = (coverageFor: CoverageFor) => {
    setFormData(prev => ({
      ...prev,
      coverageFor
    }));
    handleNext();
  };
  const handleHospitalServiceToggle = (service: string) => {
    setFormData(prev => {
      const serviceArray = prev.hospitalServices || [];
      return {
        ...prev,
        hospitalServices: serviceArray.includes(service as HospitalService) ? serviceArray.filter(s => s !== service) : [...serviceArray, service as HospitalService]
      };
    });
  };
  const handleExtraServiceToggle = (service: string) => {
    setFormData(prev => {
      const serviceArray = prev.extraServices || [];
      return {
        ...prev,
        extraServices: serviceArray.includes(service as ExtraService) ? serviceArray.filter(s => s !== service) : [...serviceArray, service as ExtraService]
      };
    });
  };
  const handlePostcodeChange = (postcode: string) => {
    setFormData(prev => ({
      ...prev,
      postcode
    }));
  };
  const handleNext = () => {
    const totalSteps = getTotalSteps();
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      // All questions answered, show acknowledgment screen
      setCurrentStep(totalSteps + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleShowRecommendations = () => {
    setIsSubmitting(true);

    // Store form data in localStorage
    const userInfo: UserInfo = {
      formData,
      query: chatQuery || undefined
    };
    setTimeout(() => {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/recommended-plans');
      setIsSubmitting(false);
    }, 1000);
  };
  const handleAddMoreInfo = () => {
    setShowChat(true);
  };
  const handleEditInfo = () => {
    // Go back to the first question
    setCurrentStep(1);
  };
  const handleChatSubmit = (message: string) => {
    // Store the message
    setChatQuery(message);

    // Show a toast notification
    toast({
      title: "Message Received",
      description: "Thanks for providing more details!"
    });
  };
  const steps = [{
    number: 1,
    title: 'Understanding You',
    description: 'Tell us about your needs',
    completed: false,
    active: true
  }, {
    number: 2,
    title: 'Recommended Plans',
    description: 'Review your top options',
    completed: false,
    active: false
  }, {
    number: 3,
    title: 'Ask Questions',
    description: 'Get answers about your plans',
    completed: false,
    active: false
  }, {
    number: 4,
    title: 'Purchase Insurance',
    description: 'Buy your ideal insurance',
    completed: false,
    active: false
  }];
  const renderCurrentStep = () => {
    if (showChat) {
      return <ChatInput formData={formData} onSubmit={handleChatSubmit} onShowRecommendations={handleShowRecommendations} />;
    }
    const totalSteps = getTotalSteps();
    if (currentStep > totalSteps) {
      return <AcknowledgmentScreen formData={formData} onShowRecommendations={handleShowRecommendations} onAddMoreInfo={handleAddMoreInfo} onEditInfo={handleEditInfo} />;
    }
    switch (currentStep) {
      case 1:
        return <CoverTypeQuestion selectedCoverType={formData.coverType} onSelect={handleCoverTypeSelect} />;
      case 2:
        return <CoverageForQuestion selectedCoverageFor={formData.coverageFor} onSelect={handleCoverageForSelect} />;
      case 3:
        if (formData.coverType === 'Extras Only') {
          // Skip hospital services for Extras Only
          return <ServicesQuestion title="What extra services are important to you?" questionNumber={3} options={extraServiceOptions} selectedOptions={formData.extraServices || []} onToggle={handleExtraServiceToggle} />;
        }
        return <ServicesQuestion title="What hospital services are important to you?" questionNumber={3} options={hospitalServiceOptions} selectedOptions={formData.hospitalServices || []} onToggle={handleHospitalServiceToggle} />;
      case 4:
        if ((formData.coverType === 'Hospital + Extras' || formData.coverType === 'I don\'t know yet') && currentStep === 4) {
          return <ServicesQuestion title="What extra services are important to you?" questionNumber={4} options={extraServiceOptions} selectedOptions={formData.extraServices || []} onToggle={handleExtraServiceToggle} />;
        }
        return <PostcodeQuestion value={formData.postcode || ''} onChange={handlePostcodeChange} />;
      case 5:
        return <PostcodeQuestion value={formData.postcode || ''} onChange={handlePostcodeChange} />;
      default:
        return null;
    }
  };
  return <div className="min-h-[calc(100vh-65px)] flex bg-gradient-to-br from-white to-cc-light-green animate-fade-in">
      <div className="w-3/8 bg-white/80 backdrop-blur-md p-8 border-r border-white/20 shadow-md hidden md:block">
        <ProgressBar steps={steps} currentStep={1} />
      </div>
      
      <div className="w-full md:w-5/8 flex-1 flex items-center justify-center p-4 md:p-8 bg-gray-100">
        <div className="w-full max-w-3xl p-4 md:p-8">
          {!showChat}
          
          <div className="glass-card backdrop-blur-md bg-white/50 border border-white/20 shadow-xl p-6 mb-4">
            {renderCurrentStep()}
          </div>
          
          {!showChat && currentStep <= getTotalSteps() && <div className="space-y-6">
              <FormProgress currentStep={currentStep} totalSteps={getTotalSteps()} />
              
              <div className="flex justify-between">
                {currentStep > 1 && <Button onClick={handleBack} variant="outline" className="flex items-center">
                    <ArrowLeft className="mr-2" size={18} />
                    Back
                  </Button>}
                
                {currentStep > 1 && currentStep <= getTotalSteps() && <Button onClick={handleNext} className="ml-auto bg-cc-green hover:bg-cc-dark-green text-white">
                    Next
                    <ArrowRight className="ml-2" size={18} />
                  </Button>}
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default UnderstandingYou;
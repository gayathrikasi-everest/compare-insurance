
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FormData, UserInfo } from '@/types';
import { Check, Edit, X, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ChatInterface from '@/components/ChatInterface';

const UnderstandingYou: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    hospitalServices: [],
    extraServices: []
  });
  const [showChat, setShowChat] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load saved form data if exists
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      const userInfo = JSON.parse(savedUserInfo) as UserInfo;
      if (userInfo.formData) {
        setFormData(userInfo.formData);
      }
    }
  }, []);

  const handleShowRecommendations = () => {
    setIsSubmitting(true);
    
    // Store form data in localStorage
    const userInfo: UserInfo = {
      formData
    };
    
    setTimeout(() => {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      navigate('/recommended-plans');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleEditInfo = () => {
    // Reset to first question
    navigate('/understanding-you');
  };

  return (
    <div className="min-h-[calc(100vh-65px)] flex bg-gradient-to-br from-white to-cc-light-green animate-fade-in p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1">
          <div className="flex items-start gap-6 mb-12">
            <div className="w-16 h-16 flex-shrink-0">
              <img 
                src="/lovable-uploads/aed60167-b684-4388-aec3-a903b0b65f17.png" 
                alt="Green Shield" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1a3352] mb-3">Tell us about your needs</h1>
              <p className="text-gray-600 text-lg">We'll find the perfect plan for you</p>
            </div>
          </div>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-[#1a3352] mb-6">Your Selections:</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">🛡️ Cover Type:</span>
                <span className="font-medium">{formData.coverType}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-700">👥 Who's Covered:</span>
                <span className="font-medium">{formData.coverageFor}</span>
              </div>
              {formData.hospitalServices && formData.hospitalServices.length > 0 && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-700">🏥 Hospital Services:</span>
                  <span className="font-medium">{formData.hospitalServices.join(', ')}</span>
                </div>
              )}
              {formData.extraServices && formData.extraServices.length > 0 && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-700">⭐ Extra Services:</span>
                  <span className="font-medium">{formData.extraServices.join(', ')}</span>
                </div>
              )}
              {formData.postcode && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">📍 Postcode:</span>
                  <span className="font-medium">{formData.postcode}</span>
                </div>
              )}
            </div>
            <Button 
              variant="outline" 
              onClick={handleEditInfo}
              className="mt-6 text-gray-600 hover:text-gray-800"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Card>

          <Button
            onClick={handleShowRecommendations}
            className="w-full mt-6 bg-[#00b67a] hover:bg-[#009e69] text-white py-6 text-lg font-medium"
            disabled={isSubmitting}
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Show Recommendations
          </Button>
        </div>

        {/* Right Column - Chat Interface */}
        <div className="md:w-[450px]">
          <ChatInterface 
            formData={formData}
            onClose={() => setShowChat(false)}
            onShowRecommendations={handleShowRecommendations}
            onEditInfo={handleEditInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default UnderstandingYou;

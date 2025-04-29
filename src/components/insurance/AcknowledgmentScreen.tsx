
import React from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '@/types';
import { Edit, ArrowRight } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';

interface AcknowledgmentScreenProps {
  formData: FormData;
  onShowRecommendations: () => void;
  onEditInfo: () => void;
}

const AcknowledgmentScreen: React.FC<AcknowledgmentScreenProps> = ({
  formData,
  onShowRecommendations,
  onEditInfo
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full md:w-[140%] max-w-[1400px] mx-auto">
      {/* Chat interface now on the left */}
      <div className="w-full md:w-[600px] space-y-4">
        <ChatInterface formData={formData} onClose={() => {}} onShowRecommendations={onShowRecommendations} onEditInfo={onEditInfo} />
      </div>
      
      {/* User info summary now on the right */}
      <div className="flex-1 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <h3 className="text-sm font-medium text-gray-500">🛡️ Type of Cover</h3>
              <p className="font-medium text-base">{formData.coverType}</p>
            </div>
            
            <div className="space-y-2.5">
              <h3 className="text-sm font-medium text-gray-500">👥 Who's Covered</h3>
              <p className="font-medium text-base">{formData.coverageFor}</p>
            </div>

            {formData.hospitalServices && formData.hospitalServices.length > 0 && <div className="space-y-2.5">
                <h3 className="text-sm font-medium text-gray-500">🏥 Hospital Services</h3>
                <p className="font-medium text-base">{formData.hospitalServices.join(', ')}</p>
              </div>}
            
            {formData.extraServices && formData.extraServices.length > 0 && <div className="space-y-2.5">
                <h3 className="text-sm font-medium text-gray-500">⭐ Extra Services</h3>
                <p className="font-medium text-base">{formData.extraServices.join(', ')}</p>
              </div>}
            
            {formData.postcode && <div className="space-y-2.5">
                <h3 className="text-sm font-medium text-gray-500">📍 Postcode</h3>
                <p className="font-medium text-base">{formData.postcode}</p>
              </div>}
          </div>
          
          <Button onClick={onEditInfo} variant="ghost" size="sm" className="text-cc-green hover:text-cc-dark-green">
            <Edit className="mr-2 h-4 w-4" />
            Edit Your Info
          </Button>
        </div>
        
        {/* Skip to Recommendations button */}
        <Button 
          onClick={onShowRecommendations} 
          className="w-full bg-cc-green hover:bg-cc-dark-green text-white"
        >
          Skip to Recommendations
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AcknowledgmentScreen;

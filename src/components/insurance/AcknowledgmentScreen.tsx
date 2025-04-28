
import React from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '@/types';
import { Edit } from 'lucide-react';
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
  return <div className="flex gap-6">
    <div className="flex-1 space-y-4">
      <div className="flex items-start gap-6 mb-6">
        <div className="w-16 h-16 flex-shrink-0">
          <img 
            src="/lovable-uploads/aed60167-b684-4388-aec3-a903b0b65f17.png" 
            alt="Green Shield" 
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-[#1a3352] mb-3">Tell us about your needs</h1>
          <p className="text-gray-600 text-lg">We'll find the perfect plan for you</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">🛡️ Type of Cover</h3>
            <p className="font-medium">{formData.coverType}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">👥 Who's Covered</h3>
            <p className="font-medium">{formData.coverageFor}</p>
          </div>

          {formData.hospitalServices && formData.hospitalServices.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">🏥 Hospital Services</h3>
              <p className="font-medium">{formData.hospitalServices.join(', ')}</p>
            </div>
          )}
          
          {formData.extraServices && formData.extraServices.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">⭐ Extra Services</h3>
              <p className="font-medium">{formData.extraServices.join(', ')}</p>
            </div>
          )}
          
          {formData.postcode && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">📍 Postcode</h3>
              <p className="font-medium">{formData.postcode}</p>
            </div>
          )}
        </div>
        
        <Button 
          onClick={onEditInfo} 
          variant="ghost" 
          size="sm" 
          className="text-cc-green hover:text-cc-dark-green"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Your Info
        </Button>
      </div>
    </div>

    <div className="w-[450px] space-y-4">
      <ChatInterface 
        formData={formData}
        onClose={() => {}}
        onShowRecommendations={onShowRecommendations}
        onEditInfo={onEditInfo}
      />
    </div>
  </div>;
};

export default AcknowledgmentScreen;

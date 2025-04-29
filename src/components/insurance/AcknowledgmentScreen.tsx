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
  return <div className="flex flex-col items-center justify-center w-full max-w-[1400px] mx-auto">
      <div className="w-full flex flex-col md:flex-row gap-8 px-4 items-center">
        {/* Left side: Chat interface */}
        <div className="w-full md:w-[600px]">
          <ChatInterface formData={formData} onClose={() => {}} onShowRecommendations={onShowRecommendations} onEditInfo={onEditInfo} />
        </div>
        
        {/* Right side: User info summary */}
        <div className="flex-1 flex flex-col w-full">
          <div className="bg-white rounded-xl border border-gray-200 p-8 w-full">
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
            
            <div className="flex justify-center">
              <Button onClick={onEditInfo} variant="ghost" size="sm" className="text-cc-green hover:text-cc-dark-green">
                <Edit className="mr-2 h-4 w-4" />
                Edit Your Info
              </Button>
            </div>
          </div>
          
          {/* Skip to Recommendations button - properly aligned under the box */}
          <div className="mt-6 w-full flex justify-center">
            <Button onClick={onShowRecommendations} className="w-full max-w-xs bg-white border border-cc-green text-cc-green hover:bg-cc-light-green" variant="outline">
              Skip to Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>;
};
export default AcknowledgmentScreen;
import React from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '@/types';
import { Search, Plus, Edit } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
interface AcknowledgmentScreenProps {
  formData: FormData;
  onShowRecommendations: () => void;
  onAddMoreInfo: () => void;
  onEditInfo: () => void;
}
const AcknowledgmentScreen: React.FC<AcknowledgmentScreenProps> = ({
  formData,
  onShowRecommendations,
  onAddMoreInfo,
  onEditInfo
}) => {
  const [showChat, setShowChat] = React.useState(false);
  if (showChat) {
    return <div className="space-y-6">
        <ChatInterface formData={formData} onClose={() => setShowChat(false)} onShowRecommendations={onShowRecommendations} onEditInfo={onEditInfo} />
      </div>;
  }
  return <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cc-blue text-center">Your Insurance Preferences </h2>
      
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

          {formData.hospitalServices && formData.hospitalServices.length > 0 && <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">🏥 Hospital Services</h3>
              <p className="font-medium">{formData.hospitalServices.join(', ')}</p>
              <Button onClick={onEditInfo} variant="ghost" size="sm" className="mt-2">
                <Edit className="mr-2 h-4 w-4" />
                Edit Your Info
              </Button>
            </div>}
          
          {formData.extraServices && formData.extraServices.length > 0 && <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">⭐ Extra Services</h3>
              <p className="font-medium">{formData.extraServices.join(', ')}</p>
            </div>}
          
          {formData.postcode && <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">📍 Postcode</h3>
              <p className="font-medium">{formData.postcode}</p>
            </div>}
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg mb-4">You can view a recommended plan now, or tell us more so we can personalise your options even further. 

      </p>
        
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center">
          <Button onClick={onShowRecommendations} size="lg" className="bg-cc-green hover:bg-cc-dark-green">
            <Search className="mr-2 h-4 w-4" />
            Show Recommendations
          </Button>
          
          <Button onClick={() => setShowChat(true)} variant="outline" size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add More Info
          </Button>
        </div>
      </div>
    </div>;
};
export default AcknowledgmentScreen;
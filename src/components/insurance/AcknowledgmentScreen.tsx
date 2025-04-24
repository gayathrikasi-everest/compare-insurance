import React from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '@/types';
import { Search, Plus, Edit } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  
  if (showChat) {
    return <div className="space-y-6">
      <ChatInterface 
        formData={formData} 
        onClose={() => setShowChat(false)} 
        onShowRecommendations={onShowRecommendations} 
        onEditInfo={onEditInfo} 
      />
    </div>;
  }
  
  return <div className="space-y-6">
    <h2 className="text-2xl font-bold text-cc-blue text-center">Your Insurance Preferences</h2>
    
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 relative">
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
      
      <Button 
        onClick={onEditInfo} 
        variant="ghost" 
        size="sm" 
        className="absolute bottom-2 right-2 mt-2"
      >
        <Edit className="mr-2 h-4 w-4" />
        Edit Your Info
      </Button>
    </div>

    <div className="text-center">
      <p className="text-lg mb-4">You can view a recommended plan now, or tell us more so we can personalise your options even further.</p>
      
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 justify-center">
        <Button 
          onClick={() => setShowConfirmDialog(true)} 
          size="lg" 
          className="bg-cc-green hover:bg-cc-dark-green"
        >
          <Search className="mr-2 h-4 w-4" />
          Show Recommendations
        </Button>
        
        <Button onClick={() => setShowChat(true)} variant="outline" size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add More Info
        </Button>
      </div>
    </div>

    <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review Your Selections</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-2">
            <p><span className="font-medium">🛡️ Cover Type:</span> {formData.coverType}</p>
            <p><span className="font-medium">👥 Who's Covered:</span> {formData.coverageFor}</p>
            {formData.hospitalServices && formData.hospitalServices.length > 0 && (
              <p><span className="font-medium">🏥 Hospital Services:</span> {formData.hospitalServices.join(', ')}</p>
            )}
            {formData.extraServices && formData.extraServices.length > 0 && (
              <p><span className="font-medium">⭐ Extra Services:</span> {formData.extraServices.join(', ')}</p>
            )}
            {formData.postcode && (
              <p><span className="font-medium">📍 Postcode:</span> {formData.postcode}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
            Go Back
          </Button>
          <Button 
            onClick={() => {
              setShowConfirmDialog(false);
              onShowRecommendations();
            }}
            className="bg-cc-green hover:bg-cc-dark-green"
          >
            View Recommendations Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>;
};

export default AcknowledgmentScreen;

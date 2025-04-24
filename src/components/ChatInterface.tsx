
import React from 'react';
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { FormData } from '@/types';

interface ChatInterfaceProps {
  formData: FormData;
  onEditInfo: () => void;
  onClose: () => void;
  onShowRecommendations: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  formData,
  onEditInfo,
  onClose,
  onShowRecommendations
}) => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold text-[#1a3352] mb-6">
        Tell us about your needs
      </h1>
      
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">Understanding You</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEditInfo}
            className="text-gray-600"
          >
            <PenLine className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
        <ul className="text-sm space-y-2">
          <li><span className="font-medium">🛡️ Cover Type:</span> {formData.coverType}</li>
          <li><span className="font-medium">👥 Who's Covered:</span> {formData.coverageFor}</li>
          {formData.hospitalServices && formData.hospitalServices.length > 0 && (
            <li><span className="font-medium">🏥 Hospital Services:</span> {formData.hospitalServices.join(', ')}</li>
          )}
          {formData.extraServices && formData.extraServices.length > 0 && (
            <li><span className="font-medium">⭐ Extra Services:</span> {formData.extraServices.join(', ')}</li>
          )}
          {formData.postcode && (
            <li><span className="font-medium">📍 Postcode:</span> {formData.postcode}</li>
          )}
        </ul>
      </div>
      
      {/* Chat messages container */}
      <div className="flex-1 my-6 bg-gray-50 rounded-xl p-4 min-h-[300px]">
        {/* Chat messages will go here */}
      </div>

      {/* Chat input */}
      <div className="mt-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Ask anything about health insurance..."
            className="w-full pr-12 pl-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cc-green focus:border-transparent"
          />
          <Button 
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cc-green hover:text-cc-dark-green hover:bg-transparent"
          >
            <PenLine className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

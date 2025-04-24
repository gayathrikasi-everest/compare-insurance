
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '@/types';
import { Search, Edit, X, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ChatInterfaceProps {
  formData: FormData;
  onClose: () => void;
  onShowRecommendations: () => void;
  onEditInfo: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  formData,
  onClose,
  onShowRecommendations,
  onEditInfo
}) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      toast({
        title: "Message received",
        description: "Thanks for providing more details!",
      });
      setMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-800 text-white p-4 rounded-t-lg">
        <h2 className="font-medium">Tell us more about your needs</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:text-gray-200">
          <X size={20} />
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900">Your Selections:</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEditInfo}
            className="text-gray-600"
          >
            <Edit className="mr-2 h-4 w-4" />
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask anything about health insurance..."
            className="w-full pr-12 pl-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cc-green focus:border-transparent"
          />
          <Button 
            type="submit"
            disabled={!message.trim()}
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-cc-green hover:text-cc-dark-green hover:bg-transparent"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex justify-center">
          <Button 
            type="button"
            onClick={onShowRecommendations}
            variant="outline"
            className="flex items-center"
          >
            <Search className="mr-2 h-4 w-4" />
            Show Recommendations Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;

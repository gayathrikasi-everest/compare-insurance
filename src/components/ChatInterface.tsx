
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from '@/types';
import { Search, Edit, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
        <Textarea 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything about health insurance or provide more details about what you need..."
          className="min-h-[120px]"
        />
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button 
            type="submit"
            disabled={!message.trim()}
            className="bg-cc-green hover:bg-cc-dark-green"
          >
            Send Message
          </Button>
          
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

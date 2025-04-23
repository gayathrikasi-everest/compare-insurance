
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormData } from '@/types';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  formData: FormData;
  onSubmit: (message: string) => void;
  onShowRecommendations: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  formData,
  onSubmit,
  onShowRecommendations
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <h3 className="font-medium text-gray-900">Your Selections:</h3>
        <ul className="text-sm space-y-1">
          <li><span className="font-medium">Cover Type:</span> {formData.coverType}</li>
          <li><span className="font-medium">Who's Covered:</span> {formData.coverageFor}</li>
          {formData.hospitalServices && formData.hospitalServices.length > 0 && (
            <li><span className="font-medium">Hospital Services:</span> {formData.hospitalServices.join(', ')}</li>
          )}
          {formData.extraServices && formData.extraServices.length > 0 && (
            <li><span className="font-medium">Extra Services:</span> {formData.extraServices.join(', ')}</li>
          )}
          {formData.postcode && (
            <li><span className="font-medium">Postcode:</span> {formData.postcode}</li>
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
            <SendHorizontal className="mr-2 h-4 w-4" />
            Send Message
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            onClick={onShowRecommendations}
          >
            Show Recommendations Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;

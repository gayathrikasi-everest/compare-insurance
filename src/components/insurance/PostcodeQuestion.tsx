
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from 'lucide-react';

interface PostcodeQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

const PostcodeQuestion: React.FC<PostcodeQuestionProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-cc-blue">5. Where do you live?</h3>
        <p className="text-gray-600">Your location helps us find health insurance plans available in your area with the right network of providers.</p>
      </div>
      <div className="max-w-xs">
        <Label htmlFor="postcode" className="sr-only">Postcode</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="postcode"
            type="text"
            placeholder="Enter your postcode"
            className="pl-10"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PostcodeQuestion;

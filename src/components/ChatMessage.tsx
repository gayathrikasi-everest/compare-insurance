
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isUser, timestamp }) => {
  return (
    <div className={cn(
      "mb-4 max-w-[80%]",
      isUser ? "ml-auto" : "mr-auto"
    )}>
      <div className={cn(
        "p-3 rounded-2xl",
        isUser 
          ? "bg-gradient-to-r from-cc-green to-cc-dark-green text-white" 
          : "glass"
      )}>
        <p>{content}</p>
      </div>
      {timestamp && (
        <p className="text-xs text-gray-500 mt-1">
          {timestamp}
        </p>
      )}
    </div>
  );
};

export default ChatMessage;

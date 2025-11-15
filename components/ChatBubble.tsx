
import React from 'react';

interface ChatBubbleProps {
  sender: 'system' | 'user';
  text: string;
  isProcessing?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ sender, text, isProcessing }) => {
  const isSystem = sender === 'system';

  const bubbleClasses = isSystem
    ? 'bg-white text-gray-800 self-start rounded-r-lg rounded-bl-lg'
    : 'bg-blue-500 text-white self-end rounded-l-lg rounded-br-lg';

  return (
    <div className={`w-full flex ${isSystem ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-lg md:max-w-xl p-3 md:p-4 my-2 shadow-md ${bubbleClasses}`}>
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-blue-200 rounded-full animate-pulse delay-150"></div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;

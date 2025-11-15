
import React, { useState, useEffect, useRef } from 'react';
import { expertSystemData } from '../data/expertSystemData';
import { Step, ChatMessage, User } from '../types';
import ChatBubble from './ChatBubble';
import InputHandler from './InputHandler';
import { getGeminiExplanation } from '../services/geminiService';

interface ChatInterfaceProps {
    user: User;
    onLogout: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ user, onLogout }) => {
  const initialStepId = user.gender === 'male' ? 'MALE_SYMPTOMS' : 'FEMALE_SYMPTOMS';
  
  const [currentStepId, setCurrentStepId] = useState<string>(initialStepId);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentStep: Step = expertSystemData[currentStepId];

  useEffect(() => {
    // Scroll to the bottom of the chat on new message
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isProcessing]);

  useEffect(() => {
    const initialStep = expertSystemData[initialStepId];
    // Initial message on load
    setChatHistory([
        { sender: 'system', text: `Starting session for ${user.name}, age ${user.age}.`},
        { sender: 'system', text: initialStep.prompt }
    ]);
  }, [user, initialStepId]);

  const handleResponse = async (responseText: string, nextStepId: string) => {
    if (nextStepId === 'START') {
      onLogout();
      return;
    }

    // Add user response to history
    const newUserMessage: ChatMessage = { sender: 'user', text: responseText };
    const newHistory = [...chatHistory, newUserMessage];
    setChatHistory(newHistory);
    setIsProcessing(true);

    // Short delay to simulate thinking
    setTimeout(async () => {
      const nextStep = expertSystemData[nextStepId];
      if (!nextStep) {
        console.error(`Next step "${nextStepId}" not found.`);
        setIsProcessing(false);
        return;
      }
      
      let systemMessages: ChatMessage[] = [];
      
      systemMessages.push({ sender: 'system', text: nextStep.prompt });

      if (nextStep.type === 'DECISION' || nextStep.type === 'ESCALATE') {
         const diagnosisText = `${nextStep.diagnosis || 'Recommendation'}:\n${nextStep.info || ''}`;
         systemMessages.push({sender: 'system', text: diagnosisText.trim()});

         const finalHistory = [...newHistory, ...systemMessages];
         setChatHistory(finalHistory);

         if (process.env.API_KEY) {
            setChatHistory(prev => [...prev, { sender: 'system', text: 'Generating a simplified explanation...', isProcessing: true }]);

            const explanation = await getGeminiExplanation(nextStep.diagnosis || 'Recommendation', nextStep.info, finalHistory, user);

            setChatHistory(prev => {
                const updatedHistory = [...prev];
                updatedHistory[updatedHistory.length -1] = { sender: 'system', text: explanation };
                if (expertSystemData[nextStep.nextStepId!]) {
                  updatedHistory.push({ sender: 'system', text: expertSystemData[nextStep.nextStepId!].prompt });
                }
                return updatedHistory;
            });
         } else {
             if (expertSystemData[nextStep.nextStepId!]) {
                const finalPrompt = expertSystemData[nextStep.nextStepId!].prompt;
                setChatHistory(prev => [...prev, { sender: 'system', text: finalPrompt }]);
             }
         }
        
         setCurrentStepId(nextStep.nextStepId || 'END');
         setIsProcessing(false);

      } else {
        setChatHistory([...newHistory, ...systemMessages]);
        setCurrentStepId(nextStep.id);
        setIsProcessing(false);
      }
    }, 500);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Clinical Decision Support</h1>
            <div className="text-right text-sm text-gray-600">
                <div><strong>Patient:</strong> {user.name}</div>
                <div><strong>Age:</strong> {user.age} | <strong>Gender:</strong> {user.gender}</div>
            </div>
        </div>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto flex flex-col space-y-2">
            {chatHistory.map((msg, index) => (
              <ChatBubble key={index} sender={msg.sender} text={msg.text} isProcessing={msg.isProcessing}/>
            ))}
            {isProcessing && chatHistory[chatHistory.length - 1]?.sender === 'user' && (
               <ChatBubble sender="system" text="" isProcessing={true} />
            )}
            <div ref={chatEndRef} />
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 sticky bottom-0 z-10">
         <div className="max-w-3xl mx-auto">
             {!isProcessing && <InputHandler currentStep={currentStep} onResponse={handleResponse} />}
         </div>
         <p className="text-center text-xs text-gray-400 pb-2">This is an AI-powered tool for informational purposes only. Always consult a healthcare professional.</p>
      </footer>
    </div>
  );
};

export default ChatInterface;

import React from 'react';
import { Step, StepOption } from '../types';

interface InputHandlerProps {
  currentStep: Step;
  onResponse: (text: string, nextStepId: string) => void;
}

const InputHandler: React.FC<InputHandlerProps> = ({ currentStep, onResponse }) => {
  if (currentStep.type === 'ASK_CHOICE' && currentStep.options) {
    return (
      <div className="flex flex-wrap gap-2 justify-center p-4">
        {currentStep.options.map((option: StepOption) => (
          <button
            key={option.nextStepId}
            onClick={() => onResponse(option.text, option.nextStepId)}
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors shadow-sm"
          >
            {option.text}
          </button>
        ))}
      </div>
    );
  }

  if (currentStep.type === 'ASK_YES_NO') {
    return (
      <div className="flex gap-4 justify-center p-4">
        <button
          onClick={() => onResponse('Yes', currentStep.yesStepId!)}
          className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors shadow-sm"
        >
          Yes
        </button>
        <button
          onClick={() => onResponse('No', currentStep.noStepId!)}
          className="bg-red-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors shadow-sm"
        >
          No
        </button>
      </div>
    );
  }

  return null;
};

export default InputHandler;
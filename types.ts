
export type StepType = 'START' | 'ASK_CHOICE' | 'ASK_YES_NO' | 'DECISION' | 'ESCALATE' | 'END';

export interface StepOption {
  text: string;
  nextStepId: string;
}

export interface Step {
  id: string;
  type: StepType;
  prompt: string;
  options?: StepOption[];
  nextStepId?: string; // For simple transitions
  yesStepId?: string; // For 'yes' case in yes/no
  noStepId?: string; // For 'no' case in yes/no
  diagnosis?: string;
  info?: string;
  ruleRef?: string;
}

export interface ExpertSystemData {
  [key: string]: Step;
}

export interface ChatMessage {
    sender: 'system' | 'user';
    text: string;
    options?: StepOption[];
    isProcessing?: boolean;
}

export interface User {
  name: string;
  age: number;
  gender: 'male' | 'female';
}

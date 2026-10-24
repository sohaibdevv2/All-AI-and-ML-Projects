export interface ParamMetadata {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
}

export interface Artifact {
  id: number;
  sectionId: number;
  sectionTitle: string;
  title: string;
  description: string;
  implementationHint: string;
  defaultParams: Record<string, string>;
  paramMetadata: ParamMetadata[];
  template: (params: Record<string, string>) => string;
}

export interface WorkflowTask {
  id: string;
  goal: string;
  task: string;
  howAiCanHelp: string;
  timeSpent: 'Low' | 'Medium' | 'High';
  frequency: 'Low' | 'Medium' | 'High';
  repetitiveness: 'Low' | 'Medium' | 'High';
}

export interface DecisionOption {
  id: string;
  title: string;
}

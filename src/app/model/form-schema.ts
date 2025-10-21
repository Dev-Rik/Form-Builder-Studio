export enum FieldType {
  TEXT = 'text',
  EMAIL = 'email',
  NUMBER = 'number',
  DATE = 'date',
  DROPDOWN = 'dropdown',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXTAREA = 'textarea',
  FILE = 'file'
}

export interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface ConditionalLogic {
  show: boolean;
  field?: string;
  operator?: 'equals' | 'notEquals' | 'contains';
  value?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  checkboxLabel?: string;
  required: boolean;
  options?: string[];
  validation?: ValidationRules;
  conditional?: ConditionalLogic;
}

export interface FormSchema {
  title: string;
  fields: FormField[];
}

export interface FieldTemplate {
  type: FieldType;
  icon: string;
  label: string;
}
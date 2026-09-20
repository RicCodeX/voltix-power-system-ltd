export interface LeadFormData {
  full_name: string;
  email: string;
  phone: string;
  need: string;
  budget_range: string;
  budget_custom: string;
  budget_status: string;
  timeline: string;
  timeline_custom: string;
  decision_stage: string;
  location: string;
  message: string;
  submitted_at: string;
  source: string;
}

export type FormSubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export interface FormErrors {
  full_name?: string;
  email?: string;
  phone?: string;
  need?: string;
  [key: string]: string | undefined;
}

// =====================================================
// n8n WEBHOOK CONFIGURATION
// DEVELOPMENT / TEST URL
// Replace this URL with the production webhook before launch.
// =====================================================

export const WEBHOOK_URL =
  "https://boastful-flanked-evacuate.ngrok-free.dev/webhook/lead-capture";

// =====================================================
// FORM FIELD CONFIGURATIONS
// Modify these business options in one place to match
// your specific product catalog and pricing tiers.
// =====================================================

export const BUDGET_OPTIONS = [
  "₦20M and above",
  "₦10M – ₦20M",
  "₦5M – ₦10M",
  "₦2M – ₦5M",
  "₦500K – ₦2M",
  "Below ₦500K",
  "Budget not decided yet",
  "Prefer not to say",
] as const;

export const BUDGET_STATUS_OPTIONS = [
  "Budget is approved and available",
  "Budget is available but approval is pending",
  "We are currently arranging the budget",
  "Still discussing the budget",
  "No budget decided yet",
  "Prefer not to say",
] as const;

export const TIMELINE_OPTIONS = [
  "Immediately / Ready to proceed",
  "Within 1 week",
  "Within 2–4 weeks",
  "Within 1–3 months",
  "3–6 months",
  "More than 6 months",
  "No fixed timeline yet",
  "Just researching",
] as const;

export const DECISION_STAGE_OPTIONS = [
  "Ready to proceed",
  "Shortlisting options",
  "Comparing suppliers",
  "Waiting for approval",
  "Still exploring options",
  "Just gathering information",
  "Not sure yet",
] as const;

export const FORM_SOURCE = "website_lead_form";

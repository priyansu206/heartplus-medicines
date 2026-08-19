// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_LINKS = ["Home", "Services", "Reviews", "Reach Us"] as const;

// ─── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  id: number;
  name: string;
  desc: string;
}

export const SERVICES: readonly Service[] = [
  {
    id: 1,
    name: "General Medicines",
    desc: "Comprehensive primary care and treatment for everyday illnesses and health concerns.",
  },
  {
    id: 2,
    name: "Gastroenterology",
    desc: "Expert care for digestive system disorders, including stomach, intestines, and liver.",
  },
  {
    id: 3,
    name: "Nephrology",
    desc: "Specialized diagnosis and treatment for kidney-related conditions and diseases.",
  },
  {
    id: 4,
    name: "Urology",
    desc: "Advanced care for urinary tract conditions and male reproductive system disorders.",
  },
  {
    id: 5,
    name: "Cardiology",
    desc: "Comprehensive heart care, from routine checkups to managing cardiovascular diseases.",
  },
  {
    id: 6,
    name: "Neurology",
    desc: "Diagnosis and treatment of disorders affecting the brain, spinal cord, and nervous system.",
  },
  {
    id: 7,
    name: "Pediatrics",
    desc: "Compassionate healthcare for infants, children, and adolescents.",
  },
  {
    id: 8,
    name: "Pulmonary Medicine",
    desc: "Expert treatment for lung and respiratory system conditions, including asthma and COPD.",
  },
  {
    id: 9,
    name: "Blood Sample Collection",
    desc: "Quick, hygienic, and accurate blood sample collection for diagnostic testing.",
  },
] as const;

// ─── Contact Info ─────────────────────────────────────────────────────────────

export const CONTACT = {
  address: "Durgapur Chowk, near by durgamandap, Jobra",
  email: "heartplusmedicines@gmail.com",
  phone: {
    clinic: "8400661188",
    personal: "7008512435",
  },
} as const;

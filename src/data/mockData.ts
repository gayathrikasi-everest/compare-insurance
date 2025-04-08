
import { InsurancePlan } from '../types';

export const mockInsurancePlans: InsurancePlan[] = [
  {
    id: '1',
    name: 'Gold Protect and Growing Family 60',
    provider: 'Medibank',
    price: 90,
    description: 'This combined policy offers extensive hospital coverage, including pregnancy and birth services, which is crucial for your expanding family. The extras cover includes dental, optical, and physiotherapy, which are beneficial for both adults and children.',
    features: [
      'Full pregnancy and birth services',
      'Comprehensive hospital coverage',
      'Dental, optical, and physiotherapy extras',
      'Coverage for the whole family',
      'Waiting periods for pre-existing conditions'
    ]
  },
  {
    id: '2',
    name: 'My Family Silver Plus',
    provider: 'HCF',
    price: 90,
    description: 'This policy provides a good balance of hospital and extras coverage, including pregnancy and birth services. The premium is competitive, and it offers a wide range of covered procedures and flexible extras.',
    features: [
      'Pregnancy and birth services covered',
      'Wide range of hospital procedures',
      'Flexible extras benefits',
      'Standard waiting periods',
      'Some exclusions for high-cost treatments'
    ]
  },
  {
    id: '3',
    name: 'Gold Comprehensive Hospital + Freedom 60 Extras',
    provider: 'Bupa',
    price: 90,
    description: 'A comprehensive package that combines top-tier hospital cover with flexible extras. Ideal for growing families with extensive coverage for pregnancy, birth, and pediatric services.',
    features: [
      'Top-tier hospital coverage',
      'Extensive pregnancy and birth benefits',
      'Flexible extras with 60% back on claims',
      'No gap dental check-ups',
      'Coverage for alternative therapies'
    ]
  }
];

export const sampleQuestions = [
  "What's covered for pregnancy in these plans?",
  "How long are the waiting periods?",
  "Can I add my children to these plans?",
  "Which plan has the best dental coverage?",
  "Are there any discounts available?"
];

export const chatResponses = {
  pregnancy: "All three plans cover pregnancy and birth services. Medibank Gold Protect provides the most comprehensive coverage with private room options where available. There's typically a 12-month waiting period before you can claim for pregnancy-related services.",
  waitingPeriods: "Standard waiting periods apply for all plans: 2 months for general services, 6 months for optical, 12 months for major dental and pre-existing conditions, and 12 months for pregnancy-related services.",
  children: "Yes, all these plans are family policies that cover children. Children are generally covered at no extra cost until they turn 25 if they're full-time students and dependents.",
  dental: "HCF My Family Silver Plus has the most comprehensive dental coverage with 100% back on preventative dental visits at HCF dental centers. Bupa offers no-gap check-ups at selected providers, while Medibank's coverage is solid but may have higher out-of-pocket costs.",
  discounts: "You may be eligible for a 4% discount by paying annually rather than monthly. First-time health insurance buyers under 30 may also qualify for age-based discounts of up to 10%."
};


import { InsurancePlan, UserInfo } from '../types';

export const mockInsurancePlans: InsurancePlan[] = [
  {
    id: '1',
    name: 'Gold Protect and Growing Family 60',
    provider: 'Medibank',
    price: 90,
    monthlyPrice: 90,
    coverType: 'Hospital + Extras',
    benefits: ['Full pregnancy and birth services', 'Comprehensive hospital coverage', 'Dental, optical, and physiotherapy extras'],
    rating: 4.5,
    reviews: 250,
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
    monthlyPrice: 90,
    coverType: 'Hospital + Extras',
    benefits: ['Pregnancy and birth services', 'Wide range of hospital procedures', 'Flexible extras'],
    rating: 4.2,
    reviews: 180,
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
    monthlyPrice: 90,
    coverType: 'Hospital + Extras',
    benefits: ['Top-tier hospital coverage', 'Extensive pregnancy and birth benefits', 'Flexible extras'],
    rating: 4.7,
    reviews: 320,
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

// Real insurance plan data for the recommended plans page
export const recommendedInsurancePlans: InsurancePlan[] = [
  {
    id: "5",
    name: "Gold Protect & Growing Family 60",
    provider: "Medibank",
    price: 650,
    monthlyPrice: 650,
    coverType: 'Hospital + Extras',
    benefits: ['Comprehensive pregnancy and birth services', 'Full hospital cover', 'Dental and optical extras'],
    rating: 4.8,
    reviews: 420,
    description: "Extensive hospital coverage including pregnancy and birth services. Extras cover for dental, optical, and physiotherapy.",
    features: [
      "Comprehensive pregnancy and birth services",
      "Full hospital cover",
      "Dental and optical extras",
      "Physiotherapy coverage",
      "Family-friendly benefits"
    ],
    isTopRecommendation: true
  },
  {
    id: "3",
    name: "My Family Silver Plus",
    provider: "HCF",
    price: 780,
    monthlyPrice: 780,
    coverType: 'Hospital + Extras',
    benefits: ['Pregnancy and birth services', 'Wide range of covered procedures', 'Flexible extras'],
    rating: 4.5,
    reviews: 310,
    description: "Good balance of hospital and extras coverage, including pregnancy and birth services.",
    features: [
      "Pregnancy and birth services",
      "Wide range of covered procedures",
      "Flexible extras",
      "Family health services",
      "Standard waiting periods"
    ],
    isTopRecommendation: false
  },
  {
    id: "2",
    name: "Gold Comprehensive Hospital + Freedom 60",
    provider: "Bupa",
    price: 771.30,
    monthlyPrice: 771.30,
    coverType: 'Hospital + Extras',
    benefits: ['Comprehensive maternity services', 'Pediatric care', 'Extensive hospital cover'],
    rating: 4.6,
    reviews: 280,
    description: "Robust option with extensive hospital cover and a wide range of extras. Includes comprehensive maternity services.",
    features: [
      "Comprehensive maternity services",
      "Pediatric care",
      "Extensive hospital cover",
      "Wide range of extras",
      "Competitive pricing"
    ],
    isTopRecommendation: false
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

export const recommendationText = `Based on your profile as a young couple with a 2-year-old child and another baby on the way, your health insurance needs will focus on comprehensive coverage for both hospital and extras services, particularly those related to pregnancy, childbirth, and pediatric care. 

1. **Medibank Gold Protect and Growing Family 60 (Policy ID: 5)**: This combined policy offers extensive hospital coverage, including pregnancy and birth services, which is crucial for your expanding family. The extras cover includes dental, optical, and physiotherapy, which are beneficial for both adults and children. However, the premium is relatively high at $650 per month, and there are waiting periods for certain services, particularly for pre-existing conditions and pregnancy-related claims. 

2. **HCF My Family Silver Plus (Policy ID: 3)**: This policy provides a good balance of hospital and extras coverage, including pregnancy and birth services. The premium is slightly higher at $780 per month, but it offers a wide range of covered procedures and flexible extras. The waiting periods are standard, but the policy does have some exclusions, such as certain high-cost treatments. 

3. **Bupa Gold Comprehensive Hospital + Freedom 60 Extras (Policy ID: 2)**: This is a robust option with extensive hospital cover and a wide range of extras. It includes comprehensive maternity services and pediatric care, which are essential for your family. The total premium is $771.30 per month, which is competitive given the extensive coverage. However, there are potential out-of-pocket costs at non-agreement hospitals, and some services may have waiting periods. 

After evaluating these options, the **Medibank Gold Protect and Growing Family 60** policy stands out as the top recommendation due to its comprehensive coverage for both hospital and extras, particularly for your current and future family needs. While the premium is high, the extensive benefits and coverage for pregnancy and child-related services justify the cost, making it the best fit for your situation.`;

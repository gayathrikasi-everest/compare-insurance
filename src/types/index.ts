
export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  price: number;
  description: string;
  features: string[];
  isTopRecommendation?: boolean;
}

export interface UserInfo {
  query: string;
  preferences?: string[];
}

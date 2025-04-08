
export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  price: number;
  description: string;
  features: string[];
}

export interface UserInfo {
  query: string;
  preferences?: string[];
}

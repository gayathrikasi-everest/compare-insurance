export type FormData = {
  coverType?: CoverType;
  coverageFor?: CoverageFor;
  hospitalServices?: HospitalService[];
  extraServices?: ExtraService[];
  postcode?: string;
};

export type UserInfo = {
  formData: FormData;
  query?: string;
};

export type CoverType =
  | 'Hospital Only'
  | 'Extras Only'
  | 'Hospital + Extras'
  | "I don't know yet";

export type CoverageFor = 'Myself only' | 'Couple / Family' | string;

export type HospitalService =
  | 'Maternity'
  | 'Heart Surgery'
  | 'Joint Replacements'
  | 'Cancer Treatment'
  | 'General Emergency Cover';

export type ExtraService =
  | 'Dental'
  | 'Optical'
  | 'Physiotherapy'
  | 'Psychology'
  | 'Chiropractic';

export type InsurancePlan = {
  id: string;
  name: string;
  description: string;
  features: string[];
  provider: string;
  price: number;
  monthlyPrice?: number;
  coverType?: string;
  benefits?: string[];
  rating?: number;
  reviews?: number;
  isTopRecommendation?: boolean;
};

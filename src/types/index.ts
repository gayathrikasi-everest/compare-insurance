export interface UserInfo {
  query?: string;
}

// New types for the structured questionnaire
export type CoverType = 'Hospital Only' | 'Extras Only' | 'Hospital + Extras' | 'I don\'t know yet';
export type CoverageFor = 'Myself only' | 'Couple / Family' | 'Single Parent Family';
export type HospitalService = 'Maternity' | 'Heart Surgery' | 'Joint Replacements' | 'Cancer Treatment' | 'General Emergency Cover';
export type ExtraService = 'Dental' | 'Optical' | 'Physiotherapy' | 'Psychology' | 'Chiropractic';

export interface FormData {
  coverType?: CoverType;
  coverageFor?: CoverageFor;
  hospitalServices?: HospitalService[];
  extraServices?: ExtraService[];
  postcode?: string;
}

export interface UserInfo {
  query?: string;
  formData?: FormData;
}

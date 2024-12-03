export interface Donor {
  id: string;
  appeal_code: string;
  year: number;
  appeal_name: string;
  structure: string;
  giving_category: string;
  last_org_name: string;
  first_name: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  donation_amount: number;
  created_at?: string;
}
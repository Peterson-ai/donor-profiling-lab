export interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
  start_date: string;
  end_date: string;
  status: string;
}
export type EventType = 'Camp' | 'Ceremony' | 'Service' | 'Training';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate: string;
  location: string;
  maxRegistrations: number;
  currentRegistrations: number;
  imageUrl: string;
}
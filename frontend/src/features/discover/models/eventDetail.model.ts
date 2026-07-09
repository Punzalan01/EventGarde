export interface PricingTier {
  id: string;
  name: string;
  type: 'Standing' | 'Reserved Seating' | 'General Admission';
  price: number;
}

export interface EventDetailRecord {
  id: string;
  title: string;
  venue: string;
  date: string;
  time: string;
  heroImage: string;
  seatPlanImage: string;
  aboutHtml: string;
  guidelines: string[];
  pricingTiers: PricingTier[];
}

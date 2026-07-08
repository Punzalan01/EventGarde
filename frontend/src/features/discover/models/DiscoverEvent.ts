import { CardStackItem } from '@/components/ui/card-stack';

export interface DiscoverEvent extends CardStackItem {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  date?: string;
  location?: string;
  attendees?: string;
  category?: string;
  isPrivate: boolean;
  tag?: string;
  ctaLabel?: string;
}

export type EventCategory =
  | 'All'
  | 'Technology'
  | 'Design'
  | 'Entertainment'
  | 'Wellness'
  | 'Business'
  | 'Food & Culture'
  | 'Gaming'
  | 'Networking';

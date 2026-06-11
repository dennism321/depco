export interface Service {
  id: string;
  name: string;
  category: 'plumbing' | 'heating' | 'cooling' | 'iaq' | 'electrical' | 'geothermal';
  description: string;
  features: string[];
  startingPrice: string;
  estimateTime: string;
  guaranteeText: string;
  imageUrl?: string;
  iconName?: string;
}

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'emergency';

export interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  serviceCategory: 'plumbing' | 'heating' | 'cooling' | 'iaq' | 'electrical' | 'geothermal';
  urgency: UrgencyLevel;
  address: string;
  city: string;
  zipCode: string;
  scheduledDate: string;
  scheduledTime: string;
  notes?: string;
  status: 'pending' | 'dispatched' | 'completed' | 'canceled';
  createdTime: string;
  trackingEta?: number; // minutes from now
  technician?: {
    name: string;
    photo: string;
    rating: number;
    phone: string;
    vehiclePlate: string;
    description: string;
  };
}

export interface Review {
  id: string;
  author: string;
  stars: number;
  date: string;
  feedback: string;
  serviceCategory: string;
  isVerified: boolean;
  location: string;
}

export interface CityArea {
  name: string;
  zipCode: string;
  county: 'Hartford' | 'New Haven' | 'Litchfield' | 'Middlesex' | 'Tolland';
  activeTechs: number;
  distanceMiles: number;
  tier: 'premium' | 'quick-response' | 'standard';
  status: 'high' | 'moderate' | 'limited';
  coordinates: { x: number; y: number }; // Relative percentage coordinates for our custom SVG map
}

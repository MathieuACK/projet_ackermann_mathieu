export interface Pollution {
  id: number;
  title: string;
  pollutionType: string;
  description: string;
  discoveryDate: string;
  location: string;
  latitude: number;
  longitude: number;
  photographUrl?: string | null;
  photographData?: string | null;
  discovererName?: string;
  discovererEmail?: string;
}

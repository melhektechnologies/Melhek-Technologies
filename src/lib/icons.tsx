import { 
  Hotel, 
  Pill, 
  Car, 
  Eye, 
  Utensils, 
  TrendingUp 
} from "lucide-react";

export const IconMap = {
  Hotel: <Hotel className="w-16 h-16" />,
  Pill: <Pill className="w-16 h-16" />,
  Car: <Car className="w-16 h-16" />,
  Eye: <Eye className="w-16 h-16" />,
  Utensils: <Utensils className="w-16 h-16" />,
  TrendingUp: <TrendingUp className="w-16 h-16" />,
} as const;

export type IconType = keyof typeof IconMap;

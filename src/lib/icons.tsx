import { 
  Hotel, 
  Pill, 
  Car, 
  Eye, 
  ShoppingBag,
  Dumbbell,
  Scale,
} from "lucide-react";

export const IconMap = {
  Hotel: <Hotel className="w-16 h-16" />,
  Pill: <Pill className="w-16 h-16" />,
  Car: <Car className="w-16 h-16" />,
  Eye: <Eye className="w-16 h-16" />,
  ShoppingBag: <ShoppingBag className="w-16 h-16" />,
  Dumbbell: <Dumbbell className="w-16 h-16" />,
  Scale: <Scale className="w-16 h-16" />,
} as const;

export type IconType = keyof typeof IconMap;


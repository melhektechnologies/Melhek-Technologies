import { 
  Hotel, 
  Pill, 
  Car, 
  Eye, 
  ShoppingBag,
  Dumbbell,
  Scale,
  Utensils,
  Activity,
  TrendingUp,
  Users,
  Brain,
} from "lucide-react";

export const IconMap = {
  Hotel: <Hotel className="w-16 h-16" />,
  Pill: <Pill className="w-16 h-16" />,
  Car: <Car className="w-16 h-16" />,
  Eye: <Eye className="w-16 h-16" />,
  ShoppingBag: <ShoppingBag className="w-16 h-16" />,
  Dumbbell: <Dumbbell className="w-16 h-16" />,
  Scale: <Scale className="w-16 h-16" />,
  Utensils: <Utensils className="w-16 h-16" />,
  Activity: <Activity className="w-16 h-16" />,
  TrendingUp: <TrendingUp className="w-16 h-16" />,
  Users: <Users className="w-16 h-16" />,
  Brain: <Brain className="w-16 h-16" />,
} as const;

export type IconType = keyof typeof IconMap;


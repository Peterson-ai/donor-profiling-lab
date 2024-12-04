import { 
  LayoutDashboard, 
  DollarSign, 
  Flag, 
  Heart, 
  Calendar, 
  Award, 
  Settings 
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Donate",
    icon: DollarSign,
    href: "/donate",
  },
  {
    title: "Campaigns",
    icon: Flag,
    href: "/campaigns",
  },
  {
    title: "Youth Needs",
    icon: Heart,
    href: "/youth-needs",
  },
  {
    title: "Events",
    icon: Calendar,
    href: "/events",
  },
  {
    title: "Merit Badges",
    icon: Award,
    href: "/merit-badges",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];
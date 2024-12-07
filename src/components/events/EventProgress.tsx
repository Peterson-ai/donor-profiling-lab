import { Users } from "lucide-react";

interface EventProgressProps {
  currentRegistrations: number;
  maxRegistrations: number;
}

export const EventProgress = ({ currentRegistrations, maxRegistrations }: EventProgressProps) => {
  return (
    <div className="flex items-center text-gray-400">
      <Users className="w-4 h-4 mr-2" />
      <span>{currentRegistrations}/{maxRegistrations} registered</span>
    </div>
  );
};
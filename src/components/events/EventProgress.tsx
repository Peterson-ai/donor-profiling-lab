import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";

interface EventProgressProps {
  currentRegistrations: number;
  maxRegistrations: number;
}

export const EventProgress = ({ currentRegistrations, maxRegistrations }: EventProgressProps) => {
  const progress = (currentRegistrations / maxRegistrations) * 100;

  return (
    <>
      <div className="flex items-center text-gray-400 mb-2">
        <Users className="w-4 h-4 mr-2" />
        {currentRegistrations} / {maxRegistrations} registered
      </div>
      
      <Progress 
        value={progress} 
        className="h-2"
        indicatorClassName="bg-blue-500"
      />
    </>
  );
};
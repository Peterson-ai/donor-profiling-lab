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
      <div className="flex items-center justify-between text-gray-400 mb-2">
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2" />
          <span>{currentRegistrations} / {maxRegistrations} registered</span>
        </div>
        <span className="text-sm">{Math.round(progress)}%</span>
      </div>
      
      <Progress 
        value={progress} 
        className="h-2"
        indicatorClassName="bg-blue-500"
      />
    </>
  );
};
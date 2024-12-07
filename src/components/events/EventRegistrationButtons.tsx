import { Button } from "@/components/ui/button";
import { UseMutationResult } from "@tanstack/react-query";

interface EventRegistrationButtonsProps {
  isRegistered: boolean;
  registerMutation: UseMutationResult<void, Error, void, unknown>;
  cancelRegistrationMutation: UseMutationResult<void, Error, void, unknown>;
}

export const EventRegistrationButtons = ({
  isRegistered,
  registerMutation,
  cancelRegistrationMutation,
}: EventRegistrationButtonsProps) => {
  return (
    <div className="space-y-2">
      <Button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
        onClick={() => registerMutation.mutate()}
        disabled={isRegistered || registerMutation.isPending}
      >
        {isRegistered ? "Already Registered" : registerMutation.isPending ? "Registering..." : "Register"}
      </Button>

      {isRegistered && (
        <Button
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
          onClick={() => cancelRegistrationMutation.mutate()}
          disabled={cancelRegistrationMutation.isPending}
        >
          {cancelRegistrationMutation.isPending ? "Cancelling..." : "Cancel Registration"}
        </Button>
      )}
    </div>
  );
};
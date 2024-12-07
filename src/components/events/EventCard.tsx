import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { EventHeader } from "./EventHeader";
import { EventLocation } from "./EventLocation";
import { EventProgress } from "./EventProgress";
import { EventDates } from "./EventDates";

interface EventCardProps {
  event: Event;
  userRegistrations: string[];
}

export const EventCard = ({ event, userRegistrations }: EventCardProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isRegistered = userRegistrations.includes(event.id);

  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Must be logged in to register");
      
      const { error } = await supabase
        .from('event_registrations')
        .insert([{ 
          event_id: event.id,
          user_id: user.id
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['userRegistrations'] });
      toast({
        title: "Successfully registered!",
        description: `You are now registered for ${event.title}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const cancelRegistrationMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Must be logged in to cancel registration");
      
      const { error } = await supabase
        .from('event_registrations')
        .delete()
        .eq('event_id', event.id)
        .eq('user_id', user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['userRegistrations'] });
      toast({
        title: "Registration cancelled",
        description: `You have cancelled your registration for ${event.title}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Cancellation failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  return (
    <div className="bg-[#1A2235] rounded-lg overflow-hidden">
      <img 
        src={event.imageUrl} 
        alt={event.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <EventHeader title={event.title} type={event.type} />
        <p className="text-gray-400 mb-4">{event.description}</p>
        
        <div className="space-y-4">
          <EventLocation location={event.location} />
          <EventProgress 
            currentRegistrations={event.currentRegistrations}
            maxRegistrations={event.maxRegistrations}
          />
          <EventDates startDate={event.startDate} endDate={event.endDate} />
          
          {isRegistered ? (
            <Button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium"
              onClick={() => cancelRegistrationMutation.mutate()}
              disabled={cancelRegistrationMutation.isPending}
            >
              {cancelRegistrationMutation.isPending ? "Cancelling..." : "Cancel Registration"}
            </Button>
          ) : (
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
              onClick={() => registerMutation.mutate()}
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Registering..." : "Register"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
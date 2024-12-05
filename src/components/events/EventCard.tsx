import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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
  const queryClient = useQueryClient();
  const isRegistered = userRegistrations.includes(event.id);

  const registerMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from('event_registrations')
        .insert([{ event_id: event.id }]);
      
      if (error) throw error;

      await supabase
        .from('events')
        .update({ currentRegistrations: event.currentRegistrations + 1 })
        .eq('id', event.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['userRegistrations'] });
      toast({
        title: "Successfully registered!",
        description: `You are now registered for ${event.title}`,
      });
    },
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
          
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium"
            onClick={() => registerMutation.mutate()}
            disabled={isRegistered || registerMutation.isPending}
          >
            {isRegistered ? "Already Registered" : "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
};
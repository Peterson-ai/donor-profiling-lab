import { format, parseISO } from "date-fns";
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface EventCardProps {
  event: Event;
  userRegistrations: string[];
}

export const EventCard = ({ event, userRegistrations }: EventCardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isRegistered = userRegistrations.includes(event.id);
  const progress = (event.currentRegistrations / event.maxRegistrations) * 100;

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

  // Parse the ISO date strings to Date objects
  const startDate = parseISO(event.startDate);
  const endDate = parseISO(event.endDate);

  return (
    <div className="bg-[#1A2235] rounded-lg overflow-hidden">
      <img 
        src={event.imageUrl} 
        alt={event.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{event.title}</h3>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-0">
            {event.type}
          </Badge>
        </div>
        
        <p className="text-gray-400 mb-4">{event.description}</p>
        
        <div className="space-y-4">
          <div className="flex items-center text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            {event.location}
          </div>
          
          <div className="flex items-center text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            {event.currentRegistrations} / {event.maxRegistrations} registered
          </div>
          
          <div>
            <div className="text-xs text-gray-400 mb-1">
              Registration Progress
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-gray-700"
              indicatorClassName="bg-emerald-500"
            />
          </div>
          
          <div className="text-sm text-gray-400">
            {format(startDate, 'MMM dd, yyyy')} - {format(endDate, 'MMM dd, yyyy')}
          </div>
          
          <Button
            className="w-full"
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
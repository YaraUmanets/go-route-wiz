import React from 'react';
import { Clock, MapPin, User, Route, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DeliveryPin } from './LogisticsApp';
import { cn } from '@/lib/utils';

interface TaskPanelProps {
  pins: DeliveryPin[];
  optimizedPins: DeliveryPin[];
  totalDistance: string;
  estimatedTime: string;
  isOptimized: boolean;
}

export const TaskPanel: React.FC<TaskPanelProps> = ({
  pins,
  optimizedPins,
  totalDistance,
  estimatedTime,
  isOptimized
}) => {
  const selectedCount = pins.filter(pin => pin.selected).length;
  const displayPins = isOptimized ? 
    optimizedPins.sort((a, b) => (a.routeOrder || 0) - (b.routeOrder || 0)) :
    pins;

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col shadow-soft">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-card-foreground">Task Management</h2>
          {selectedCount > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {selectedCount} selected
            </Badge>
          )}
        </div>
        
        {isOptimized && (
          <div className="bg-accent/50 rounded-lg p-3 space-y-2 animate-fade-in">
            <h3 className="text-sm font-medium text-accent-foreground flex items-center gap-2">
              <Route className="w-4 h-4" />
              Route Summary
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{totalDistance}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="w-3 h-3" />
                <span>{estimatedTime}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {displayPins.map((pin) => (
          <Card 
            key={pin.id} 
            className={cn(
              "transition-all duration-300 hover:shadow-medium cursor-pointer",
              pin.selected && "ring-2 ring-primary bg-accent/30",
              pin.optimized && "bg-route-primary/10 border-route-primary/30 animate-fade-in"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {pin.optimized && pin.routeOrder && (
                    <div className="w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {pin.routeOrder}
                    </div>
                  )}
                  <h3 className="font-medium text-card-foreground text-sm">{pin.client}</h3>
                </div>
                {pin.optimized && (
                  <Badge variant="outline" className="bg-route-primary/10 text-route-primary border-route-primary/30">
                    Optimized
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{pin.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  <span>{pin.timeWindow}</span>
                </div>
              </div>
              
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  <span>John D.</span>
                </div>
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  pin.optimized ? "bg-route-primary" : pin.selected ? "bg-primary" : "bg-muted"
                )} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      {isOptimized && (
        <div className="p-4 border-t border-border bg-muted/30 space-y-3 animate-fade-in">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-medium"
            size="lg"
          >
            Confirm & Assign Route
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            Adjust Manually
          </Button>
        </div>
      )}
    </div>
  );
};
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DeliveryPin } from './LogisticsApp';
import mapBackground from '@/assets/map-background.jpg';

interface MapViewProps {
  pins: DeliveryPin[];
  onPinClick: (pinId: string, event: React.MouseEvent) => void;
  onRightClick: (event: React.MouseEvent) => void;
  routeVisible: boolean;
}

export const MapView: React.FC<MapViewProps> = ({ 
  pins, 
  onPinClick, 
  onRightClick, 
  routeVisible 
}) => {
  const optimizedPins = pins.filter(pin => pin.optimized).sort((a, b) => 
    (a.routeOrder || 0) - (b.routeOrder || 0)
  );

  const generateRoutePath = () => {
    if (optimizedPins.length < 2) return '';
    
    const points = optimizedPins.map(pin => `${pin.position.x},${pin.position.y}`).join(' ');
    return `M ${points.replace(/ /g, ' L ')}`;
  };

  return (
    <div 
      className="relative w-full h-full bg-muted overflow-hidden rounded-lg m-4 shadow-medium"
      onContextMenu={onRightClick}
      style={{
        backgroundImage: `url(${mapBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Route Lines */}
      {routeVisible && optimizedPins.length > 1 && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--route-primary))" />
              <stop offset="100%" stopColor="hsl(var(--route-secondary))" />
            </linearGradient>
          </defs>
          <path
            d={generateRoutePath()}
            stroke="url(#routeGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8 4"
            className="animate-route-draw"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
            }}
          />
        </svg>
      )}

      {/* Delivery Pins */}
      {pins.map((pin) => (
        <div
          key={pin.id}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group",
            pin.optimized && "animate-pin-bounce"
          )}
          style={{
            left: pin.position.x,
            top: pin.position.y,
            zIndex: pin.selected || pin.optimized ? 10 : 5
          }}
          onClick={(e) => onPinClick(pin.id, e)}
        >
          {/* Pin Shadow */}
          <div className="absolute top-1 left-1 w-6 h-6 bg-black/10 rounded-full blur-sm" />
          
          {/* Pin */}
          <div
            className={cn(
              "relative w-6 h-6 rounded-full flex items-center justify-center shadow-medium transition-all duration-200",
              "border-2 border-white group-hover:scale-110",
              pin.selected && "bg-pin-selected animate-pulse-glow border-pin-selected ring-2 ring-pin-selected/30",
              pin.optimized && "bg-pin-optimized border-pin-optimized",
              !pin.selected && !pin.optimized && "bg-pin-default border-pin-default"
            )}
          >
            <MapPin className="w-3 h-3 text-white" />
          </div>

          {/* Route Order Number */}
          {pin.optimized && pin.routeOrder && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-medium animate-fade-in">
              {pin.routeOrder}
            </div>
          )}

          {/* Hover Tooltip */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-card text-card-foreground text-xs px-2 py-1 rounded shadow-large opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {pin.client}
            <div className="text-muted-foreground">{pin.timeWindow}</div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-medium">
        <h3 className="text-sm font-medium text-card-foreground mb-2">Map Legend</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pin-default rounded-full border border-white" />
            <span className="text-muted-foreground">Available Tasks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pin-selected rounded-full border border-white" />
            <span className="text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pin-optimized rounded-full border border-white" />
            <span className="text-muted-foreground">Optimized Route</span>
          </div>
        </div>
      </div>
    </div>
  );
};
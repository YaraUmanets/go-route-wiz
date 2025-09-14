import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MapView } from './MapView';
import { TaskPanel } from './TaskPanel';
import { ContextMenu } from './ContextMenu';

export interface DeliveryPin {
  id: string;
  position: { x: number; y: number };
  address: string;
  client: string;
  timeWindow: string;
  selected?: boolean;
  optimized?: boolean;
  routeOrder?: number;
}

export interface ContextMenuData {
  visible: boolean;
  position: { x: number; y: number };
  selectedPins: DeliveryPin[];
}

const LogisticsApp = () => {
  const [pins, setPins] = useState<DeliveryPin[]>([
    {
      id: '1',
      position: { x: 320, y: 180 },
      address: '123 Main St, Downtown',
      client: 'Tech Corp Inc.',
      timeWindow: '9:00 AM - 11:00 AM'
    },
    {
      id: '2',
      position: { x: 480, y: 220 },
      address: '456 Oak Ave, Midtown',
      client: 'Green Solutions LLC',
      timeWindow: '10:30 AM - 12:00 PM'
    },
    {
      id: '3',
      position: { x: 680, y: 160 },
      address: '789 Pine Rd, Eastside',
      client: 'Blue Wave Systems',
      timeWindow: '1:00 PM - 3:00 PM'
    },
    {
      id: '4',
      position: { x: 560, y: 320 },
      address: '321 Elm St, Southside',
      client: 'Metro Dynamics',
      timeWindow: '11:00 AM - 1:00 PM'
    },
    {
      id: '5',
      position: { x: 420, y: 380 },
      address: '654 Maple Dr, Westpoint',
      client: 'Urban Logistics Co',
      timeWindow: '2:00 PM - 4:00 PM'
    }
  ]);

  const [contextMenu, setContextMenu] = useState<ContextMenuData>({
    visible: false,
    position: { x: 0, y: 0 },
    selectedPins: []
  });

  const [isOptimized, setIsOptimized] = useState(false);
  const [routeVisible, setRouteVisible] = useState(false);

  const handlePinClick = (pinId: string, event: React.MouseEvent) => {
    event.preventDefault();
    
    setPins(prevPins => 
      prevPins.map(pin => 
        pin.id === pinId 
          ? { ...pin, selected: !pin.selected }
          : pin
      )
    );
  };

  const handleMapRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    
    const selectedPins = pins.filter(pin => pin.selected);
    
    if (selectedPins.length > 0) {
      setContextMenu({
        visible: true,
        position: { x: event.clientX, y: event.clientY },
        selectedPins
      });
    }
  };

  const handleOptimizeRoute = () => {
    const selectedPins = pins.filter(pin => pin.selected);
    
    // Simulate route optimization with random reordering
    const optimizedOrder = [...selectedPins].sort(() => Math.random() - 0.5);
    
    setPins(prevPins => 
      prevPins.map(pin => {
        const optimizedPin = optimizedOrder.find(op => op.id === pin.id);
        if (optimizedPin) {
          const routeOrder = optimizedOrder.indexOf(optimizedPin) + 1;
          return { 
            ...pin, 
            optimized: true, 
            selected: false,
            routeOrder 
          };
        }
        return { ...pin, selected: false };
      })
    );
    
    setIsOptimized(true);
    setRouteVisible(true);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ ...contextMenu, visible: false });
  };

  const optimizedPins = pins.filter(pin => pin.optimized);
  const totalDistance = optimizedPins.length > 0 ? '12.4 km' : '0 km';
  const estimatedTime = optimizedPins.length > 0 ? '2h 15min' : '0min';

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar />
      
      <div className="flex flex-1 flex-col">
        <TopBar />
        
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 relative">
            <MapView 
              pins={pins}
              onPinClick={handlePinClick}
              onRightClick={handleMapRightClick}
              routeVisible={routeVisible}
            />
            
            {contextMenu.visible && (
              <ContextMenu 
                position={contextMenu.position}
                selectedPins={contextMenu.selectedPins}
                onOptimizeRoute={handleOptimizeRoute}
                onClose={handleCloseContextMenu}
              />
            )}
          </div>
          
          <TaskPanel 
            pins={pins}
            optimizedPins={optimizedPins}
            totalDistance={totalDistance}
            estimatedTime={estimatedTime}
            isOptimized={isOptimized}
          />
        </div>
      </div>
    </div>
  );
};

export default LogisticsApp;
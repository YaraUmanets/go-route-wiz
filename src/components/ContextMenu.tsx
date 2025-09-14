import React, { useEffect, useRef } from 'react';
import { Route, UserPlus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DeliveryPin } from './LogisticsApp';

interface ContextMenuProps {
  position: { x: number; y: number };
  selectedPins: DeliveryPin[];
  onOptimizeRoute: () => void;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  position,
  selectedPins,
  onOptimizeRoute,
  onClose
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const menuActions = [
    {
      icon: UserPlus,
      label: 'Assign to Driver',
      action: () => {
        console.log('Assign to driver');
        onClose();
      },
      color: 'text-card-foreground hover:bg-accent'
    },
    {
      icon: Route,
      label: 'Optimize Route',
      action: onOptimizeRoute,
      color: 'text-primary hover:bg-primary/10',
      highlight: true
    },
    {
      icon: Trash2,
      label: 'Delete Selection',
      action: () => {
        console.log('Delete selection');
        onClose();
      },
      color: 'text-destructive hover:bg-destructive/10'
    }
  ];

  return (
    <div 
      className="fixed z-50 animate-fade-in"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translateY(-10px)'
      }}
    >
      <Card 
        ref={menuRef}
        className="w-48 shadow-large border bg-card/95 backdrop-blur-sm"
      >
        <CardContent className="p-2">
          <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
            {selectedPins.length} task{selectedPins.length !== 1 ? 's' : ''} selected
          </div>
          
          {menuActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className={`w-full justify-start h-9 px-2 text-sm font-normal ${action.color} ${
                  action.highlight ? 'font-medium' : ''
                }`}
                onClick={action.action}
              >
                <Icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
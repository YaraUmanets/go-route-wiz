import React from 'react';
import { Users, Car, CheckSquare, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', active: false },
  { icon: Users, label: 'Teams', active: false },
  { icon: Car, label: 'Drivers', active: false },
  { icon: CheckSquare, label: 'Tasks', active: true },
  { icon: Settings, label: 'Settings', active: false },
];

export const Sidebar = () => {
  return (
    <div className="w-16 bg-card border-r border-border flex flex-col items-center py-6 shadow-soft">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mb-8">
        <div className="w-3 h-3 bg-primary-foreground rounded-sm" />
      </div>
      
      <nav className="flex flex-col gap-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              className={cn(
                "w-10 h-10 p-0 rounded-xl transition-all duration-200",
                item.active 
                  ? "bg-primary text-primary-foreground shadow-medium" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
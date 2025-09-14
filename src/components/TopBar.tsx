import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const TopBar = () => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-soft">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-card-foreground">Route Optimization</h1>
      </div>
      
      <div className="flex items-center gap-4 flex-1 max-w-md mx-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search locations, drivers, tasks..." 
            className="pl-10 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="w-9 h-9 p-0 rounded-lg">
          <Bell className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              JD
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-card-foreground">John Driver</span>
        </div>
      </div>
    </header>
  );
};
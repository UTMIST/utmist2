'use client';

import { Button } from "@ai2components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ai2components/ui/popover";
import { Notification } from "@app/context/NotificationsContext";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export const NotificationsPanel = ({
  notifications,
  markRead,
  markInteracted,
}: {
  notifications: Notification[];
  markRead: (id: string) => void;
  markInteracted: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  // console.log(notifications, unreadCount);
  useEffect(() => {
    if (open) {
      notifications.forEach(n => !n.read && markRead(n.id));
    }
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative hover:bg-accent/50 transition-colors"
          onClick={() => setOpen(!open)}
        >
          <Bell className="h-5 w-5 text-foreground" />
          {unreadCount > 0 && (
            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium p-0 leading-none border-2 border-background shadow-sm">
              {unreadCount}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 max-h-[80vh] overflow-y-auto p-4"
        align="end"
        sideOffset={10}
      >
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Notifications</h3>
          {notifications.filter(n => !n.interacted).length > 0 ? (
            notifications
              .filter(n => !n.interacted)
              .map(notification => (
                <div 
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    !notification.read 
                      ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                      : 'bg-muted hover:bg-muted/50'
                  } transition-colors`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-base">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                    {notification.actionText && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0"
                        onClick={() => {
                          notification.onAction?.();
                          markRead(notification.id);
                          markInteracted(notification.id);
                        }}
                      >
                        {notification.actionText}
                      </Button>
                    )}
                  </div>
                </div>
              ))
          ) : (
            <div className="text-center text-muted-foreground py-4">
              No new notifications
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

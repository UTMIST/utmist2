'use client';

import { createContext, useContext, useState } from "react";

export type Notification = {
  id: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  read: boolean;
  interacted: boolean;
};

type NotificationsContextType = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'interacted'>) => void;
  markRead: (id: string) => void;
  markInteracted: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  addNotification: () => {},
  markRead: () => {},
  markInteracted: () => {}
});

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'interacted'>) => {
    setNotifications(prev => [
      {
        ...notification,
        id: Date.now().toString(),
        read: false,
        interacted: false,
      },
      ...prev,
    ]);
  };

  const markRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markInteracted = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, interacted: true } : n))
    );
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, markRead, markInteracted }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

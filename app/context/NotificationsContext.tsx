'use client';

import { createContext, useContext, useState } from "react";

export type Notification = {
  id: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  read: boolean;
};

type NotificationsContextType = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read'>) => void;
  markRead: (id: string) => void;
};

const NotificationsContext = createContext<NotificationsContextType>({
  notifications: [],
  addNotification: () => {},
  markRead: () => {}
});

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'read'>) => {
    setNotifications(prev => [
      {
        ...notification,
        id: Date.now().toString(),
        read: false,
      },
      ...prev,
    ]);
  };

  const markRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <NotificationsContext.Provider value={{ notifications, addNotification, markRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);

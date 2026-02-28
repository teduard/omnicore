import { create } from "zustand";

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
}

interface INotificationState {
  notifications: INotification[];
  addNotification: (
    n: Omit<INotification, "id" | "timestamp" | "read">,
  ) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  read: (id: string) => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<INotificationState>((set, get) => ({
  notifications: [],

  addNotification: (n) =>
    set((state) => ({
      notifications: [
        {
          ...n,
          id: crypto.randomUUID(),
          timestamp: new Date(),
          read: false,
        },
        ...state.notifications, // newest first
      ],
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  dismiss: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  read: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => {
        if (n.id == id) {
          return {
            ...n,
            read: true,
          };
        }
        return {
          ...n,
        };
      }),
    })),

  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));

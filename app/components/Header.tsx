import { useNotifications } from '@app/context/NotificationsContext';

// In your Header component:
const { notifications, markRead, markInteracted } = useNotifications();
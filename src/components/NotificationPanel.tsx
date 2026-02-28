import {
  Box,
  Button,
  SpaceBetween,
  StatusIndicator,
  TextContent,
} from "@cloudscape-design/components";
import { useNotificationStore, type INotification } from "../hooks/";

import "./NotificationPanel.css"

const TYPE_MAP = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
} as const;

function NotificationItem({
  n,
  onDismiss,
  onRead,
}: {
  n: INotification;
  onDismiss: (id: string) => void;
  onRead: (id: string) => void;
}) {
  return (
    <div className={n.read ? "read":"normal"}>
    <Box
      padding="s"
      margin={{ bottom: "xxxs" }}
      color={n.read ? undefined : "text-status-info"}
    >
      <SpaceBetween size="xxxs">
        <SpaceBetween direction="horizontal" size="xs" alignItems="center">
          <StatusIndicator type={TYPE_MAP[n.type]}>{n.title}</StatusIndicator>
          <Button
            variant="icon"
            iconName="check"
            ariaLabel="Mark as read"
            onClick={() => onRead(n.id)}
          />
          <Button
            variant="icon"
            iconName="close"
            ariaLabel="Dismiss"
            onClick={() => onDismiss(n.id)}
          />
        </SpaceBetween>
        <TextContent>
                <p>{n.message}</p>
                <small>{n.timestamp.toLocaleTimeString()}</small>
        </TextContent>
      </SpaceBetween>
    </Box>
    </div>
  );
}

export function NotificationPanel() {
  const { notifications, dismiss, read, markAllRead } = useNotificationStore();

  return (
    <SpaceBetween size="s">
        {notifications.length > 0 && (
          <Button variant="normal" onClick={markAllRead} fullWidth={true}>
            Mark all as read
          </Button>
        )}

      {notifications.length === 0 ? (
        <Box color="text-body-secondary" textAlign="center" padding="xl">
          No notifications
        </Box>
      ) : (
        notifications.map((n) => (
          <NotificationItem key={n.id} n={n} onDismiss={dismiss} onRead={read} />
        ))
      )}
    </SpaceBetween>
  );
}

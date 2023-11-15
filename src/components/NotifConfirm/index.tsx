import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Stack,
} from "@chakra-ui/react";

const NotificationConfirmation = (props: { confirmNotif: any }) => {
  return (
    <Alert position="absolute" top="0" left="0" right="0" zIndex="9999">
      <AlertIcon />
      <Stack>
        <AlertTitle>Notification</AlertTitle>
        <AlertDescription>
          Would you like to enable notification?
        </AlertDescription>
      </Stack>
      <Button size="sm" onClick={() => props.confirmNotif(true)}>
        Sure
      </Button>
      <Button size="sm" onClick={() => props.confirmNotif(false)}>
        No, thanks
      </Button>
    </Alert>
  );
};

export default NotificationConfirmation;

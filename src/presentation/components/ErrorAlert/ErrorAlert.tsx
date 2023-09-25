import {
  Alert
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export type ErrorAlertProps = {
  message: string;
  handleCloseAlert: () => void;
}

export const ErrorAlert = (props: ErrorAlertProps) => {
  const {
    message,
    handleCloseAlert
  } = props;

  const alertIcon = <IconAlertCircle size="1rem" />;

  return (
    <>
      <Alert
        color="red"
        title="Error"
        mt={16}
        icon={alertIcon}
        closeButtonLabel="Close"
        onClose={handleCloseAlert}
        withCloseButton
      >
        {message}
      </Alert>
    </>
  );
};

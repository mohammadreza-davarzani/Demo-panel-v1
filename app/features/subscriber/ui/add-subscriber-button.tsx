import React, { ReactNode } from "react";
import { Button } from "@mantine/core";
import { subscriberLanguage } from "@shared/i18n/locales/fa/panel/subscriber";
import AddSubscriberForm from "@/entities/subscriber/ui/add-subscriber-form";
const AddSubscriberButton = ({
  close,
  opened,
  open
}: {
  opened: boolean;
  open: () => void;
  close: () => void;
}): ReactNode => {
  return (
    <>
      <AddSubscriberForm opened={opened} onClose={close} />
      <Button className="subscriber-management-add-subscriber" onClick={open}>
        {subscriberLanguage.management.textButton}
      </Button>
    </>
  );
};

export default AddSubscriberButton;

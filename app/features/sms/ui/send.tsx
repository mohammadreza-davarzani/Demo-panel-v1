import { modals } from "@mantine/modals";
import { Text, Button } from "@mantine/core";
import React, { ReactNode, useEffect, useState } from "react";
import { useTextSMS } from "@shared/state-management/single-sms";
import { globalLanguage, smsLanguage } from "@shared/i18n/locales/fa";

const Send = (): ReactNode => {
  const [text, setText] = useState("");
  const textSms = useTextSMS(state => state.textSMS);
  const setTextSMS = useTextSMS(state => state.setTextSMS);

  const openModal = (): void =>
    modals.openConfirmModal({
      title: smsLanguage.sendSms.sendTitleModal,
      children: <Text size="sm">{smsLanguage.sendSms.messageConfirmModal}</Text>,
      centered: true,
      labels: { confirm: smsLanguage.sendSms.send, cancel: globalLanguage.no },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed")
    });
  const handleClick = (): void => {
    if (text.length === 0) {
      setTextSMS({ error: true, message: smsLanguage.sendSms.textAreaPlaceholder });
      return;
    }
    openModal();
  };
  useEffect(() => {
    console.log({ text: textSms.value });
    setText(textSms.value ?? "");
  }, [textSms]);
  return (
    <Button w={100} onClick={handleClick}>
      {smsLanguage.sendSms.send}
    </Button>
  );
};

export default Send;

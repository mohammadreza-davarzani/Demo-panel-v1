import { Modal, Box, Input } from "@mantine/core";
import React, { ReactNode, useState } from "react";
import { IconChecks, IconCopy, IconProgressCheck } from "@tabler/icons-react";
import { subscriberLanguage } from "@shared/i18n/locales/fa/panel/subscriber";
import { useClipboard } from "@mantine/hooks";
import { useSubscriberInformation } from "@shared/state-management/add-subscriber";
const ShowSubscriberInformation = (): ReactNode => {
  // const [opened, { close }] = useDisclosure(false);
  const usernameCopy = useClipboard({ timeout: 1000 });
  const passwordCopy = useClipboard({ timeout: 1000 });

  const information = useSubscriberInformation(state => state.information);
  const [password] = useState(Math.random().toString(36).slice(-8));
  const addInfo = useSubscriberInformation(state => state.addInfo);

  return (
    <Modal
      opened={information.showModal}
      centered
      size="xl"
      onClose={(): void => addInfo({ userName: undefined, password: undefined, showModal: false })}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3
      }}
    >
      <Box mx="auto">
        <div className="confirm-modal-icon-success">
          <IconProgressCheck size="6rem" color="green" />
          <div>{subscriberLanguage.management.confirm.confirmMesseage}</div>
        </div>
        <div className="confirm-modal-input-wrapper">
          <div className="confirm-modal-input-item">
            <label>{subscriberLanguage.management.confirm.userName}:</label>
            <Input
              disabled
              value={"ISS324"}
              rightSectionPointerEvents="all"
              mt="md"
              w="15rem"
              rightSection={
                usernameCopy.copied ? (
                  <IconChecks color="green" className="confirm-modal-input-item-icon-check" />
                ) : (
                  <IconCopy
                    className="confirm-modal-input-item-icon-copy"
                    onClick={(): void => usernameCopy.copy("ISS324")}
                  />
                )
              }
            />
          </div>
          <div className="confirm-modal-input-item">
            <label>{subscriberLanguage.management.confirm.password}:</label>
            <Input
              disabled
              value={password}
              rightSectionPointerEvents="all"
              mt="md"
              w="15rem"
              rightSection={
                passwordCopy.copied ? (
                  <IconChecks className="confirm-modal-input-item-icon-check" />
                ) : (
                  <IconCopy
                    className="confirm-modal-input-item-icon-copy"
                    onClick={(): void => passwordCopy.copy(password)}
                  />
                )
              }
            />
          </div>
        </div>
        {/* <Button color={clipboard.copied ? "teal" : "blue"} onClick={() => clipboard.copy("Hello, world!")}>
          {clipboard.copied ? "Copied" : "Copy"}
        </Button> */}
      </Box>
    </Modal>
  );
};

export default ShowSubscriberInformation;

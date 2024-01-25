import { subscriberLanguage } from "@shared/i18n/locales/fa/panel/subscriber";
import AddSubscriberForm from "@entities/subscriber/ui/add-subscriber-form";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import { useSubscriberState } from "@shared/state-management/subscriber-list";
import { Card, CardSection, Switch, GridCol } from "@mantine/core";
import { SubscriberResultType, SubscribersListType } from "@shared/model";
import React, { ReactNode, useEffect, useState } from "react";
import ShowSubscriberInformation from "@entities/subscriber/ui/show-subscriber-information";
import Editsubscriber from "@entities/subscriber/ui/edit-subscriber";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";

const SubscriberList = ({
  openAddSubscriberModal,
  openedAddSubscriberModal,
  closeAddSubscriberModal
}: {
  openedAddSubscriberModal: boolean;
  openAddSubscriberModal: () => void;
  closeAddSubscriberModal: () => void;
}): ReactNode => {
  const [editSubscriber, setEditSubscriber] = useState({});
  const [subscriberState, setSubscriberState] = useState<SubscribersListType>([]);

  const subscribers = useSubscriberState(state => state.subscribers) as SubscribersListType;
  const removeSubscriber = useSubscriberState(state => state.removeSubscriber);

  const [openedEditSubscriberModal, { open, close }] = useDisclosure(false);
  const openModal = (item: SubscriberResultType): void =>
    modals.openConfirmModal({
      title: subscriberLanguage.management.form.confirmDeleteTitle,
      labels: {
        confirm: subscriberLanguage.management.modal.deleteConfirm,
        cancel: subscriberLanguage.management.modal.cancel
      },
      cancelProps: { bg: "red", c: "white" },
      onCancel: () => console.log("Cancel"),
      onConfirm: (): void => removeSubscriber(item),
      centered: true
    });
  const handleEdit = (subscriber: SubscriberResultType): void => {
    setEditSubscriber(subscriber);
    open();
  };
  useEffect(() => {
    setSubscriberState(subscribers);
  }, [subscribers]);
  return (
    <>
      <ShowSubscriberInformation />
      <AddSubscriberForm opened={openedAddSubscriberModal} onClose={closeAddSubscriberModal} />
      <Editsubscriber
        editSubscriber={editSubscriber}
        openedEditSubscriberModal={openedEditSubscriberModal}
        onClose={close}
      />

      <GridCol span={{ xs: 12, md: 6, lg: 4, xl: 3 }} className="subscriber-management-list">
        <button className="subscriber-management-list-add-card" onClick={openAddSubscriberModal}>
          <IconPlus size="3.438rem" className="subscriber-management-list-add-card-icon" />
          <p className="subscriber-management-list-add-card-icon">{subscriberLanguage.management.textButton}</p>
        </button>
      </GridCol>
      {subscriberState.map((item: SubscriberResultType, index: number) => (
        <GridCol className="subscriber-management-list" key={index} span={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
          <Card className="subscriber-management-list-card">
            <CardSection inheritPadding py="xs" className="subscriber-management-list-card-body">
              <header>
                <div className="subscriber-management-list-card-header">
                  <div>
                    <h1>{subscriberLanguage.management.lists.name}</h1>
                    <p>{item.username}</p>
                  </div>

                  <div className="subscriber-management-list-card-header">
                    <Switch size="md" color="green" />

                    <IconTrash
                      onClick={(): void => openModal(item)}
                      className="subscriber-management-list-card-wrapper-icon"
                    />
                    <IconEdit
                      onClick={(): void => handleEdit(item)}
                      className="subscriber-management-list-card-wrapper-icon"
                    />
                  </div>
                </div>
              </header>
              <div className="subscriber-management-list-card-header">
                <div>
                  <h1>{subscriberLanguage.management.lists.ip}</h1>
                  <p>{item.ipAddress}</p>
                </div>
              </div>
            </CardSection>
          </Card>
        </GridCol>
      ))}
    </>
  );
};

export default SubscriberList;

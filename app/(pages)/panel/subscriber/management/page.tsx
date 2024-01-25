"use client";
import SubscriberList from "@widgets/panel/ui/subscriber/ui/subscriber-list";
import EmptyPage from "@widgets/panel/ui/subscriber/ui/empty-page";
import { useSubscriberState } from "@shared/state-management/subscriber-list";
import { Grid } from "@mantine/core";
import React, { ReactNode, useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { getRequest } from "@shared/api";
import { subscribersAddresses } from "@shared/constants/relative-url";
import toastAlert from "@shared/helpers/toast";
import { SubscribersListType } from "@shared/model";

const SubscriberManagement = (): ReactNode => {
  const [subscribers, setSubscribers] = useState<SubscribersListType>([]);
  const addSubscribers = useSubscriberState(state => state.addSubscribers);
  const [openedAddSubscriberModal, { open, close }] = useDisclosure(false);

  const getSubscribersList = (): void => {
    getRequest(subscribersAddresses.getSubscriberList, undefined, false).then(response => {
      console.log({ response });
      const { message, isSuccess, result } = response;
      if (!isSuccess) {
        toastAlert(message as string, "error");
        return;
      }
      addSubscribers((result as SubscribersListType) ?? []);
      setSubscribers((result as SubscribersListType) ?? []);
    });
  };
  useEffect(() => {
    getSubscribersList();
  }, []);
  return (
    <Grid className={`subscriber-management${subscribers.length === 0 ? " empty-list" : null}`}>
      {subscribers.length === 0 ? (
        <EmptyPage
          openedAddSubscriberModal={openedAddSubscriberModal}
          openAddSubscriberModal={open}
          AddSubscriberModal={close}
        />
      ) : (
        <SubscriberList
          openedAddSubscriberModal={openedAddSubscriberModal}
          openAddSubscriberModal={open}
          closeAddSubscriberModal={close}
        />
      )}
    </Grid>
  );
};

export default SubscriberManagement;

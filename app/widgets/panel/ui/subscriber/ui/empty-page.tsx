"use-";
import AddSubscriberButton from "@features/subscriber/ui/add-subscriber-button";
import EmptyContact from "@entities/subscriber/ui/emptyContent";
import React, { ReactNode } from "react";
import { GridCol } from "@mantine/core";
import ShowSubscriberInformation from "@/entities/subscriber/ui/show-subscriber-information";
const EmptyPage = ({
  openedAddSubscriberModal,
  openAddSubscriberModal,
  AddSubscriberModal
}: {
  openedAddSubscriberModal: boolean;
  openAddSubscriberModal: () => void;
  AddSubscriberModal: () => void;
}): ReactNode => {
  return (
    <GridCol className="subscriber-management-empty-page">
      <EmptyContact />
      <ShowSubscriberInformation />
      <AddSubscriberButton opened={openedAddSubscriberModal} open={openAddSubscriberModal} close={AddSubscriberModal} />
    </GridCol>
  );
};

export default EmptyPage;

import { SubscriberFormType } from "@shared/model";
export interface AddSubscriberModalTypeData {
  opened: boolean;
  onClose(): void;
}
export interface EditSubscriberModalTypeData {
  openedEditSubscriberModal: boolean;
  editSubscriber: SubscriberFormType;
  onClose(): void;
}
export interface ContactPoints {
  firstName: string;
  lastName: string;
  contactPhoneNumber: string;
}

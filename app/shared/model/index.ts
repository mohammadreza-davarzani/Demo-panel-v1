import { SVGProps } from "react";

export interface SVGFile extends SVGProps<SVGSVGElement> {
  src: string;
}

/*for single sms*/
export interface UseGetInformation {
  phoneNumber: string;
  id: string;
  getUser: (tag: string, id: string) => void;
  clear: () => void;
}

export interface ContactPoints {
  firstName: string;
  lastName: string;
  contactPhoneNumber: string;
}
export interface SubscriberFormTypeState {
  ip: string;
  name: string;
  sendType: string[];
  description: string;
  rateLimitOtp: number | undefined;
  rateLimitBulk: number | undefined;
  lineNumberOtp: string | null;
  lineNumberBulk: string | null;
  lineNumberDelivery: string | null;
  priorityOptions: string | null;
  rateLimitDelivery: number | undefined;
  contactPoints?: ContactPoints[];
}
export interface SubscriberFormType {
  name: string;
  sendType: string[];
  ip: string;
  description: string;
  rateLimitOtp: number | undefined;
  rateLimitBulk: number | undefined;
  lineNumberOtp: string | null;
  lineNumberBulk: string | null;
  lineNumberDelivery: string | null;
  priorityOptions: string | null;
  rateLimitDelivery: number | undefined;
}
export interface SubscriberResultType {
  subscriberId: string;
  username: string;
  title: string;
  description: string;
  isActive: boolean;
  ipAddress: string;
}
export type SubscribersListType = SubscriberResultType[] | [];
export interface SubscribersType {
  subscribers: SubscriberResultType[];
  // updateSubscriber: (updatedSubscriber: SubscriberFormTypeState) => void;
  // addSubscriber: (newSubscriber: SubscriberFormTypeState) => void;
  addSubscribers: (subscribers: SubscribersListType) => void;
  removeSubscriber: (deletedSubscriber: SubscriberResultType) => void;
}

export interface Tags {
  tags: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  clear: () => void;
}
export interface UseTextSMS {
  textSMS: { value?: string; error?: boolean; message?: string };
  setTextSMS: ({ value, error, message }: { value?: string; error?: boolean; message?: string }) => void;
  clear: () => void;
}
export interface Information {
  userName: string | undefined;
  password: string | undefined;
  showModal: boolean;
}

export interface InformationState {
  information: Information;
  addInfo: (newInfo: Information) => void;
}

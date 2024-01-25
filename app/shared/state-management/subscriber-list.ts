import { create } from "zustand";
import { SubscriberResultType, SubscribersListType, SubscribersType } from "../model";

export const useSubscriberState = create<SubscribersType>(set => ({
  subscribers: [],
  addSubscribers: (subscribers: SubscribersListType): void =>
    set(() => {
      return {
        subscribers
      };
    }),
  // addSubscriber: (newSubscriber: SubscriberFormTypeState): void =>
  //   set(prevState => {
  //     if (!prevState.subscribers.includes(newSubscriber)) {
  //       return {
  //         ...prevState,
  //         subscribers: [...prevState.subscribers, newSubscriber]
  //       };
  //     }
  //     return prevState;
  //   }),
  // updateSubscriber: (updatedSubscriber: SubscriberFormTypeState): void => {
  //   set(prevState => {
  //     const newSubscribers = prevState.subscribers.filter(
  //       (subscriber: SubscriberFormTypeState) => subscriber.ip !== updatedSubscriber.ip
  //     );
  //     return {
  //       ...prevState,
  //       subscribers: [...(newSubscribers ? newSubscribers : []), updatedSubscriber]
  //     };
  //   });
  // },
  removeSubscriber: (deletedSubscriber: SubscriberResultType): void =>
    set(prevState => ({
      subscribers: prevState.subscribers.filter(
        subscriber => subscriber.subscriberId !== deletedSubscriber.subscriberId
      )
    }))
}));

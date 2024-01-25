import { fakeData } from "../model";
import { Grid, GridCol } from "@mantine/core";
import React, { ReactNode } from "react";
import { smsLanguage } from "@shared/i18n/locales/fa";
import { useGetInformation } from "@shared/state-management/single-sms";
const UserInformation = (): ReactNode => {
  const userInfo = useGetInformation(state => state);
  const checker = userInfo.phoneNumber && userInfo.id;
  return (
    <Grid>
      <GridCol span={3}>
        {smsLanguage.userInfo.nameContact}: {checker ? fakeData.nameContact : null}
      </GridCol>
      <GridCol span={3}>
        {smsLanguage.userInfo.idContact}: {checker ? fakeData.idContact : null}
      </GridCol>
      <GridCol span={3}>
        {smsLanguage.userInfo.smsIdLabel}: {checker ? fakeData.smsIdLabel : null}
      </GridCol>
      <GridCol span={3}>
        {smsLanguage.userInfo.customer}: {checker ? fakeData.customer : null}
      </GridCol>
      <GridCol span={3}>
        {smsLanguage.userInfo.sendPriority}: {checker ? fakeData.sendPriority : null}
      </GridCol>
      <GridCol span={3}>
        {smsLanguage.userInfo.inquiryState}: {checker ? fakeData.inquiryState : null}
      </GridCol>
      <GridCol span={3}>
        {smsLanguage.userInfo.providerName}: {checker ? fakeData.providerName : null}
      </GridCol>
      <GridCol span={3}>
        {smsLanguage.userInfo.sendingChannel}: {checker ? fakeData.sendingChannel : null}
      </GridCol>
    </Grid>
  );
};

export default UserInformation;

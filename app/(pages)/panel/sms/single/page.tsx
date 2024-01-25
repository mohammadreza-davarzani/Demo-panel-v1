"use client";
import React, { ReactNode } from "react";
import { Grid, GridCol, Divider } from "@mantine/core";
import SingleSmsWidget from "@widgets/panel/ui/sms/ui/single";
import GetUserInformation from "@features/sms/ui/get-user-informations";
import UserInformation from "@widgets/panel/ui/sms/ui/user-information";
import { useGetInformation } from "@shared/state-management/single-sms";

const SingleSms = (): ReactNode => {
  const userInfo = useGetInformation(state => state);

  return (
    <Grid className="sms">
      <GridCol>
        <h1 className="text-xl">صندوق ارسال پیامک تک</h1>
        <Divider my="sm" />
      </GridCol>
      <GridCol>
        <GetUserInformation />
      </GridCol>
      <GridCol>
        <UserInformation />
      </GridCol>
      {userInfo.phoneNumber && userInfo.id ? (
        <GridCol>
          <SingleSmsWidget />
        </GridCol>
      ) : null}
    </Grid>
  );
};

export default SingleSms;

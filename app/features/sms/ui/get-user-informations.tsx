"use client";
import { ReactNode } from "react";
import { useForm } from "@mantine/form";
import { smsLanguage } from "@shared/i18n/locales/fa";
import { Button, Select, Group, TextInput, Grid, GridCol } from "@mantine/core";
import { useGetInformation } from "@shared/state-management/single-sms";
import { idTags } from "../model";

const GetUserInformation = (): ReactNode => {
  const phoneRegex = /^09[0-9]{9}$/;
  const setUser = useGetInformation(state => state.getUser);
  const form = useForm({
    initialValues: { phoneNumber: "", id: "" },
    // functions will be used to validate values at a corresponding key
    validate: {
      id: value => (value.length > 0 ? null : smsLanguage.searchSms.idValidate),
      phoneNumber: value =>
        value.length > 0
          ? phoneRegex.test(value)
            ? null
            : smsLanguage.searchSms.phoneNumberValidate
          : smsLanguage.searchSms.phoneNumberEmpty
    }
  });
  return (
    <form onSubmit={form.onSubmit(e => setUser(e.phoneNumber, e.id))}>
      <Grid>
        <GridCol span={{ xs: 12, md: 4, lg: 3 }}>
          <Select placeholder={smsLanguage.searchSms.id} data={idTags} {...form.getInputProps("id")} />
        </GridCol>
        <GridCol span={{ xs: 12, md: 4, lg: 3 }}>
          <TextInput
            withAsterisk
            placeholder={smsLanguage.searchSms.phoneNumber}
            {...form.getInputProps("phoneNumber")}
          />
        </GridCol>
        <GridCol span={2}>
          <Group>
            <Button type="submit">{smsLanguage.searchSms.search}</Button>
          </Group>
        </GridCol>
      </Grid>
    </form>
  );
};

export default GetUserInformation;

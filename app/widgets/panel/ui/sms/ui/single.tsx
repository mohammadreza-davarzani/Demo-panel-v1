"use client";
import Send from "@features/sms/ui/send";
import React, { ReactNode } from "react";
import Tags from "@entities/sms/ui/tags";
import Reject from "@features/sms/ui/reject";
import AddTags from "@features/sms/ui/add-tags";
import LabelInput from "@entities/sms/ui/label";
import TextArea from "@entities/sms/ui/textarea";
import { Grid, GridCol, Group } from "@mantine/core";

const SingleSmsWidget = (): ReactNode => {
  return (
    <form>
      <Grid>
        <GridCol span={{ xs: 12, md: 4, lg: 3 }}>
          <LabelInput />
        </GridCol>
        <GridCol span={{ xs: 12, md: 4, lg: 3 }}>
          <AddTags />
        </GridCol>
        <Tags />
        <GridCol span={{ xs: 12 }}>
          <Grid>
            <GridCol span={{ xs: 12, md: 8, lg: 6 }}>
              <TextArea />
            </GridCol>
          </Grid>
        </GridCol>
        <GridCol className="flex justify-end items-end" span={{ xs: 12, md: 4, lg: 6 }}>
          <Group>
            <Reject />
            <Send />
          </Group>
        </GridCol>
      </Grid>
    </form>
  );
};

export default SingleSmsWidget;

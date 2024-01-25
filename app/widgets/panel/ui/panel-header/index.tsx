import { Group } from "@mantine/core";
import React, { ReactNode } from "react";
import ToggleColor from "@shared/ui/toggle-color";
import Brand from "@entities/header/ui/brand";

const PanelHeader = (): ReactNode => {
  return (
    <Group style={{ height: "100%" }} px={20} justify="space-between">
      <Brand />
      <ToggleColor />
    </Group>
  );
};

export default PanelHeader;

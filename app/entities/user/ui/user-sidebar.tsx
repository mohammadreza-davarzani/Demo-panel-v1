import React, { ReactNode } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { UnstyledButton, Group, Avatar, Text, Divider } from "@mantine/core";

export default function UserSidebar(): ReactNode {
  return (
    <UnstyledButton>
      <Divider w="full" />
      <Group p="md">
        <Avatar radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500} ta="right">
            m.davarzani
          </Text>
          <Text c="dimmed" size="sm" ta="right">
            m.davarzani@asax.ir
          </Text>
        </div>
        <IconChevronLeft style={{ width: "22px", height: "22px" }} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}

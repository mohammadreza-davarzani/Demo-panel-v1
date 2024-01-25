import React, { ReactNode } from "react";
import UserSidebar from "@entities/user/ui/user-sidebar";
import MenuLists from "@entities/sidebar/ui/menu-lists";
import { AppShellSection, ScrollArea } from "@mantine/core";

const PanelNavbar = (): ReactNode => {
  return (
    <>
      <AppShellSection grow my="md" component={ScrollArea}>
        <MenuLists />
      </AppShellSection>
      <AppShellSection className="!mx-auto !flex !items-center !justify-center" w="100%">
        <UserSidebar />
      </AppShellSection>
    </>
  );
};

export default PanelNavbar;

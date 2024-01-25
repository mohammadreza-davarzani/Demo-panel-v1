import { NavLink } from "@mantine/core";
import React, { ReactNode, useState } from "react";
import { SubmenuItems } from "@shared/ui/menu-items";
import { IconChevronLeft } from "@tabler/icons-react";
import { LinkMenuProps } from "@shared/ui/menu-items";

const MenuItems = ({ index, subMenus, Icon, initiallyOpened, label, link }: LinkMenuProps): ReactNode => {
  const [opened, setOpened] = useState(initiallyOpened || false);
  const hasLinks = Array.isArray(subMenus);
  const subMenuItems = (hasLinks ? subMenus : [])?.map((item, index) => (
    <SubmenuItems subMenuItem={item} index={index} key={index} />
  ));
  return (
    <NavLink
      key={index}
      ta="right"
      label={label}
      href={link ?? link}
      leftSection={<Icon size="1rem" stroke={1.5} />}
      rightSection={
        hasLinks ? (
          <IconChevronLeft
            style={{
              transform: !opened ? "rotate(-180deg)" : "none"
            }}
            size="1rem"
            stroke={1.5}
          />
        ) : null
      }
      onClick={(): void => {
        setOpened(o => !o);
      }}
      color="indigo"
      childrenOffset={10}
    >
      {hasLinks ? subMenuItems : null}
    </NavLink>
  );
};

export default MenuItems;

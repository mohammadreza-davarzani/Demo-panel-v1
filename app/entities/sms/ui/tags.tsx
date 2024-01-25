import React, { ReactNode } from "react";
import { IconX } from "@tabler/icons-react";
import { Badge, GridCol } from "@mantine/core";
import { useTag } from "@shared/state-management/single-sms";
const Tags = (): ReactNode => {
  const tags = useTag(state => state.tags);
  const removeTag = useTag(state => state.removeTag);

  return (
    <GridCol className="sms-tags" span={12} hidden={tags.length === 0}>
      {tags.map((tag: string, index: number) => (
        <Badge className="sms-badge" onClick={(): void => removeTag(tag)} key={index}>
          <div>
            <IconX size={14} />
            <p>#{tag}</p>
          </div>
        </Badge>
      ))}
    </GridCol>
  );
};

export default Tags;

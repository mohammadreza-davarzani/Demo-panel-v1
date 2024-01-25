import { Select } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { ReactNode, useState } from "react";
import { smsLanguage } from "@shared/i18n/locales/fa";
import { useTag } from "@shared/state-management/single-sms";
import { dataTags } from "../model";

const AddTags = (): ReactNode => {
  const [selectedTag, setSelectedTag] = useState("");
  const addTag = useTag(state => state.addTag);
  const tags = useTag(state => state.tags);

  const handleClickTag = (): void => {
    if (!selectedTag || selectedTag.length === 0) return;
    addTag(selectedTag);
    setSelectedTag("");
  };
  return (
    <>
      {/*todo: duplicate validation*/}
      <Select
        error={tags.length === 10 ? smsLanguage.sendSms.errorTag : null}
        data={dataTags}
        disabled={tags.length > 9}
        placeholder={smsLanguage.sendSms.tagLabel}
        rightSection={<IconPlus className="cursor-pointer " onClick={handleClickTag} />}
        onSearchChange={setSelectedTag}
        searchable
        value={selectedTag}
        nothingFoundMessage="Nothing found..."
      />
    </>
  );
};

export default AddTags;

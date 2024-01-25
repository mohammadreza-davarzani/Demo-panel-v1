import { Textarea } from "@mantine/core";
import { smsLanguage } from "@shared/i18n/locales/fa";
import { useTextSMS } from "@shared/state-management/single-sms";
import React, { ChangeEvent, ReactNode, useEffect, useState } from "react";

const TextArea = (): ReactNode => {
  const setText = useTextSMS(state => state.setTextSMS);
  const [hasUnicode, setHasUnicode] = useState(false);
  const getError = useTextSMS(state => state);
  const [textSms, setTextSms] = useState("");

  function isEnglishCharacter(character: string): boolean {
    const charCode = character.charCodeAt(0);
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    if (!event.target.value || event.target.value.length === 0) setTextSms("");
    setTextSms(event.target.value);
  };
  const messageCount =
    textSms.length <= (hasUnicode ? 64 : 128) ? 1 : Math.ceil(textSms.length / (hasUnicode ? 64 : 128));
  useEffect(() => {
    setHasUnicode(!textSms.split("").every(character => isEnglishCharacter(character)));
    setText({ value: textSms });
  }, [textSms]);
  return (
    <>
      <Textarea
        autosize
        minRows={10}
        value={textSms}
        onChange={handleChange}
        required
        error={getError.textSMS.error ? getError.textSMS.message : null}
        placeholder={smsLanguage.sendSms.textAreaPlaceholder}
      />
      <div className="sms-text-information">
        <p className="sms-text-information-language">
          {textSms.length > 0 ? (hasUnicode ? smsLanguage.sendSms.persian : smsLanguage.sendSms.english) : null}
        </p>
        <p className="sms-text-information-length">
          {textSms.length > 0 ? messageCount : 0} / {textSms.length}
        </p>
      </div>
    </>
  );
};

export default TextArea;

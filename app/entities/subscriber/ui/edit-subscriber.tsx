import {
  Modal,
  Button,
  Box,
  Group,
  TextInput,
  NumberInput,
  MultiSelect,
  TableTr,
  TableTd,
  Table,
  TableTh,
  TableThead,
  TableTbody,
  Select,
  Textarea,
  Divider,
  GridCol,
  Grid
} from "@mantine/core";
import { EditSubscriberModalTypeData, ContactPoints } from "@entities/subscriber/model";
import { subscriberLanguage } from "@shared/i18n/locales/fa/panel/subscriber";
import { useSubscriberState } from "@shared/state-management/subscriber-list";
import React, { ReactNode, useEffect, useState } from "react";
import { IconTrashFilled } from "@tabler/icons-react";
import { IconUserPlus } from "@tabler/icons-react";
import { SubscriberFormType } from "@shared/model";
import { useForm } from "@mantine/form";

const Editsubscriber = ({
  openedEditSubscriberModal,
  editSubscriber,
  onClose
}: EditSubscriberModalTypeData): ReactNode => {
  const [contactPoints, setContactPoints] = useState<ContactPoints[]>([]);

  const [hasUnicode, setHasUnicode] = useState(false);
  const [loading, setLoading] = useState(true);

  const updateSubscriber = useSubscriberState(state => state.updateSubscriber);
  const subscribers = useSubscriberState(state => state.subscribers);

  enum PropertyIdEnum {
    High = 1,
    Medium = 2,
    Low = 3
  }

  const contactForm = useForm<ContactPoints>({
    initialValues: {
      firstName: "",
      lastName: "",
      contactPhoneNumber: ""
    },
    validate: {
      firstName: value =>
        value.length > 0
          ? !hasUnicode
            ? subscriberLanguage.management.form.persianError
            : null
          : subscriberLanguage.management.form.firstNameError,

      lastName: value =>
        value.length > 0
          ? !hasUnicode
            ? subscriberLanguage.management.form.persianError
            : null
          : subscriberLanguage.management.form.lastNameError,
      contactPhoneNumber: value =>
        value.length > 0
          ? /^09[0-9]{9}$/.test(value)
            ? null
            : subscriberLanguage.management.form.contactPhoneNumberError
          : subscriberLanguage.management.form.emptyContcatPhoneNumber
    }
  });

  const subscriberForm = useForm<SubscriberFormType>({
    initialValues: {
      ip: "",
      name: "",
      sendType: [],
      description: "",
      rateLimitOtp: undefined,
      rateLimitBulk: undefined,
      priorityOptions: null,
      rateLimitDelivery: undefined,
      lineNumberOtp: null,
      lineNumberBulk: null,
      lineNumberDelivery: null
    },

    validate: {
      ip: value =>
        value.length > 0
          ? /^((\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3}))$/.test(value)
            ? null
            : subscriberLanguage.management.form.ipError2
          : subscriberLanguage.management.form.ipError,
      name: value =>
        value.length > 0
          ? !hasUnicode
            ? subscriberLanguage.management.form.persianError
            : null
          : subscriberLanguage.management.form.nameError,

      sendType: value => (value.length > 0 ? null : subscriberLanguage.management.form.typeSelectError),
      rateLimitOtp: (value, values) => {
        if (!values.sendType.includes("otp")) return false;
        return /^[1-9]+$/.test(String(value)) ? null : subscriberLanguage.management.form.rateLimitError;
      },
      rateLimitBulk: (value, values) => {
        if (!values.sendType.includes("bulk")) return false;
        return /^[1-9]+$/.test(String(value)) ? null : subscriberLanguage.management.form.rateLimitError;
      },
      rateLimitDelivery: (value, values) => {
        if (!values.sendType.includes("delivery")) return false;
        return /^[1-9]+$/.test(String(value)) ? null : subscriberLanguage.management.form.rateLimitError;
      },
      priorityOptions: value => (value ? null : subscriberLanguage.management.form.priorityError),
      lineNumberOtp: (value, values) => {
        if (!values.sendType.includes("otp")) return false;
        value ? null : subscriberLanguage.management.form.typeSelectError;
      },
      lineNumberBulk: (value, values) => {
        if (!values.sendType.includes("bulk")) return false;
        value ? null : subscriberLanguage.management.form.typeSelectError;
      },
      lineNumberDelivery: (value, values) => {
        if (!values.sendType.includes("delivery")) return false;
        value ? null : subscriberLanguage.management.form.typeSelectError;
      }
    }
  });

  const handleAddContactPoints = (): void => {
    contactForm.validate();

    if (contactForm.isValid()) {
      setContactPoints([
        ...contactPoints,
        {
          firstName: contactForm.values.firstName,
          lastName: contactForm.values.lastName,
          contactPhoneNumber: contactForm.values.contactPhoneNumber
        }
      ]);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    if (contactPoints.length === 0) return;
    subscriberForm.validate();

    if (subscriberForm.isValid()) {
      updateSubscriber({ ...subscriberForm.values, contactPoints });
      onClose();
    }
    e.preventDefault();
  };
  useEffect(() => {}, [subscribers]);
  const handleDeleteContactPoints = (key: number): void => {
    setContactPoints(contactPoints.filter((item, index) => index !== key));
  };

  const rows = contactPoints.map((data, index) => (
    <TableTr key={index}>
      <TableTd>{data.firstName}</TableTd>
      <TableTd>{data.lastName}</TableTd>
      <TableTd className="subscriber-management-table">
        <span> {data.contactPhoneNumber}</span>
        <button onClick={(): void => handleDeleteContactPoints(index)}>
          <IconTrashFilled className="subscriber-management-delete-icon" />
        </button>
      </TableTd>
    </TableTr>
  ));

  const isEnglishCharacter = (character: string): boolean => {
    const charCode = character.charCodeAt(0);
    return (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122);
  };

  /**
   * Unicode subscriber form value
   */
  useEffect(() => {
    setHasUnicode(!subscriberForm?.values?.description?.split("").every(character => isEnglishCharacter(character)));
    setHasUnicode(!subscriberForm?.values?.name?.split("").every(character => isEnglishCharacter(character)));
  }, [subscriberForm.values]);

  /**
   * Unicode contact  form value
   */
  useEffect(() => {
    setHasUnicode(!contactForm?.values?.firstName?.split("").every(character => isEnglishCharacter(character)));
    setHasUnicode(!contactForm?.values?.lastName?.split("").every(character => isEnglishCharacter(character)));
  }, [contactForm.values]);

  /**
   * Reset contact  form and subscriber form value
   */
  useEffect(() => {
    if (!openedEditSubscriberModal) return;
    subscriberForm.reset();
    contactForm.reset();
    setContactPoints([]);
  }, [openedEditSubscriberModal]);
  useEffect(() => {
    if (!editSubscriber) return;
    subscriberForm.setValues(editSubscriber);
    setContactPoints(editSubscriber?.contactPoints ?? []);
    setLoading(false);
  }, [editSubscriber]);

  return (
    <Modal
      title={subscriberLanguage.management.modal.editLabel}
      opened={openedEditSubscriberModal}
      centered
      size="xl"
      onClose={onClose}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3
      }}
    >
      {loading ? null : (
        <Box mx="auto">
          <form onSubmit={handleSubmit}>
            <Divider />
            <div className="subscriber-management-title">
              <h1>{subscriberLanguage.management.form.dataSystem}</h1>
            </div>
            <Grid>
              <GridCol span={6}>
                <TextInput
                  mb="1rem"
                  label={subscriberLanguage.management.form.nameLabel}
                  placeholder={subscriberLanguage.management.form.namePlaceholder}
                  {...subscriberForm.getInputProps("name")}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={6}>
                <TextInput
                  mb="1rem"
                  label={subscriberLanguage.management.form.ipLabel}
                  placeholder={subscriberLanguage.management.form.ipPlaceholder}
                  {...subscriberForm.getInputProps("ip")}
                  withAsterisk
                />
              </GridCol>
            </Grid>
            <Grid>
              <GridCol span={6}>
                <MultiSelect
                  data={["otp", "bulk", "delivery"]}
                  {...subscriberForm.getInputProps("sendType")}
                  label={subscriberLanguage.management.form.typeSelectLabel}
                  onChange={(value): void => subscriberForm.setFieldValue("sendType", value)}
                  placeholder={
                    subscriberForm.values.sendType.length === 3
                      ? ""
                      : subscriberLanguage.management.form.typeSelectPlaceholder
                  }
                  withAsterisk
                />
              </GridCol>
              <GridCol span={6}>
                <Select
                  data={[
                    { label: subscriberLanguage.management.form.high, value: String(PropertyIdEnum.High) },
                    { label: subscriberLanguage.management.form.medium, value: String(PropertyIdEnum.Medium) },
                    { label: subscriberLanguage.management.form.low, value: String(PropertyIdEnum.Low) }
                  ]}
                  {...subscriberForm.getInputProps("priorityOptions")}
                  label={subscriberLanguage.management.form.priorityLabel}
                  onChange={(value): void => subscriberForm.setFieldValue("priorityOptions", value)}
                  placeholder={subscriberLanguage.management.form.priorityPlaceholder}
                  clearable
                  withAsterisk
                />
              </GridCol>
            </Grid>
            {subscriberForm.values.sendType.includes("otp") ? (
              <Grid>
                <GridCol span={6}>
                  <NumberInput
                    withAsterisk
                    label={subscriberLanguage.management.form.rateLimitLabel.otp}
                    placeholder={subscriberLanguage.management.form.rateLimitPlaceholder.otp}
                    {...subscriberForm.getInputProps("rateLimitOtp")}
                  />
                </GridCol>
                <GridCol span={6}>
                  <Select
                    {...subscriberForm.getInputProps("lineNumberOtp")}
                    data={["98200055555 ", "98200012387", "98200087654"]}
                    label={subscriberLanguage.management.form.rateLimitLabel.lineNumber}
                    onChange={(value): void => subscriberForm.setFieldValue("lineNumberOtp", value)}
                    placeholder={subscriberLanguage.management.form.rateLimitPlaceholder.lineNumberOtp}
                    clearable
                    withAsterisk
                  />
                </GridCol>
              </Grid>
            ) : null}
            {subscriberForm.values.sendType.includes("bulk") ? (
              <Grid>
                <GridCol span={6}>
                  <NumberInput
                    withAsterisk
                    label={subscriberLanguage.management.form.rateLimitLabel.bulk}
                    placeholder={subscriberLanguage.management.form.rateLimitPlaceholder.bulk}
                    {...subscriberForm.getInputProps("rateLimitBulk")}
                  />
                </GridCol>
                <GridCol span={6}>
                  <Select
                    {...subscriberForm.getInputProps("lineNumberBulk")}
                    data={["98200055555 ", "98200012387", "98200087654"]}
                    withAsterisk
                    onChange={(value): void => subscriberForm.setFieldValue("lineNumberBulk", value)}
                    label={subscriberLanguage.management.form.rateLimitLabel.lineNumber}
                    placeholder={subscriberLanguage.management.form.rateLimitPlaceholder.lineNumberBulk}
                  />
                </GridCol>
              </Grid>
            ) : null}
            {subscriberForm.values.sendType.includes("delivery") ? (
              <Grid>
                <GridCol span={6}>
                  <NumberInput
                    withAsterisk
                    label={subscriberLanguage.management.form.rateLimitLabel.lineNumber}
                    placeholder={subscriberLanguage.management.form.rateLimitPlaceholder.delivery}
                    {...subscriberForm.getInputProps("rateLimitDelivery")}
                  />
                </GridCol>
                <GridCol span={6}>
                  <Select
                    {...subscriberForm.getInputProps("lineNumberDelivery")}
                    data={["98200055555 ", "98200012387", "98200087654"]}
                    withAsterisk
                    onChange={(value: string | null): void => subscriberForm.setFieldValue("lineNumberDelivery", value)}
                    label={subscriberLanguage.management.form.rateLimitLabel.lineNumber}
                    placeholder={subscriberLanguage.management.form.rateLimitPlaceholder.lineNumberDelivery}
                  />
                </GridCol>
              </Grid>
            ) : null}
            <Divider mt="0.5rem"></Divider>
            <div className="subscriber-management-title">
              <h1>{subscriberLanguage.management.form.ContactPoints}</h1>
            </div>
            <Grid>
              <GridCol span={{ xl: 4, sm: 6, xs: 6 }}>
                <TextInput
                  label={subscriberLanguage.management.form.firstNameLabel}
                  placeholder={subscriberLanguage.management.form.firstNameLabel}
                  {...contactForm.getInputProps("firstName")}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={{ xl: 4, sm: 6, xs: 6 }}>
                <TextInput
                  label={subscriberLanguage.management.form.lastNameLabel}
                  placeholder={subscriberLanguage.management.form.lastNameLabel}
                  {...contactForm.getInputProps("lastName")}
                  withAsterisk
                />
              </GridCol>
              <GridCol span={{ xl: 4, sm: 6, xs: 6 }}>
                <TextInput
                  label={subscriberLanguage.management.form.contactPhoneNumberLabel}
                  placeholder={subscriberLanguage.management.form.contactPhoneNumberPlaceholder}
                  {...contactForm.getInputProps("contactPhoneNumber")}
                  withAsterisk
                />
              </GridCol>

              <GridCol span={{ xl: 12, sm: 6, xs: 6 }}>
                <Button
                  className="subscriber-management-add-contact"
                  disabled={contactPoints.length === 3 ? true : false}
                  onClick={handleAddContactPoints}
                >
                  <IconUserPlus />
                </Button>
              </GridCol>
            </Grid>
            {contactPoints ? (
              <Table horizontalSpacing="xl" striped withColumnBorders>
                <TableThead>
                  <TableTr>
                    <TableTh>{subscriberLanguage.management.form.firstNameLabel}</TableTh>
                    <TableTh>{subscriberLanguage.management.form.lastNameLabel}</TableTh>
                    <TableTh>{subscriberLanguage.management.form.contactPhoneNumberLabel}</TableTh>
                  </TableTr>
                </TableThead>
                <TableTbody>{rows}</TableTbody>
              </Table>
            ) : null}
            <Textarea
              label={subscriberLanguage.management.form.descriptionLabel}
              placeholder={subscriberLanguage.management.form.descriptionPlaceholder}
              autosize
              minRows={4}
              {...subscriberForm.getInputProps("description")}
            />
            <Group justify="flex-end" mt="lg">
              <Button w={100} color="red" onClick={onClose}>
                {subscriberLanguage.management.modal.cancel}
              </Button>
              <Button w={100} type="submit">
                {subscriberLanguage.management.modal.edit}
              </Button>
            </Group>
          </form>
        </Box>
      )}
    </Modal>
  );
};

export default Editsubscriber;

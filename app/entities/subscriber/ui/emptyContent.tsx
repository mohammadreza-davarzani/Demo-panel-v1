import React, { ReactNode } from "react";
import { Group, Text } from "@mantine/core";
import { subscriberLanguage } from "@shared/i18n/locales/fa/panel/subscriber";
const EmptyContent = (): ReactNode => {
  return (
    <Group className="subscriber-management-empty-content">
      <svg xmlns="http://www.w3.org/2000/svg" width="69" height="64" viewBox="0 0 69 64" fill="none">
        <path
          d="M30.1221 35.7014H33.7266C36.7303 35.7014 38.5326 33.5387 38.5326 30.8954V24.7798C38.5326 23.5183 37.4993 22.485 36.2377 22.485H27.623C26.3615 22.485 25.3282 23.5183 25.3282 24.7798V30.8954C25.3162 33.5387 27.1184 35.7014 30.1221 35.7014Z"
          stroke="#244A80"
          strokeWidth="1.54478"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28.9209 18.8806V22.4851"
          stroke="#244A80"
          strokeWidth="1.54478"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34.9287 18.8806V22.4851"
          stroke="#244A80"
          strokeWidth="1.54478"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M31.9248 42.9106V35.7017"
          stroke="#244A80"
          strokeWidth="1.54478"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="6.17926"
          y="6.17908"
          width="51.4925"
          height="48.403"
          rx="2.0597"
          stroke="#244A80"
          strokeWidth="2.0597"
        />
        <rect
          x="12.358"
          y="14.4179"
          width="51.4925"
          height="48.403"
          rx="2.0597"
          stroke="#244A80"
          strokeWidth="2.0597"
          strokeDasharray="5.15 5.15"
        />
        <path
          d="M25.7461 50.4627C25.7461 51.0315 26.4277 51.4926 27.2684 51.4926H36.582C37.4227 51.4926 38.1043 51.0315 38.1043 50.4627C38.1043 49.894 37.4227 49.4329 36.582 49.4329H27.2684C26.4277 49.4329 25.7461 49.894 25.7461 50.4627Z"
          fill="#244A80"
        />
        <path
          d="M33.6709 47.3732C34.4132 47.3732 35.015 46.9121 35.015 46.3433C35.015 45.7746 34.4132 45.3135 33.6709 45.3135H30.1801C29.4378 45.3135 28.8359 45.7746 28.8359 46.3433C28.8359 46.9121 29.4378 47.3732 30.1801 47.3732H33.6709Z"
          fill="#244A80"
        />
        <circle cx="38.1043" cy="5.14925" r="4.1194" fill="white" stroke="#244A80" strokeWidth="2.0597" />
        <circle cx="5.14925" cy="30.8955" r="4.1194" fill="white" stroke="#244A80" strokeWidth="2.0597" />
        <circle cx="63.8504" cy="49.4328" r="4.1194" fill="white" stroke="#244A80" strokeWidth="2.0597" />
      </svg>
      <Text className="subscriber-management-empty-content-label" size="lg" fw={500}>
        {subscriberLanguage.management.emptyPgae.label}
      </Text>
      <Text className="subscriber-management-empty-content-describtion" size="sm" fw={500}>
        {subscriberLanguage.management.emptyPgae.describtion}
      </Text>
    </Group>
  );
};

export default EmptyContent;

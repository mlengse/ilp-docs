import React, {type ReactNode} from 'react';
import TabItem from '@theme-original/TabItem';
import type TabItemType from '@theme/TabItem';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof TabItemType>;

export default function TabItemWrapper(props: Props): ReactNode {
  return (
    <>
      <TabItem {...props} />
    </>
  );
}

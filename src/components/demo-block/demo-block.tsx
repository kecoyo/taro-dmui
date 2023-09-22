import { View } from '@tarojs/components';
import React, { FC } from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface DemoBlockProps extends AtComponent {
  title: string;
  padding?: string;
  background?: string;
}

const defaultDemoBlockProps = {};

const classPrefix = 'lj-demo-block';

const DemoBlock: FC<DemoBlockProps> = (p) => {
  const props = mergeProps(defaultDemoBlockProps, p);
  return withNativeProps(
    props,
    <View className={classPrefix}>
      <View className={`${classPrefix}__title`}>{props.title}</View>
      <View className={`${classPrefix}__body`} style={{ padding: props.padding, background: props.background }}>
        {props.children}
      </View>
    </View>,
  );
};

export default DemoBlock;

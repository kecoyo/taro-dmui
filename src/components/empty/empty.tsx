import { Text, View } from '@tarojs/components';
import React from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';
import Image from '../image';

export interface EmptyProps extends AtComponent {
  /**
   * 显示文本
   */
  title?: string;
  /**
   * 图片地址
   */
  image?: string;
  /**
   * 默认图片地址
   */
  defaultImageUrl?: string;
}

export const defaultEmptyProps: EmptyProps = {
  title: '空空如也',
};

const classPrefix = 'lj-empty';

const Empty: React.FC<EmptyProps> = (p) => {
  const props = mergeProps(defaultEmptyProps, p);

  return withNativeProps(
    props,
    <View className={classPrefix}>
      <Image className={`${classPrefix}__image`} src={props.image || props.defaultImageUrl || ''} />
      <Text className={`${classPrefix}__title`}>{props.title}</Text>
    </View>,
  );
};

export default Empty;

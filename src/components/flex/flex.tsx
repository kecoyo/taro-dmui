import { CommonEventFunction, View } from '@tarojs/components';
import classNames from 'classnames';
import React, { ReactNode } from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface FlexProps extends AtComponent {
  children?: ReactNode;
  size?: 'larger' | 'large' | 'normal' | 'small' | 'smaller';
  direction?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-around' | 'space-between' | 'space-evenly' | 'start' | 'end' | 'left' | 'right';
  alignItems?: 'center' | 'end' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' | 'start';
  flex?: boolean;
  onClick?: CommonEventFunction;
}

const defaultFlexProps = {
  size: 'normal',
  direction: 'row',
};

const classPrefix = 'lj-flex';

const Flex: React.FC<FlexProps> = (p) => {
  const props = mergeProps(defaultFlexProps, p);

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}--${props.direction}`]: props.direction,
        [`${classPrefix}--${props.size}`]: props.size,
        [`${classPrefix}--flex`]: props.flex,
      })} //
      style={{ justifyContent: props.justifyContent, alignItems: props.alignItems }}
      onClick={props.onClick}
    >
      {props.children}
    </View>,
  );
};

export default Flex;

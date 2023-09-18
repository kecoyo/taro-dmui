import { CommonEventFunction, Text } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import React from 'react';
import { AtComponent } from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface LinkProps extends AtComponent {
  /**
   * 设置按钮为禁用态（不可点击）
   * @default false
   */
  disabled?: boolean; // 是否禁用
  /**
   * 点击按钮时触发
   */
  onClick?: CommonEventFunction;
}

export const defaultLinkProps = {};

const classPrefix = `lj-link`;

const Link: React.FC<LinkProps> = (p) => {
  const props = mergeProps(defaultLinkProps, p);

  const onClick = useMemoizedFn((e) => {
    if (props.onClick && !props.disabled) {
      props.onClick(e);
    }
  });

  return withNativeProps(
    props,
    <Text
      className={classNames(classPrefix, {
        [`${classPrefix}--disabled`]: props.disabled,
      })}
      onClick={onClick}
    >
      {props.children}
    </Text>,
  );
};

export default Link;

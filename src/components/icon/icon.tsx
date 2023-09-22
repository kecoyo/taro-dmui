import { CommonEventFunction } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import { AtIcon } from 'taro-ui';
import { AtIconProps } from 'taro-ui/types/icon';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface IconProps extends AtIconProps {
  /**
   * 图标图案
   */
  value: string;
  /**
   * 图标颜色
   */
  type?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  /**
   * 图标大小
   * @default 'normal'
   */
  size?: 'large' | 'normal' | 'small';
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * className 前缀，用于第三方字体图标库，比如想使用'fa fa-clock' 的图标，则 传入prefixClass='fa' value='clock'
   */
  prefixClass?: string;
  /**
   * 点击按钮时触发
   */
  onClick?: CommonEventFunction;
}

export const defaultIconProps = {
  size: 'normal',
};

const classPrefix = `lj-icon`;

const Icon: React.FC<IconProps> = (p) => {
  const props = mergeProps(defaultIconProps, p);

  return withNativeProps(
    props,
    <AtIcon
      className={classNames(classPrefix, {
        [`${classPrefix}--${props.size}`]: props.size,
        [`${classPrefix}--${props.type}`]: props.type,
      })}
      prefixClass={props.prefixClass}
      value={props.value}
      size={0}
      color={props.color}
      onClick={props.onClick}
      customStyle={props.customStyle || props.style}
    />,
  );
};

export default Icon;

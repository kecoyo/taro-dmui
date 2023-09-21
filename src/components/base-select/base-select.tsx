import { CommonEventFunction, View } from '@tarojs/components';
import classNames from 'classnames';
import React from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';
import Icon from '../icon';

export interface BaseSelectProps extends AtComponent {
  /**
   * 缺失占位符
   */
  placeholder?: string;
  /**
   * 组件的大小
   * @default 'normal
   */
  size?: 'large' | 'normal' | 'small';
  /**
   * 文字对齐方式
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right';
  /**
   * 显示边框
   * @default true
   */
  border?: boolean;
  /**
   * 圆角
   * @default false
   */
  circle?: boolean;
  /**
   * 显示文本
   */
  value?: string;
  /**
   * 点击按钮时触发
   */
  onSelect?: CommonEventFunction;
}

const defaultBaseSelectProps = {
  size: 'normal',
  textAlign: 'left',
  border: true,
};

const classPrefix = 'lj-base-select';

const BaseSelect: React.FC<BaseSelectProps> = (p) => {
  const props = mergeProps(defaultBaseSelectProps, p);

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}--${props.size}`]: props.size,
        [`${classPrefix}--border`]: props.border,
        [`${classPrefix}--circle`]: props.circle,
        [`${classPrefix}--${props.textAlign}`]: props.textAlign,
      })}
      onClick={props.onSelect}
    >
      {props.value ? ( //
        <View className={`${classPrefix}__value`}>{props.value}</View>
      ) : (
        <View className={`${classPrefix}__value placeholder`}>{props.placeholder}</View>
      )}
      <Icon className={`${classPrefix}__icon`} value="chevron-down" />
    </View>,
  );
};

export default BaseSelect;

import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { AtInput } from 'taro-ui';
import { AtInputProps } from 'taro-ui/types/input';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface InputProps extends Omit<AtInputProps, 'name' | 'value' | 'onChange'> {
  /**
   * 输入框的唯一标识，有传入点击 title 会聚焦输入框
   * 替换AtInput中的name
   */
  name?: string;
  /**
   * 输入框的大小
   * @default 'normal'
   */
  size?: 'large' | 'normal' | 'small';
  /**
   * 文字对齐方式
   * @default 'left'
   */
  textAlign?: 'left' | 'center' | 'right';
  /**
   * 圆角
   * @default false
   */
  circle?: boolean;
  /**
   * 显示边框
   * @default true
   */
  border?: boolean;
  /**
   * 值
   */
  value?: string;
  /**
   * 通过 onChange 事件来更新 value 值变化
   * @param value 更新的值
   * @returns
   */
  onChange?: (value: string) => void;
}

export const defaultInputProps = {
  name: 'input',
  size: 'normal',
  border: true,
  textAlign: 'left',
};

const classPrefix = 'lj-input';

const Input: React.FC<InputProps> = (p) => {
  const props = mergeProps(defaultInputProps, p);
  const otherProps = _.omit(props, ['className', 'style', 'onChange']);

  const onChange = useMemoizedFn((val) => {
    if (props.onChange && val !== props.value) {
      props.onChange(val);
    }
  });

  return withNativeProps(
    props,
    <AtInput
      className={classNames(classPrefix, {
        [`${classPrefix}--${props.size}`]: props.size,
        [`${classPrefix}--circle`]: props.circle,
        [`${classPrefix}--border`]: props.border,
        [`${classPrefix}--${props.textAlign}`]: props.textAlign,
      })}
      {...otherProps}
      onChange={onChange}
    />,
  );
};

export default Input;

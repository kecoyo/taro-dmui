import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { AtButton } from 'taro-ui';
import { AtButtonProps } from 'taro-ui/types/button';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface ButtonProps extends Omit<AtButtonProps, 'type' | 'size'> {
  /**
   * 按钮的类型
   */
  type?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  /**
   * 按钮的大小
   * @default 'normal'
   */
  size?: 'large' | 'normal' | 'small';
}

export const defaultButtonProps = {
  size: 'normal',
};

const classPrefix = 'lj-button';

const Button: React.FC<ButtonProps> = (p) => {
  const props = mergeProps(defaultButtonProps, p);
  const otherProps = _.omit(props, ['className', 'style', 'size']);

  return withNativeProps(
    props,
    <AtButton
      className={classNames(classPrefix, {
        [`${classPrefix}--${props.type}`]: props.type,
        [`${classPrefix}--${props.size}`]: props.size,
        [`${classPrefix}--full`]: props.full,
        [`${classPrefix}--circle`]: props.circle,
      })}
      size={props.size === 'small' || props.size === 'normal' ? props.size : undefined}
      {...otherProps}
    >
      {props.children}
    </AtButton>,
  );
};

export default Button;

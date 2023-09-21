import { View } from '@tarojs/components';
import classNames from 'classnames';
import _ from 'lodash';
import React, { ReactNode } from 'react';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';
import Icon, { IconProps } from '../icon';
import Input, { InputProps } from '../input';

export interface IconInputProps extends InputProps {
  /**
   * 左侧图标属性
   */
  leftIconProps?: IconProps;
  /**
   * 左侧图标
   */
  leftIcon?: ReactNode;
  /**
   * 右侧图标属性
   */
  rightIconProps?: IconProps;
  /**
   * 左侧图标
   */
  rightIcon?: ReactNode;
}

export const defaultIconInputProps = {};

const classPrefix = 'lj-icon-input';

const IconInput: React.FC<IconInputProps> = (p) => {
  const props = mergeProps(defaultIconInputProps, p);
  const inputProps = _.omit(props, ['className', 'style', 'leftIconProps', 'leftIcon', 'rightIconProps', 'rightIcon']);

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}--has-left-icon`]: props.leftIcon || props.leftIconProps,
        [`${classPrefix}--has-right-icon`]: props.rightIcon || props.rightIconProps,
      })}
    >
      {(props.leftIcon || props.leftIconProps) && (
        <View className={`${classPrefix}__left-icon`}>
          {props.leftIcon ? props.leftIcon : null}
          {props.leftIconProps ? <Icon {...props.leftIconProps} /> : null}
        </View>
      )}
      <Input {...inputProps} />
      {(props.rightIcon || props.rightIconProps) && (
        <View className={`${classPrefix}__right-icon`}>
          {props.rightIcon ? props.rightIcon : null}
          {props.rightIconProps ? <Icon {...props.rightIconProps} /> : null}
        </View>
      )}
    </View>,
  );
};

export default IconInput;

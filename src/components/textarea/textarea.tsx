import { CommonEvent } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { AtTextarea } from 'taro-ui';
import { AtTextareaProps } from 'taro-ui/types/textarea';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface TextareaProps extends Omit<AtTextareaProps, 'value' | 'onChange'> {
  /**
   * 是否显示边框
   * @default true
   */
  border?: boolean;
  /**
   * 输入框当前值
   */
  value?: string;
  /**
   * 输入框值改变时触发的事件，
   * 开发者需要通过 onChange 事件来更新 value 值变化，
   * onChange 函数必填
   */
  onChange?: (value: string, event?: CommonEvent) => void;
}

const defaultProps = {
  border: true,
};

const classPrefix = 'lj-textarea';

const Textarea: React.FC<TextareaProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const otherProps = _.omit(props, ['className', 'style', 'border', 'value', 'onChange']);

  const onChange = useMemoizedFn((val: string, event: CommonEvent) => {
    if (props.onChange && val !== props.value) {
      props.onChange(val, event);
    }
  });

  return withNativeProps(
    props,
    <AtTextarea
      className={classNames(classPrefix, {
        [`${classPrefix}--border`]: props.border,
      })}
      value={props.value || ''}
      onChange={onChange}
      {...otherProps}
    />,
  );
};

export default Textarea;

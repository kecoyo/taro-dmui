import { Picker } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';
import BaseSelect, { BaseSelectProps } from '../base-select';

export interface DateSelectProps extends Omit<BaseSelectProps, 'value' | 'onSelect'> {
  /**
   * 显示文本
   */
  value?: string;
  /**
   * value 改变时触发 change 事件
   */
  onChange?: (value: string) => void;
}

const defaultProps = {};

const classPrefix = 'lj-date-select';

const DateSelect: React.FC<DateSelectProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const baseSelectProps = _.omit(props, ['className', 'style', 'onSelect']) as BaseSelectProps;

  const onChange = useMemoizedFn((e) => {
    if (props.onChange) {
      props.onChange(e.detail.value);
    }
  });

  return withNativeProps(
    props,
    <Picker className={classNames(classPrefix, {})} mode="date" value={props.value || ''} onChange={onChange}>
      <BaseSelect className={`${classPrefix}__base-select`} {...baseSelectProps} />
    </Picker>,
  );
};

export default DateSelect;

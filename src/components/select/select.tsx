import { Picker } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { withNativeProps } from '../../common/native-props';
import { getOptionLabel, getOptionValue } from '../../common/utils';
import mergeProps from '../../common/with-default-props';
import BaseSelect, { BaseSelectProps } from '../base-select';

export interface SelectProps extends Omit<BaseSelectProps, 'value' | 'onSelect'> {
  /**
   * 选项数组
   * @default []
   */
  options?: number[] | string[] | Record<string, any>[];
  /**
   * 值字段名
   */
  valueField?: string;
  /**
   * 显示字段名
   */
  labelField?: string;
  /**
   * 选中的值
   */
  value?: number | string | Record<string, any>;
  /**
   * 值发生改变触发
   */
  onChange?: (value: number | string | Record<string, any>) => void;
}

export const defaultSelectProps = {
  options: [],
};

const classPrefix = 'lj-select';

const Select: React.FC<SelectProps> = (p) => {
  const props = mergeProps(defaultSelectProps, p);
  const baseSelectProps = _.omit(props, ['value', 'onSelect']) as BaseSelectProps;

  const onChange = useMemoizedFn((e) => {
    const { value: index } = e.detail;
    if (props.onChange) {
      const value = props.options[index];
      props.onChange(value);
    }
  });

  const valueToIndex = useMemoizedFn((value?: number | string | Record<string, any>) => {
    return value != undefined ? props.options.findIndex((d) => getOptionValue(d, props.valueField) == getOptionValue(value, props.valueField)) : undefined;
  });

  const valueToLabel = useMemoizedFn((value?: number | string | Record<string, any>) => {
    return value != undefined ? getOptionLabel(value, props.labelField) : '';
  });

  return withNativeProps(
    props,
    <Picker className={classNames(classPrefix, {})} mode="selector" range={props.options} rangeKey={props.labelField} value={valueToIndex(props.value)} onChange={onChange}>
      <BaseSelect className={classPrefix} value={valueToLabel(props.value)} {...baseSelectProps} />
    </Picker>,
  );
};

export default Select;

import { Picker } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';
import BaseSelect, { BaseSelectProps } from '../base-select';

export interface SelectProps extends Omit<BaseSelectProps, 'value' | 'onSelect'> {
  /**
   * 选项数组
   * @default []
   */
  options?: Record<string, any>[];
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
  value?: any;
  /**
   * 值发生改变触发
   *  @param value 修改的值
   *  @param label 修改的值的显示名称
   *  @param option 修改的值的项
   */
  onChange?: (value: any, label: string, option: Record<string, any>) => void;
}

export const defaultSelectProps = {
  options: [],
};

const classPrefix = 'lj-select';

const getOptionValue = (option?: Record<string, any>, key?: string) => {
  if (option) {
    return key ? option[key] : option.value || option.id;
  }
};
const getOptionLabel = (option?: Record<string, any>, key?: string) => {
  if (option) {
    return key ? option[key] : option.label || option.name;
  }
};

const Select: React.FC<SelectProps> = (p) => {
  const props = mergeProps(defaultSelectProps, p);
  const baseSelectProps = _.omit(props, ['value', 'onSelect']) as BaseSelectProps;
  const range = props.options.map((opt) => getOptionLabel(opt, props.labelField));
  const selected = props.options.find((opt) => getOptionValue(opt, props.valueField) === props.value);

  const onChange = useMemoizedFn((e) => {
    let index = e.detail.value;
    let option = props.options[index];
    if (props.onChange && option) {
      props.onChange(getOptionValue(option, props.valueField), getOptionLabel(option, props.labelField), option);
    }
  });

  return withNativeProps(
    props,
    <Picker className={classNames(classPrefix, {})} mode="selector" range={range} onChange={onChange}>
      <BaseSelect className={classPrefix} value={selected ? getOptionLabel(selected, props.labelField) : ''} {...baseSelectProps} />
    </Picker>,
  );
};

export default Select;

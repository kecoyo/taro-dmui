import { Picker } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { withNativeProps } from '../../common/native-props';
import { getOptionLabel, getOptionValue } from '../../common/utils';
import mergeProps from '../../common/with-default-props';
import BaseSelect, { BaseSelectProps } from '../base-select';

export interface MultiSelectProps extends Omit<BaseSelectProps, 'value' | 'onSelect'> {
  /**
   * 选项数组
   * @default []
   */
  options?: Array<number[]> | Array<string[]> | Array<Record<string, any>[]>;
  /**
   * 值字段名
   */
  valueField?: string;
  /**
   * 显示字段名
   */
  labelField?: string;
  /**
   * 分隔符
   * @default ' / '
   */
  separator?: string;
  /**
   * 表示选择了 range 中的第几个（下标从 0 开始）
   * @default []
   */
  value?: number[] | string[] | Record<string, any>[];
  /**
   * value 改变时触发 change 事件
   */
  onChange?: (value: number[] | string[] | Record<string, any>[]) => void;
  /**
   * 列改变时触发
   */
  onColumnChange?: (column: number, value: number | string | Record<string, any>) => void;
}

export const defaultMultiSelectProps = {
  options: [],
  value: [],
  separator: ' / ',
};

const classPrefix = 'lj-multi-select';

const MultiSelect: React.FC<MultiSelectProps> = (p) => {
  const props = mergeProps(defaultMultiSelectProps, p);
  const baseSelectProps = _.omit(props, ['value', 'onSelect']) as BaseSelectProps;

  const onChange = useMemoizedFn((e) => {
    const { value: indexs } = e.detail;
    if (props.onChange) {
      const values = indexs.map((idx: number, i: number) => props.options[i][idx]);
      props.onChange(values);
    }
  });

  const onColumnChange = useMemoizedFn((e) => {
    const { column: i, value: idx } = e.detail;
    if (props.onColumnChange) {
      const value = props.options[i][idx];
      props.onColumnChange(i, value);
    }
  });

  // 值转索引
  const valueToIndexs = useMemoizedFn((value: number[] | string[] | Record<string, any>[]) => {
    return value.map((val, i) => (props.options[i] as any).findIndex((d: any) => getOptionValue(d, props.valueField) == getOptionValue(val, props.valueField)));
  });

  // 值转显示名称
  const valueToLabels = useMemoizedFn((value: number[] | string[] | Record<string, any>[]) => {
    return value ? value.map((val) => getOptionLabel(val, props.labelField)).join(props.separator) : '';
  });

  return withNativeProps(
    props,
    <Picker
      className={classNames(classPrefix, {})}
      mode="multiSelector"
      range={props.options}
      rangeKey={props.labelField}
      value={valueToIndexs(props.value)}
      onChange={onChange}
      onColumnChange={onColumnChange}
    >
      <BaseSelect className={classPrefix} value={valueToLabels(props.value)} {...baseSelectProps} />
    </Picker>,
  );
};

export default MultiSelect;

import { Picker } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';
import BaseSelect, { BaseSelectProps } from '../base-select';

export interface RegionSelectProps extends Omit<BaseSelectProps, 'value' | 'onSelect'> {
  /**
   * 表示选中的省市区，例：[codes, names]
   * @default []
   */
  value?: [number[], string[]];
  /**
   * value 改变时触发 change 事件
   * @supported weapp, h5, rn
   */
  onChange?: (value: [number[], string[]]) => void;
  /**
   * 分隔符
   * @default ' / '
   */
}

export const defaultRegionSelectProps = {
  value: [],
  label: [],
  separator: ' / ',
};

const classPrefix = 'lj-region-select';

const RegionSelect: React.FC<RegionSelectProps> = (p) => {
  const props = mergeProps(defaultRegionSelectProps, p);
  const baseSelectProps = _.pick(props, ['placeholder', 'size', 'textAlign', 'border', 'circle']);

  const onChange = useMemoizedFn((e) => {
    const { code, value } = e.detail;
    if (props.onChange) {
      props.onChange([code.map(_.toNumber), value]);
    }
  });

  return withNativeProps(
    props,
    <Picker className={classNames(classPrefix, {})} mode="region" value={props.value && props.value[0] ? props.value[0].map(_.toString) : []} onChange={onChange}>
      <BaseSelect className={classPrefix} value={props.value && props.value[1] ? props.value[1].map((d) => d).join(props.separator) : ''} {...baseSelectProps} />
    </Picker>,
  );
};

export default RegionSelect;

import { View } from '@tarojs/components';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface RowProps extends AtComponent {
  /**
   * 水平排列方式
   * @default 'top'
   */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  /**
   * 垂直对齐方式
   * @default 'start'
   */
  align?: 'flex-start' | 'flex-end' | 'center' | 'start' | 'end' | 'self-start' | 'self-end';
  /**
   * 是否自动换行
   * @default true
   */
  wrap?: boolean;
  /**
   * 栅格间隔，{ xs: 8, sm: 16, md: 24}，[水平间距, 垂直间距]
   * @default 0
   */
  gutter?: number | object | number[];
}

const defaultRowProps = {
  justify: 'top',
  align: 'start',
  gutter: 0,
  wrap: true,
};

const classPrefix = 'lj-row';

const Row: React.FC<RowProps> = (p) => {
  const props = mergeProps(defaultRowProps, p);
  const otherProps = _.omit(props, ['className', 'style', 'justify', 'align', 'wrap', 'gutter']);

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}--${props.justify}`]: props.justify,
        [`${classPrefix}--${props.align}`]: props.align,
        [`${classPrefix}--wrap`]: props.wrap,
      })} //
      {...otherProps}
    >
      {props.children}
    </View>,
  );
};

export default Row;

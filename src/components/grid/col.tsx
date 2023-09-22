import { View } from '@tarojs/components';
import classNames from 'classnames';
import _ from 'lodash';
import React, { CSSProperties } from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface ColProps extends AtComponent {
  /**
   * flex 布局属性
   */
  flex: string | number;

  /**
   * 栅格占位格数，为 0 时相当于 display: none
   */
  span?: number;
}

const defaultColProps = {};

const classPrefix = 'lj-col';

const Col: React.FC<ColProps> = (p) => {
  const props = mergeProps(defaultColProps, p);
  const otherProps = _.omit(props, ['className', 'style', 'flex', 'span']);

  const style: CSSProperties = {};

  if (props.flex) style.flex = props.flex;

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}-${props.span}`]: props.span,
        // [`${classPrefix}--${props.direction}`]: props.direction,
        // [`${classPrefix}--${props.size}`]: props.size,
        // [`${classPrefix}--flex`]: props.flex,
      })} //
      style={{ ...style }}
      {...otherProps}
    >
      {props.children}
    </View>,
  );
};

export default Col;

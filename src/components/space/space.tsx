import { View } from '@tarojs/components';
import classNames from 'classnames';
import React, { CSSProperties } from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import { toArray } from '../../common/utils';
import mergeProps from '../../common/with-default-props';
import { SpaceContextProvider, SpaceContextType } from './context';
import Item from './item';

export interface SpaceProps extends AtComponent {
  /**
   * 间距方向
   * @default 'row'
   */
  direction?: 'row' | 'column';
  /**
   * 间距大小
   * @default 'normal'
   */
  size?: 'larger' | 'large' | 'normal' | 'small' | 'smaller';
  /**
   * 对齐方式
   */
  align?: 'start' | 'end' | 'center' | 'baseline';
  /**
   * 设置拆分
   */
  split?: React.ReactNode;
  /**
   * 是否自动换行，仅在 'row' 时有效
   * @default false
   */
  wrap?: boolean;
  /**
   * 子组件 className
   */
  itemClassName?: string;
  /**
   * 子组件 style
   */
  itemStyle?: CSSProperties;
}

export const defaultSpaceProps = {
  direction: 'row',
  size: 'normal',
};

const classPrefix = 'lj-space';

const Space: React.FC<SpaceProps> = (p) => {
  const props = mergeProps(defaultSpaceProps, p);
  const align = props.align === undefined && props.direction === 'row' ? 'center' : props.align;

  const childNodes = toArray(props.children);

  // Calculate latest one
  let latestIndex = 0;
  const nodes = childNodes.map<React.ReactNode>((child, i) => {
    if (child !== null && child !== undefined) {
      latestIndex = i;
    }

    return (
      <Item className={classNames(`${classPrefix}__item`, props.itemClassName)} key={i} index={i} split={props.split} style={props.itemStyle}>
        {child}
      </Item>
    );
  });

  const spaceContext = React.useMemo<SpaceContextType>(() => ({ latestIndex }), [latestIndex]);

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}--${props.direction}`]: props.direction,
        [`${classPrefix}--${props.size}`]: props.size,
        [`${classPrefix}--gap-row-${props.size}`]: props.size,
        [`${classPrefix}--gap-col-${props.size}`]: props.size,
        [`${classPrefix}--align-${align}`]: align,
        [`${classPrefix}--wrap`]: props.wrap,
      })} //
    >
      <SpaceContextProvider value={spaceContext}>{nodes}</SpaceContextProvider>
    </View>,
  );
};

export default Space;

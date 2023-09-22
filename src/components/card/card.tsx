import { CommonEventFunction, View } from '@tarojs/components';
import classNames from 'classnames';
import React, { CSSProperties, ReactNode } from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface CardProps extends AtComponent {
  /**
   * header 左边的Icon
   */
  icon?: ReactNode;
  /**
   * header 左边标题
   */
  title?: ReactNode;
  /**
   * header 右边区域
   */
  extra?: ReactNode;
  // arrow?: 'none' | 'right' | 'down' | 'left' | 'up'; // 箭头的方向
  // disabled?: boolean; // 是否禁用
  /**
   * header 自定义类名
   */
  headerClassName?: string;
  /**
   * header 自定义样式
   */
  headerStyle?: CSSProperties;
  /**
   * body 自定义类名
   */
  bodyClassName?: string;
  /**
   * body 自定义样式
   */
  bodyStyle?: CSSProperties;
  /**
   * 卡片点击事件
   */
  onClick?: CommonEventFunction;
  /**
   * header 区域点击事件
   */
  onHeaderClick?: CommonEventFunction;
  /**
   * body 区域点击事件
   */
  onBodyClick?: CommonEventFunction;
}

export const defaultCardProps = {
  arrow: 'none',
};

const classPrefix = `lj-card`;

const Card: React.FC<CardProps> = (p) => {
  const props = mergeProps(defaultCardProps, p);

  const renderHeader = () => {
    if (!(props.title || props.extra)) {
      return null;
    }
    return (
      <View className={classNames(`${classPrefix}__header`, props.headerClassName)} style={props.headerStyle} onClick={props.onHeaderClick}>
        {props.icon && <View className={`${classPrefix}__header-icon`}>{props.icon}</View>}
        <View className={`${classPrefix}__header-title`}>{props.title}</View>
        {props.extra}
      </View>
    );
  };

  const renderBody = () => {
    if (!props.children) {
      return null;
    }
    return (
      <View className={classNames(`${classPrefix}__body`, props.bodyClassName)} style={props.bodyStyle} onClick={props.onBodyClick}>
        {props.children}
      </View>
    );
  };

  return withNativeProps(
    props,
    <View className={classNames(classPrefix, {})} onClick={props.onClick}>
      {renderHeader()}
      {renderBody()}
      {/* {props.title && (
        <View className={`${classPrefix}--header`}>
          {props.image && <View className={`${classPrefix}--item-image`}>{typeof props.image === 'string' ? <ImageIcon src={props.image} /> : props.image}</View>}
          {props.icon && <View className={`${classPrefix}--item-icon`}>{typeof props.icon === 'string' ? <Icon value={props.icon} /> : props.icon}</View>}
          <View className={`${classPrefix}--item-title`}>{props.title}</View>
          {props.extra && <View className={`${classPrefix}--item-extra`}>{props.extra}</View>}
        </View>
      )}
      <View className={`${classPrefix}--content`}>{props.children}</View> */}
    </View>,
  );
};

export default Card;

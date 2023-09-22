import { Text, View } from '@tarojs/components';
import React from 'react';
import type { SpaceContextType } from './context';
import { SpaceContext } from './context';

export interface ItemProps {
  className: string;
  children: React.ReactNode;
  index: number;
  split?: React.ReactNode;
  style?: React.CSSProperties;
}

const Item: React.FC<ItemProps> = ({ className, index, children, split, style }) => {
  const { latestIndex } = React.useContext<SpaceContextType>(SpaceContext);

  if (children === null || children === undefined) {
    return null;
  }

  return (
    <>
      <View className={className} style={style}>
        {children}
      </View>
      {index < latestIndex && split && <Text className={`${className}-split`}>{split}</Text>}
    </>
  );
};

export default Item;

import { ComponentType } from 'react';
import { AtComponent } from 'taro-ui/types/base';

export interface FlexItemProps extends AtComponent {
  isAuto: boolean;
  isWrap: boolean;
  align: 'top' | 'bottom' | 'center';
  size: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  offset: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface FlexProps extends AtComponent {
  wrap?: 'no-wrap' | 'wrap' | 'wrap-reverse';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  dirction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around';
}

declare const FlexItem: ComponentType<FlexItemProps>;

declare const Flex: ComponentType<FlexProps>;

export { Flex, FlexItem };

export default Flex;

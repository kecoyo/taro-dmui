import { ComponentType } from 'react';
import { AtComponent } from 'taro-ui/types/base';

export interface LinkProps extends AtComponent {
  disabled?: boolean; // 是否禁用
  onClick?: CommonEventFunction;
  children: ReactNode;
}

declare const Link: ComponentType<LinkProps>;

export { Link };
export default Link;

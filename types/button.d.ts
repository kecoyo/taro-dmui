import { ComponentType } from 'react';
import { AtButtonProps } from 'taro-ui/types/button';

export interface ButtonProps extends Omit<AtButtonProps, 'size'> {
  type?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'large' | 'normal' | 'small';
}

declare const Button: ComponentType<ButtonProps>;

export { Button };

export default Button;

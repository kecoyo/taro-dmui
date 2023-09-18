import classNames from 'classnames';
import type { ReactElement } from 'react';
import React from 'react';
import { AtComponent } from 'taro-ui/types/base';

export function withNativeProps<P extends AtComponent>(props: P, element: ReactElement) {
  const p = {
    ...element.props,
  };
  if (props.className) {
    p.className = classNames(element.props.className, props.className);
  }
  if (props.style) {
    p.style = {
      ...p.style,
      ...props.style,
    };
  }
  return React.cloneElement(element, p);
}

import { Text } from '@tarojs/components';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import React from 'react';
import { LinkProps } from '../../../types/link';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export const defaultLinkProps = {};

const classPrefix = `lj-link`;

const Link: React.FC<LinkProps> = (p) => {
  const props = mergeProps(defaultLinkProps, p);

  const onClick = useMemoizedFn((e) => {
    if (props.onClick && !props.disabled) {
      props.onClick(e);
    }
  });

  return withNativeProps(
    props,
    <Text
      className={classNames(classPrefix, {
        [`${classPrefix}--disabled`]: props.disabled,
      })}
      onClick={onClick}
    >
      {props.children}
    </Text>,
  );
};

export default Link;

// import { DEFAULT_AVATAR_URL, DMRES_URL } from '@/common/constants';
import { CommonEventFunction, Image, View } from '@tarojs/components';
import { useMemoizedFn, useMount, useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import React, { useState } from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface AvatarProps extends AtComponent {
  /**
   * 头像大小
   * @default 'normal'
   */
  size?: 'large' | 'normal' | 'small';
  /**
   * 头像是否圆形
   * @default false
   */
  circle?: boolean;
  /**
   * 头像图片地址
   */
  image?: string;
  /**
   * 点击按钮时触发
   */
  onClick?: CommonEventFunction;
  /**
   * 基准图片地址
   */
  baseURL?: string;
  /**
   * 默认头像图片地址
   */
  defaultAvatarUrl?: string;
}

export const defaultAvatarProps: AvatarProps = {
  size: 'normal',
};

const classPrefix = `lj-avatar`;

const Avatar: React.FC<AvatarProps> = (p) => {
  const props = mergeProps(defaultAvatarProps, p);
  const [src, setSrc] = useState('');

  useMount(() => {
    updateImage(props.image);
  });

  useUpdateEffect(() => {
    updateImage(props.image);
  }, [props.image]);

  const updateImage = (image: string | undefined) => {
    if (image) {
      if (/^https?/.test(image)) {
        setSrc(image);
      } else {
        if (props.baseURL) setSrc(props.baseURL + image);
      }
    } else {
      onError();
    }
  };

  const onError = useMemoizedFn(() => {
    if (props.defaultAvatarUrl) setSrc(props.defaultAvatarUrl);
  });

  return withNativeProps(
    props,
    <View
      className={classNames(classPrefix, {
        [`${classPrefix}--circle`]: props.circle,
        [`${classPrefix}--${props.size}`]: props.size,
      })}
      onClick={props.onClick}
    >
      <Image className={`${classPrefix}__img`} src={src} onError={onError} />
    </View>,
  );
};

export default Avatar;

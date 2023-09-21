import { Image as TaroImage, ImageProps as TaroImageProps } from '@tarojs/components';
import { useMemoizedFn, useMount, useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import _ from 'lodash';
import React, { useState } from 'react';
import AtComponent from 'taro-ui/types/base';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';

export interface ImageProps extends Omit<TaroImageProps, 'style'>, AtComponent {
  /**
   * 基准图片地址
   */
  baseURL?: string;
  /**
   * 默认头像图片地址
   */
  defaultImageUrl?: string;
}

export const defaultImageProps = {
  baseURL: '',
  defaultImageUrl: '',
};

const classPrefix = `lj-image`;

const Image: React.FC<ImageProps> = (p) => {
  const props = mergeProps(defaultImageProps, p);
  const [src, setSrc] = useState('');
  const taroImageProps = _.omit(props, ['className', 'style', 'src', 'onError']);

  useMount(() => {
    updateImage(props.src);
  });

  useUpdateEffect(() => {
    updateImage(props.src);
  }, [props.src]);

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
    if (props.defaultImageUrl) setSrc(props.defaultImageUrl);
  });

  return withNativeProps(
    props,
    <TaroImage
      className={classNames(classPrefix, {})} //
      {...taroImageProps}
      src={src}
      onError={onError}
    />,
  );
};

export default Image;

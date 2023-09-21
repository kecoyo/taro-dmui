import { CommonEventFunction } from '@tarojs/components';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { withNativeProps } from '../../common/native-props';
import mergeProps from '../../common/with-default-props';
import IconInput, { IconInputProps } from '../icon-input';

export interface SearchInputProps extends Omit<IconInputProps, 'leftIconProps' | 'leftIcon' | 'rightIconProps' | 'rightIcon'> {
  /**
   * 点击查询图标事件
   */
  onSearch?: CommonEventFunction;
}

const defaultProps = {};

const classPrefix = `lj-search-input`;

const SearchInput: React.FC<SearchInputProps> = (p) => {
  const props = mergeProps(defaultProps, p);
  const inputProps = _.omit(props, ['onSearch']);

  return withNativeProps(
    props,
    <IconInput
      className={classNames(classPrefix, {
        [`${classPrefix}--${props.size}`]: props.size,
      })} //
      rightIconProps={{ value: 'search', type: 'primary', onClick: props.onSearch }}
      {...inputProps}
    />,
  );
};

export default SearchInput;

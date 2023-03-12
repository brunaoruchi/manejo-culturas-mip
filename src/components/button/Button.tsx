import React from 'react'
import { Props } from './Button.types'
import { ButtonStyled } from './Button.styles'
import Text from '../text/Text'
import Icon from '../icon/Icon'

export default function Button({
  title,
  disabled,
  type,
  leftIcon,
  rightIcon,
  ...rest
}: Props) {
  return (
    <ButtonStyled type={type} disabled={disabled} {...rest}>
      {!!leftIcon && (
        <Icon
          color={type === 'fourth' ? '#000' : '#fff'}
          size='large'
          style={{ marginRight: 16 }}
          name={leftIcon}
        />
      )}
      <Text
        size="large"
        value={title}
        weight="bold"
        style={{
          color: type === 'fourth' ? '#000' : '#fff',
        }}
      />
      {!!rightIcon && (
        <Icon
          color={type === 'fourth' ? '#000' : '#fff'}
          size='large'
          style={{ marginLeft: 16 }}
          name={rightIcon}
        />
      )}
    </ButtonStyled>
  )
}

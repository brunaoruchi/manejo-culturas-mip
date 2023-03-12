import React from 'react'
import { Props } from './RoundedButton.types'
import { ButtonStyled } from './RoundedButton.styles'
import Icon from '../icon/Icon'

export default function RoundedButton({
  type,
  icon,
  iconColor,
  size = 'large',
  ...rest
}: Props) {
  return (
    <ButtonStyled size={size} type={type} {...rest}>
      <Icon color={iconColor} size={size} name={icon} />
    </ButtonStyled>
  )
}

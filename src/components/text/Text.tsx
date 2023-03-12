import React from 'react'
import { Props } from './Text.types'
import { TextStyled } from './Text.styles'

export default function Text({ size, weight, value, ...rest }: Props) {
  return (
    <TextStyled size={size} weight={weight} {...rest}>
      {value}
    </TextStyled>
  )
}

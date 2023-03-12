import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Props } from './Icon.types'
import { View } from 'react-native'

const sizes = {
    small: 16,
    medium: 18,
    large: 20,
    xlarge: 32,
}

export default function Icon({ color, name, size, style }: Props) {
  return (
    <View style={style}>
      <FontAwesome color={color} name={name} size={sizes[size]} />
    </View>
  )
}

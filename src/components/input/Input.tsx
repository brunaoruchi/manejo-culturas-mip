import React from 'react'
import { Props } from './Input.types'
import { Container, InputStyled } from './Input.styles'
import Icon from '../icon/Icon'
import { TouchableOpacity, View } from 'react-native'

export default function Input({
  type,
  viewStyle,
  showValue = true,
  onPressRightIcon,
  ...rest
}: Props) {
  return (
    <Container type={type} style={viewStyle}>
      {type === 'email' || type === 'password' ? (
        <View style={{ width: 32 }}>
          <Icon
            color="#3c8dbc"
            size={'large'}
            name={type === 'password' ? 'lock' : 'envelope'}
            style={{ marginRight: 8 }}
          />
        </View>
      ) : null}
      <InputStyled {...rest} secureTextEntry={!showValue} placeholderTextColor="#94989B"/>
      {type === 'search' || type === 'password' ? (
        <TouchableOpacity activeOpacity={0.8} onPress={onPressRightIcon}>
          <Icon
            color={type === 'password' ? '#3c8dbc' : '#BEBCCC'}
            size={'large'}
            name={
              type === 'password'
                ? !showValue
                  ? 'eye'
                  : 'eye-slash'
                : 'search'
            }
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      ) : null}
    </Container>
  )
}

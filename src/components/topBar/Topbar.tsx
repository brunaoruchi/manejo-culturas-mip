import React from 'react'
import { Props } from './Topbar.types'
import { Bottom, Container, Top } from './Topbar.styles'
import Button from '../button/Button'
import RoundedButton from '../roundedButton/RoundedButton'
import Text from '../text/Text'
import { View } from 'react-native'

export default function Topbar({
  title,
  buttonTopOnPress,
  leftIconOnPress,
  rightButtontype,
  rightButton,
  rightButtonColor,
  rightButtonOnPress,
}: Props) {
  return (
    <Container>
      {!!buttonTopOnPress ? (
        <Top>
          <Button title="Cancelar" type="fifth" onPress={buttonTopOnPress} />
        </Top>
      ) : null}
      <Bottom>
        <View style={{ width: 32, height: 32 }}>
          {!!leftIconOnPress ? (
            <RoundedButton
              icon="arrow-left"
              iconColor="#fff"
              type="primary"
              onPress={leftIconOnPress}
            />
          ) : null}
        </View>
        <Text
          value={title}
          size="large"
          weight="bold"
          style={{ color: '#fff' }}
        />
        <View style={{ width: 32, height: 32 }}>
          {!!rightButtontype &&
          !!rightButton &&
          !!rightButtonColor &&
          !!rightButtonOnPress ? (
            <RoundedButton
              icon={rightButton}
              iconColor={rightButtonColor}
              type={rightButtontype}
              onPress={rightButtonOnPress}
            />
          ) : null}
        </View>
      </Bottom>
    </Container>
  )
}

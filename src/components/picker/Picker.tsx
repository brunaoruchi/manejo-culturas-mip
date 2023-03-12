import React from 'react'

import { Container } from './Picker.styles'
import { Props } from './Picker.types'
import { Picker as PickerNative } from '@react-native-picker/picker'

const Picker: React.FC<Props> = ({ values, ...rest }) => {
  return (
    <Container>
      <PickerNative style={{ fontFamily: 'Inter_700Bold' }} {...rest}>
        {values.map(item => {
          return (
            <PickerNative.Item
              fontFamily="Inter_700Bold"
              label={item}
              value={item}
              key={item}
            />
          )
        })}
      </PickerNative>
    </Container>
  )
}

export default Picker

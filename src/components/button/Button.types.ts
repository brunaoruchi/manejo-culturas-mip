import { TouchableOpacityProps } from 'react-native'
import { IconNames } from '../icon/Icon.types'

export type ButtonType = 'primary' | 'secondary' | 'third' | 'fourth' | 'fifth'

export type Props = {
  type: ButtonType
  title: string
  rightIcon?: IconNames
  leftIcon?: IconNames
} & TouchableOpacityProps

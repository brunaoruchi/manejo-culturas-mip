import { ViewStyle } from 'react-native'

export type IconNames =
  | 'calendar'
  | 'check'
  | 'close'
  | 'trash'
  | 'plus'
  | 'bug'
  | 'eye'
  | 'eye-slash'
  | 'lock'
  | 'envelope'
  | 'search'
  | 'arrow-left'
  | 'sign-out'
  | 'pencil'

export type Props = {
  size: 'small' | 'medium' | 'large' |'xlarge'
  color: string
  name: IconNames
  style?: ViewStyle
}

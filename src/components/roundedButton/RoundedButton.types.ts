import { TouchableOpacityProps } from 'react-native';
import { IconNames } from '../icon/Icon.types';

export type Props =  {
   type: 'primary' | 'secondary' | 'third' | 'fourth';
   iconColor: string;
   icon: IconNames
   size?: 'large' | 'xlarge';
} & TouchableOpacityProps
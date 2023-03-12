import { TextProps } from 'react-native';

export type Props =  {
    size: 'small' | 'medium' | 'large';
    weight: 'thin' | 'medium' | 'bold';
    value: string;
} & TextProps
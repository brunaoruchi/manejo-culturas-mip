import { TextInputProps, ViewStyle } from "react-native";

export type Props =  {
    type: 'default' | 'search' | 'email' | 'password';
    viewStyle?: ViewStyle;
    showValue?: boolean;
    onPressRightIcon?: () => void;
 } & TextInputProps
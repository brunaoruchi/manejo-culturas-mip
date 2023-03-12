import { ViewProps } from "react-native";

export type Props = {
    title: string;
    
    average?: number;

    onPress: () => void;
} & ViewProps
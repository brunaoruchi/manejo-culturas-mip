import { ReactNode } from "react";
import { ButtonType } from "../button/Button.types";
import { ViewProps } from "react-native";

export type Props = {
    title?: string;
    date?: string;

    children: ReactNode

    leftIconOnPress?: () => void;

    buttonType?: ButtonType;
    titleButton?: string;
    onPress?: () => void;
} & ViewProps
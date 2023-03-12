import { IconNames } from "../icon/Icon.types";

export type Props = {
    title: string;


    buttonTopOnPress?: () => void;
    leftIconOnPress?: () => void;

    rightButton?: IconNames;
    rightButtonColor?: string;
    rightButtontype?: 'primary' | 'secondary' | 'third' | 'fourth';
    rightButtonOnPress?: () => void;
}

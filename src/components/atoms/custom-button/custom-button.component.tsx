import { FC } from "react";
import { DefaultButton } from "@fluentui/react";

interface Props {
  iconName?: string;
  handleClick: () => void;
  primary?: boolean;
  type?: 'button' | 'submit';
  text: string;
}

const CustomButtonComponent:FC<Props> = ({handleClick, iconName, primary, type="button", text}) => {
  return (
    <DefaultButton
      iconProps={iconName ? {iconName: iconName} : undefined}
      primary={primary ? true : false}
      type={type}
      text={text}
      onClick={() => handleClick()}
    />
  )
};

export default CustomButtonComponent;
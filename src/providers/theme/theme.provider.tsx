import React, { createContext, useState, FC, useEffect } from "react";
import {ThemeProvider, createTheme, Theme } from "@fluentui/react";
import { DARK_THEME, LIGHT_THEME } from "./theme.constants";

export enum ThemeEnum {
    Dark = 'Dark',
    Light = 'Light',
}

const darkTheme:Theme = createTheme(DARK_THEME);
const lightTheme: Theme = createTheme(LIGHT_THEME);

export type ThemeContextType = {
    currentTheme: ThemeEnum;
    setCurrentTheme: (theme: ThemeEnum) => void;
}

interface Props {
    children?: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
    currentTheme: ThemeEnum.Dark,
    setCurrentTheme: (theme) => { },
});

const MyTheme: FC<Props> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(ThemeEnum.Dark);
  const [usedTheme, setUsedTheme] = useState<Theme>(darkTheme);

  useEffect(() => {
    const tempTheme = currentTheme === ThemeEnum.Dark ? darkTheme : lightTheme;
    setUsedTheme(tempTheme);
    console.log(tempTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setCurrentTheme
    }}>
      <ThemeProvider
        applyTo="body"
        theme={usedTheme}
      >{children}</ThemeProvider >
    </ThemeContext.Provider>
  );
}

export default MyTheme;
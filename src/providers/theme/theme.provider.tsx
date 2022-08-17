import React, { createContext, useState, FC, useEffect } from "react";
import {ThemeProvider, createTheme, Theme, IPalette } from "@fluentui/react";
import { DARK_THEME, LIGHT_THEME } from "./theme.constants";

export enum ThemeEnum {
    Dark = 'Dark',
    Light = 'Light',
}

const myTheme:Theme = createTheme(DARK_THEME);
const TeamsTheme: Theme = createTheme(LIGHT_THEME);

export type ThemeContextType = {
    currentTheme: ThemeEnum;
    setCurrentTheme: (theme: ThemeEnum) => void;
    currentPalette: IPalette;
    usedTheme: Theme;
}

interface Props {
    children?: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
    currentTheme: ThemeEnum.Light,
    setCurrentTheme: (theme) => { },
    currentPalette: TeamsTheme.palette,
    usedTheme: TeamsTheme
});

const MyTheme: FC<Props> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(ThemeEnum.Light);
  const [currentPalette, setCurrentPalette] = useState<IPalette>(TeamsTheme.palette);
  const [usedTheme, setUsedTheme] = useState<Theme>(TeamsTheme)

  useEffect(() => {
    const choosenTheme = currentTheme === ThemeEnum.Dark ? myTheme : TeamsTheme;
    setCurrentPalette(choosenTheme.palette);
    setUsedTheme(choosenTheme);
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      setCurrentTheme,
      currentPalette,
      usedTheme
    }}>
      <ThemeProvider
        applyTo="body"
        theme={usedTheme}
      >{children}</ThemeProvider >
    </ThemeContext.Provider>
  );
}

export default MyTheme;
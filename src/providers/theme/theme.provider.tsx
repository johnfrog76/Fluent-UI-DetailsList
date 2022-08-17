import React, { createContext, useState, FC, useEffect } from "react";
import {ThemeProvider, createTheme, Theme } from "@fluentui/react";

export enum ThemeEnum {
    Dark = 'Dark',
    Light = 'Light',
}

export const myTheme:Theme = createTheme({
  palette: {
    neutralLighterAlt: "#282828",
    neutralLighter: "#313131",
    neutralLight: "#3f3f3f",
    neutralQuaternaryAlt: "#484848",
    neutralQuaternary: "#4f4f4f",
    neutralTertiaryAlt: "#6d6d6d",
    neutralTertiary: "#c8c8c8",
    neutralSecondary: "#d0d0d0",
    neutralPrimaryAlt: "#dadada",
    neutralPrimary: "#ffffff",
    neutralDark: "#f4f4f4",
    black: "#f8f8f8",
    white: "#1f1f1f",
    themePrimary: "#3a96dd",
    themeLighterAlt: "#020609",
    themeLighter: "#091823",
    themeLight: "#112d43",
    themeTertiary: "#235a85",
    themeSecondary: "#3385c3",
    themeDarkAlt: "#4ba0e1",
    themeDark: "#65aee6",
    themeDarker: "#8ac2ec",
    accent: "#3a96dd"
  }
});

export const TeamsTheme: Theme = createTheme({
  palette: {
    themePrimary: '#6061aa',
    themeLighterAlt: '#f7f7fc',
    themeLighter: '#e1e1f2',
    themeLight: '#c7c8e6',
    themeTertiary: '#9797cd',
    themeSecondary: '#6f70b5',
    themeDarkAlt: '#56579a',
    themeDark: '#494a82',
    themeDarker: '#363660',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#b6b0b0',
    neutralSecondary: '#9f9797',
    neutralPrimaryAlt: '#877f7f',
    neutralPrimary: '#282424',
    neutralDark: '#585151',
    black: '#403b3b',
    white: '#fff',
  },
  semanticColors: {
    buttonBackground: 'transparent',
    buttonBackgroundHovered: '#bdbdbd',
    buttonBackgroundPressed: '#a7a7a7',

    buttonText: '#252424',
    buttonTextPressed: '#252424',
    buttonTextHovered: '#252424',

    buttonBorder: '#bdbdbd',
  },
});

export type ThemeContextType = {
    currentTheme: ThemeEnum;
    setCurrentTheme: (theme: ThemeEnum) => void;
    currentPalette: Theme;
}

interface Props {
    children?: React.ReactNode
}

export const ThemeContext = createContext<ThemeContextType>({
    currentTheme: ThemeEnum.Light,
    setCurrentTheme: (theme) => { },
    currentPalette: TeamsTheme
});


const MyTheme: FC<Props> = ({ children }) => {

    const [currentTheme, setCurrentTheme] = useState(ThemeEnum.Light);
    const [currentPalette, setCurrentPalette] = useState<Theme>(TeamsTheme);
    
    useEffect(() => {
      setCurrentPalette(currentTheme === ThemeEnum.Dark ? myTheme: TeamsTheme)
    }, [currentTheme])

    return (
        <ThemeContext.Provider value={{currentTheme, setCurrentTheme, currentPalette}}>
          
          {
          <ThemeProvider
            applyTo="body"
            theme={currentPalette}
          >{children}</ThemeProvider >
          }
        </ThemeContext.Provider>
    );

}

export default MyTheme;
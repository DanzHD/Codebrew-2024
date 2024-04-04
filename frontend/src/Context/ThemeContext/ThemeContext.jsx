import {createContext, useEffect, useState} from "react";

export const THEMES = {
    light: "light-theme",
    dark: "dark-theme"
}

export const ThemeContext = createContext(null);

export function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState(THEMES.dark);

    function handleToggleTheme() {
        setTheme(theme === THEMES.light ? THEMES.dark : THEMES.light);
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const contextData = {
        theme,
        handleToggleTheme
    }

    return (
        <ThemeContext.Provider value={contextData}>
            {children}
        </ThemeContext.Provider>
    )

}
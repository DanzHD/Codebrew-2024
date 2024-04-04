import {useContext} from "react";
import {ThemeContext} from "./ThemeContext.jsx";
export default function useThemeContext() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useThemeContext must be used inside a theme context provider");
    }

    return context;

}
import { ThemeContext } from "@emotion/react";
import { createContext, useEffect, useState } from "react";

export const themeContext = createContext();

export const ThemeProvider =({children})=>{
    const [theme,setTheme] = useState("light");

    useEffect(()=>{

        const savedTheme = localStorage.getItem('theme');
        if(savedTheme) setTheme(savedTheme);
    },[]);

    const toggleTheme = (prev)=>{
        setTheme((prev)=>{
            const newTheme = prev === "light"?"dark":"light";
            localStorage.setItem("theme",newTheme);
            return newTheme
        })
    }

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}

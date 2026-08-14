import { createContext, useContext, useEffect, useState } from "react"

const THEME_STORAGE_KEY = "spacex-theme"

const getStoredTheme = () => {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY)
  } catch (error) {
    return null
  }
}

const getSystemTheme = () => {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  } catch (error) {
    return "light"
  }
}

const getInitialTheme = () => {
  const storedTheme = getStoredTheme()
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme
  }
  return getSystemTheme()
}

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
})

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (error) {
      // storage may be unavailable (e.g. private browsing); theme still applies for the session
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => useContext(ThemeContext)

export default ThemeProvider
export { ThemeContext, useTheme, THEME_STORAGE_KEY }

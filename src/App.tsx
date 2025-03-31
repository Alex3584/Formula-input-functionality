import { useState } from "react"
import {
  CssBaseline,
  ThemeProvider,
  Switch,
  Typography,
  Box,
} from "@mui/material"
import { lightTheme, darkTheme } from "./theme/theme"
import MainPage from "./page/MainPage"

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev)
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="end" mb={2}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Typography>
          <Switch checked={isDarkMode} onChange={handleToggleTheme} />
        </Box>
        <MainPage />
      </Box>
    </ThemeProvider>
  )
}

export default App

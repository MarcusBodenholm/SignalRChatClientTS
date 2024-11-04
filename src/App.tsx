import { ThemeProvider, CssBaseline } from '@mui/material'
import { LightTheme } from './theme/theme'
import Router from './pages/Router'
import './App.css'
import UserContextProvider from './contexts/userContext'
import ChatContextProvider from './contexts/chatContext'


function App() {

  return (
    <ThemeProvider theme={LightTheme}>
      <UserContextProvider>
        <ChatContextProvider>
          <CssBaseline>
              <Router/>
          </CssBaseline>
        </ChatContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App

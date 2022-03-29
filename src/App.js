import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useReactiveVar } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { changeThemeVar } from './apollo/reactive-vars'
import { lightTheme, darkTheme } from './mui/theme'

import PageWrapper from './components/PageWrapper'
import Home from './pages/home'
import Post from './pages/post'

const App = () => {
  const useDarkTheme = useReactiveVar(changeThemeVar)
  return (
    <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </PageWrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

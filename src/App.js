import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PageWrapper from './components/PageWrapper'
import Home from './pages/home'
import Post from './pages/post'
import User from './pages/user'

const App = () => {
  return (
    <PageWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </PageWrapper>
  )
}

export default App

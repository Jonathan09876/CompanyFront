import "./App.css";
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './pages/Home'
import LoginScreen from './pages/auth/Login'
import RegisterScreen from './pages/auth/Register'
import File_list from './pages/project/File_list'
import Map from './pages/map/map'
import ProjectCreate from './pages/project/Add'
import ProjectUpdate from './pages/project/Update'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/file_list' element={<File_list />} />
            <Route path='/map' element={<Map />} />
            <Route path='/project/add' element={<ProjectCreate />} />
            <Route path='/project/:id' element={<ProjectUpdate />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App;

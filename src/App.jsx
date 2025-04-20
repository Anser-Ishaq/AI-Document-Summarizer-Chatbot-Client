import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import ForgotPassword from './Components/Auth/Forgot';

function App() {

  return (
    <>
      <Routes>
        {/* Main Layout for normal pages */}
        <Route path="/" element={<MainLayout />}>
          {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
        </Route>

        {/* Auth Layout for login/register/etc */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App

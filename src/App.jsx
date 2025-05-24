import './App.css'
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import MainLayout from './Layouts/MainLayout'
import AuthLayout from './Layouts/AuthLayout'
import ForgotPassword from './Components/Auth/Forgot';
import useAuthStore from './Store/authStore';
import { useEffect } from 'react';
import ProtectedRoute from './Components/ProtectedRoutes';
import Home from './Components/Home';
import LoadScripts from './Hooks/LoadScripts';
import Subscription from './Components/Subscription/Subscription';
import Profile from './Components/Profile/Profile';
import Checkout from './Components/Subscription/Checkout';


function App() {
  LoadScripts()

  const { initializeAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (!isInitialized) return null;
  return (
    <>
      <Routes>
        {/* Main Layout for normal pages */}
        <Route path="/" element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
          {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
        </Route>
        {/* <Route index element={<Home />} /> */}
        <Route path="chat/:chatId" element={<MainLayout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="manage-subscription" element={<Subscription />} />
        <Route path="checkout" element={<Checkout />} />

        {/* Auth Layout for login/register/etc */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}
        </Route>
      </Routes>
    </>
  )
}

export default App

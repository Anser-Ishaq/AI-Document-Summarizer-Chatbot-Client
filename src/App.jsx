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
import Index from './Components/dashboard/Index';
import CouponsAndSubs from './Components/dashboard/CouponsAndSubs';
import CouponsTable from './Components/dashboard/CouponsTable';
import PlansTable from './Components/dashboard/PlansTable';
import Layout from './Layouts/AdminLayout';
import SubscriptionTable from './Components/dashboard/SubscriptionTable';
import Customers from './Components/dashboard/Customers';
import Loader from './Components/Loader';


function App() {
  LoadScripts()

  const { initializeAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  if (!isInitialized) return <Loader/>;
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

        {/* admin routes */}
        <Route path="admin" element={<Index />} />
        <Route path="admin/customers" element={<Customers />} />
        <Route path="admin/coupons" element={<CouponsAndSubs />} />
        <Route path="admin/all-coupons" element={<CouponsTable />} />
        <Route path="admin/all-plans" element={<PlansTable />} />
        <Route path="admin/all-subscriptions" element={<SubscriptionTable />} />
      </Routes>
    </>
  )
}

export default App

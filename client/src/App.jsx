import React, {useEffect} from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import Theme from './Pages/Theme';
import EditProfile from './Pages/EditProfile';
import { useTheme, useAuth } from './Lib/Zustand';
import Profile from './Pages/Profile';
import Toolbar from './Components/Toolbar';
import Search from './Pages/Search';
import OAuthSuccess from './Pages/OAuthSuccess';

const Layout = () => {
  const { theme } = useTheme();
  const { currentUser, connectSocket } = useAuth();

  useEffect(() => {
    if (currentUser) {
      connectSocket();
    }
  }, [currentUser]);
  
  return (
    <div data-theme={theme}>
      {currentUser && <Toolbar/>}
      <Outlet />
    </div>
  )
}

const App = () => {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={currentUser ? <Home /> : <Navigate to="/login" />} />
          <Route path='/signup' element={currentUser ? <Navigate to="/" /> : <Signup />} />
          <Route path='/login' element={currentUser ? <Navigate to="/" /> : <Login />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/resetpassword/:resetToken' element={<ResetPassword />} />
          <Route path='/themes' element={<Theme />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/search' element={<Search />} />
          <Route path='/oauth-success' element={<OAuthSuccess />} />
          <Route path='*' element={currentUser ? <Home /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
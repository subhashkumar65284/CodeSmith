import { Routes, Route, Navigate} from 'react-router';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from "./slices/authSlice"

function App() {
  const {isAuthenticated} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center"> 
  <Routes>
    <Route
      path="/"
      element={isAuthenticated ? <Home /> : <Navigate to="/signup" />}
    />

    <Route
      path="/signup"
      element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
    />

    <Route
      path="/login"
      element={isAuthenticated ? <Navigate to="/" /> : <Login />}
    />
  </Routes>
</main>
    </>
  )
}

export default App

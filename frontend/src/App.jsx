import { Routes, Route, Navigate} from 'react-router';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from "./slices/authSlice"

function App() {
  const {isAuthenticated,loading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  let mainStyle = `${isAuthenticated?"min-h-[calc(100vh-4rem)]":"w-screen h-screen"} flex flex-col justify-center items-center`

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])

  if(loading){
    return(
      <>
      <div className="w-screen h-screen bg-[#030014] flex justify-center items-center">
          <span className="loading loading-bars loading-xl"></span>
      </div>
      </>
    )
  }

  return (
    <>
      {isAuthenticated && <Navbar />}
      <main className={mainStyle}> 
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

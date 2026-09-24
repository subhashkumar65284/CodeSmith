import { Routes, Route, Navigate} from 'react-router';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from "./slices/authSlice"
import AdminDashboard from './pages/AdminDashboard';
import AdminCreateProblem from './pages/AdminCreateProblem';
import AdminUpdateProblem from './pages/AdminUpdateProblem';
import AdminDeleteProblem from './pages/AdminDeleteProblem';
import ProblemPage from './pages/ProblemPage'

function App() {
  const {user,isAuthenticated,loading} = useSelector(state => state.auth);
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

    {/* Admin Routes */}
    <Route
      path="/admin"
      element={(isAuthenticated && user?.role ==='admin') ? <AdminDashboard /> : <Navigate to="/login" />}
    />
    <Route
      path="/admin/createProblem"
      element={(isAuthenticated && user?.role ==='admin') ? <AdminCreateProblem /> : <Navigate to="/login" />}
    />
    <Route
      path="/admin/updateProblem"
      element={(isAuthenticated && user?.role ==='admin') ? <AdminUpdateProblem /> : <Navigate to="/login" />}
    />
    <Route
      path="/admin/deleteProblem"
      element={(isAuthenticated && user?.role ==='admin') ? <AdminDeleteProblem /> : <Navigate to="/login" />}
    />

    {/*Problem Routes*/}
    <Route path='/problem/:Pid' element={isAuthenticated ? <ProblemPage/>:<Navigate to="/signup" />}/>
  </Routes>
</main>
    </>
  )
}

export default App

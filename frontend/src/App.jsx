import { Routes, Route} from 'react-router';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
    <Navbar/>
    <main className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </main>
    </>
  )
}

export default App

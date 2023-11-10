import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { useAuthContext } from './hook/useAuthContext';

import Home from './Pages/Home'
import Navbar from './components/Navbar';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login'

function App() {
  const {user} = useAuthContext()
  return (
    <div className="App  pb-16 bg-gray-900 min-h-screen">
     <BrowserRouter>
     <Navbar/>
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home/> : <Navigate to="/login"/>}/>
            <Route path="/signup" element={!user? <SignUp/> : <Navigate to="/"/> }/>
            <Route path="/login" element ={!user? <Login/> : <Navigate to ="/"/>}/>
          </Routes>
        </div>
     </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Scoreboard from './pages/Scoreboard';
import FavouritePlayers from './pages/FavouritePlayers'
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header'
import Standings from './pages/Standings';


function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Scoreboard />} />
            <Route path='/favouriteplayers' element={<FavouritePlayers />} />
            <Route path='/standings' element={<Standings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

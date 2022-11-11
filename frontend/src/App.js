import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Scoreboard from './pages/Scoreboard';
import Standings from './pages/Standings';
import FavouritePlayers from './pages/FavouritePlayers'
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { nbaColours } from './app/constants'



function App() {
  const {user} = useSelector((state) => state.auth)

  //Find colours based on favourite team

  const favTeam = user.favouriteTeam.split(" ").join("")
  const favColours = Object.values(nbaColours.find(el => el[favTeam]))
  const favColourHome = favColours[0][0]

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('team')
    const initialValue = JSON.parse(saved)
    return initialValue || user.favouriteTeam
  })

  const [colour, setColour] = useState(() => {
    const saved = localStorage.getItem('colour')
    const initialValue = JSON.parse(saved)
    return initialValue || favColourHome
  })

  function handleChange(e) {
    const currentTeam = e.value.split(" ").join("")
    const currentColours = Object.values(nbaColours.find(el => el[currentTeam]))
    const currentColourHome = currentColours[0][0]

    setTeam(e.value)
    setColour(currentColourHome)
    
    localStorage.setItem('colour', JSON.stringify(currentColourHome))
    localStorage.setItem('team', JSON.stringify(team))
  }

  return (
    <>
      <Router>
        <div className='container'>
          <Header colour={colour} handleChange={handleChange} team={team} />
          <Routes>
            <Route path='/' element={<Scoreboard />} />
            <Route path='/favouriteplayers' element={<FavouritePlayers />} />
            <Route path='/standings' element={<Standings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

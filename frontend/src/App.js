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
  const favColourAway = favColours[0][1]

  //Check local storage for team/colour selections

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

  const [colourAway, setColourAway] = useState(() => {
    const saved = localStorage.getItem('colourAway')
    const initialValue = JSON.parse(saved)
    return initialValue || favColourAway
  })

  //Set team, colour selections and save them to local storage

  function handleChange(e) {
    const currentTeam = e.value.split(" ").join("")
    const currentColours = Object.values(nbaColours.find(el => el[currentTeam]))
    const currentColourHome = currentColours[0][0]
    const currentColourAway = currentColours[0][1]

    setTeam(e.value)
    setColour(currentColourHome)
    setColourAway(currentColourAway)
    
    localStorage.setItem('colour', JSON.stringify(currentColourHome))
    localStorage.setItem('colourAway', JSON.stringify(currentColourAway))
    localStorage.setItem('team', JSON.stringify(team))
  }

  return (
    <>
      <Router>
        <div className='container'>
          <Header colourAway={colourAway} colour={colour} handleChange={handleChange} team={team} />
          <Routes>
            <Route path='/' element={<Scoreboard colourAway={colourAway} colour={colour} />} />
            <Route path='/favouriteplayers' element={<FavouritePlayers />} />
            <Route path='/standings' element={<Standings />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
          <Footer colour={colour} colourAway={colourAway}/>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

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

  // Return today's date in format required for API call

  function getDate() {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    if(month < 10) {
      month = '0' + month
    }
    let year = newDate.getFullYear();
    return `${year}-${month}-${date}`
}

  const currentDate = getDate()

  //Find colours based on favourite team

  let favTeam;
  let favColours;
  let favColourHome;
  let favColourAway;

  if(user) {
    favTeam = user.favouriteTeam.split(" ").join("")
    favColours = Object.values(nbaColours.find(el => el[favTeam]))
    favColourHome = favColours[0][0]
    favColourAway = favColours[0][1]
  }
  
  

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
    localStorage.setItem('team', JSON.stringify(e.value))
  }

  return (
    <>
      <Router>
        <div className='container'>
          <Header colourAway={colourAway} colour={colour} handleChange={handleChange} team={team} />
          <Routes>
            <Route path='/' 
                   element={<Scoreboard
                   currentDate={currentDate} 
                   colourAway={colourAway} 
                   colour={colour} />} />
            <Route path='/favouriteplayers' 
                   element={<FavouritePlayers 
                   colour={colour} />} />
            <Route path='/standings' 
                   element={<Standings
                   currentDate={currentDate} 
                   colourAway={colourAway} 
                   colour={colour} />} />
            <Route path='/login' 
                   element={<Login />} />
            <Route path='/register' 
                   element={<Register />} />
          </Routes>
          <Footer colour={colour} />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

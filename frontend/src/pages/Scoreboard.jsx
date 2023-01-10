import {useState, useEffect} from 'react'
import Marquee from 'react-fast-marquee'
import MarqueeData from '../components/MarqueeData'
import Scoreboards from '../components/Scoreboards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

function Scoreboard({colour, colourAway, currentDate}) {

    const [scores, setScores] = useState(() => {
      const saved = localStorage.getItem('scores')
      const initialValue = JSON.parse(saved)
      return initialValue || []
    })
    
    const [stats, setStats] = useState(() => {
      const saved = localStorage.getItem('stats')
      const initialValue = JSON.parse(saved)
      return initialValue || []
    })

    //Handle Scores/Stats Refresh

    function handleClick() {
      getScores()
    }

    //Pull live scores from API using current date

    async function getScores() {
      await fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${currentDate}`, {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': '81f0f8a38bmsh024375d5af83615p170190jsnee4713d76fa2',
              'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
          }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("ERROR (response not ok)");
      })
      .then((data) => {
        setScores(data.response);
        localStorage.setItem('scores', JSON.stringify(data.response))
        console.log('Scores retrieved')
        getStats(data.response)
      })
      .catch(() => {
        console.log("error");
      });
    }

    async function getStats(scores) {
      setStats([])
      await scores.forEach((game) =>
      fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?game=${game.id}`, {
          method: 'GET',
          headers: {
              'X-RapidAPI-Key': '81f0f8a38bmsh024375d5af83615p170190jsnee4713d76fa2',
              'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
          }
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("ERROR (response not ok)");
        })
        .then((data) => {
          setStats(prevData => [...prevData, ...data.response]);
          console.log("Stats retrieved")
        })
        .catch(() => {
          console.log("error");
      }))
    }

    useEffect(() => {
      if(scores.length === 0) {
        getScores()
      }

      // Disables Reacts 'missing dependency' issue
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      localStorage.setItem('stats', JSON.stringify(stats))
    }, [stats])

    return (
      <div className='container--body'>
          <Marquee style={{border: '1px solid black', height: '50px'}}
                   pauseOnHover='true'
                   speed='20'>
              <MarqueeData scores={scores} stats={stats}/>
          </Marquee>
          <FontAwesomeIcon icon={faRotateRight} className='refresh' onClick={handleClick}/>
          {scores.length === 0 ? <h1 style={{margin: "3rem"}}>No Games Today</h1> :
          <div className='boxscore--all'>
          <Scoreboards 
            scores={scores} 
            stats={stats} 
            colour={colour} 
            colourAway={colourAway}
            />
          </div>}
      </div>
    ) 
}

export default Scoreboard
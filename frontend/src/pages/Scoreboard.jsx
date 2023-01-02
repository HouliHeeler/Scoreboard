import {useEffect, useState} from 'react'
import Marquee from 'react-fast-marquee'
import MarqueeData from '../components/MarqueeData'
import Spinner from '../components/Spinner'
import Scoreboards from '../components/Scoreboards'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

function Scoreboard({colour, colourAway, currentDate}) {

    //Pull live scores from API using current date

    const [scores, setScores] = useState(() => {
      const saved = localStorage.getItem('scores')
      const initialValue = JSON.parse(saved)
      return initialValue || []
    })

    const [isLoading, setIsLoading] = useState(false)

    //If no scores present in localStorage, get scores

    if(localStorage.getItem('scores') === null) {
      getScores()
    }

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
          console.log(`Scores API for ${currentDate}`)
        })
        .then(setIsLoading(false))
        .catch(() => {
          console.log("error");
        });

        await getStats(scores)
    }

    //Pull individual statistics from games

    const [stats, setStats] = useState(() => {
      const saved = localStorage.getItem('stats')
      const initialValue = JSON.parse(saved)
      return initialValue || []
    })

    useEffect(() => {
      localStorage.setItem('stats', JSON.stringify(stats))
    }, [stats])

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
          console.log('Stats API')
        })
        .catch(() => {
          console.log("error");
      }))
    }

    //Only call Scores API if there is nothing in localStorage or the date has changed

    const parsedDate = JSON.parse(localStorage.getItem('scoresUpdated'))

    if(localStorage.getItem('scores') === null || parsedDate !== currentDate) {
      localStorage.setItem('scoresUpdated', JSON.stringify(currentDate))
      getScores()
    }

    //Handle Scores/Stats Refresh

    function handleClick() {
      getScores()
    }

    return (
        isLoading ? <Spinner /> :
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
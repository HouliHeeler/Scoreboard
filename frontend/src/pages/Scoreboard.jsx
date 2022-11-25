import {useEffect, useState} from 'react'
import Marquee from 'react-fast-marquee'
import MarqueeData from '../components/MarqueeData'
import Spinner from '../components/Spinner'
import Scoreboards from '../components/Scoreboards'
import {FaCloudDownloadAlt} from 'react-icons/fa'

function Scoreboard({colour, colourAway, currentDate}) {

    //Pull live scores from API using current date

    const [scores, setScores] = useState(() => {
      const saved = localStorage.getItem('scores')
      const initialValue = JSON.parse(saved)
      return initialValue || []
    })

    const [isLoading, setIsLoading] = useState(false)

    function getScores() {
        fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${currentDate}`, {
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
            console.log('Scores API')
          })
          .then(setIsLoading(false))
          .catch(() => {
            console.log("error");
          });
    }

    if(localStorage.getItem('scores') === null) {
      getScores()
    }

    //Pull individual statistics from games

    const [stats, setStats] = useState([])

    function getStats(id) {
        fetch(`https://api-nba-v1.p.rapidapi.com/players/statistics?game=${id}`, {
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
              console.log(data.response)
            })
            .catch(() => {
              console.log("error");
            });
    }

    const [statsRan, setStatsRan] = useState(true)

    useEffect(() => {
      scores.map(game => getStats(game.Id))
    }, [scores])

    //Style boxscore cards
    const teamStyle ={ backgroundColor: colour, boxShadow: `3px 3px ${colourAway}`}

    //Handle Scores/Stats Refresh

    function handleClick() {
      getScores()
      getStats()
      setStatsRan(prevState => !prevState)
      console.log(statsRan)
    }

    return (
        isLoading ? <Spinner /> :
        <div className='container--body'>
            <Marquee style={{border: '1px solid black', height: '50px'}}
                     pauseOnHover='true'
                     speed='20'>
                <MarqueeData scores={scores} stats={stats}/>
            </Marquee>
            <FaCloudDownloadAlt className='refresh' onClick={handleClick}/>
            <div className='boxscore--all'>
            <Scoreboards 
              scores={scores} 
              teamStyle={teamStyle} 
              stats={stats} 
              colour={colour} 
              colourAway={colourAway}
              statsRan={statsRan}
              />
            </div>
        </div>
    ) 
}

export default Scoreboard
import {useState, useEffect} from 'react'
import Marquee from 'react-fast-marquee'
import MarqueeData from '../components/MarqueeData'
import Spinner from '../components/Spinner'
import Scoreboards from '../components/Scoreboards'

function Scoreboard({colour, colourAway, currentDate}) {

    //Pull live scores from API using current date

    const [scores, setScores] = useState([])

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
            console.log('Scores API')
          })
          .then(setIsLoading(false))
          .catch(() => {
            console.log("error");
          });
    }

    useEffect(getScores, [currentDate])

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
            })
            .catch(() => {
              console.log("error");
            });
    }

    useEffect(() => {
        scores.map(game => getStats(game.id))
    }, [scores])

    console.log(stats)
    console.log(scores)

    //Style boxscore cards
    const teamStyle ={ backgroundColor: colour, boxShadow: `3px 3px ${colourAway}`}

    return (
        isLoading ? <Spinner /> :
        <div className='container--body'>
            <Marquee style={{border: '1px solid black', height: '50px'}}
                     pauseOnHover='true'
                     speed='20'>
                <MarqueeData scores={scores} stats={stats}/>
            </Marquee>
            <div className='boxscore--all'>
            <Scoreboards scores={scores} teamStyle={teamStyle} stats={stats} colourAway={colourAway} />
            </div>
        </div>
    ) 
}

export default Scoreboard
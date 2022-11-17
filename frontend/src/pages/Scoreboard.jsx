import {useState, useEffect} from 'react'
import Marquee from 'react-fast-marquee'
import MarqueeData from '../components/MarqueeData'
import Spinner from '../components/Spinner'

function Scoreboard({colour, colourAway, currentDate}) {

    // Return today's date in format required for API call
    // function getDate() {
    //     let newDate = new Date()
    //     let date = newDate.getDate() + 1;
    //     let month = newDate.getMonth() + 1;
    //     if(month < 10) {
    //       month = '0' + month
    //     }
    //     let year = newDate.getFullYear();
    //     return `${year}-${month}-${date}`
    // }

    // const currentDate = getDate()

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
          })
          .then(setIsLoading(false))
          .catch(() => {
            console.log("error");
          });
    }

    useEffect(getScores, [currentDate])

    //Style boxscore cards
    const teamStyle ={ backgroundColor: colour, boxShadow: `3px 3px ${colourAway}`}

    function scoreboards() {
        return (
            scores.map((item, idx) => (
                <div key={idx} className='boxscore' style={teamStyle} >
                    <img alt='Home Team Logo' src={item.teams.home.logo}></img>
                    <span className='boxscore--teamname'>{item.teams.home.nickname}</span>
                    <div className='boxscore--numbers'>
                        <h3 className='boxscore--score'>{item.scores.home.points}-{item.scores.visitors.points}</h3>
                        <span >
                            {(() => {
                                        if (item.status.clock === null) {
                                            if(item.status.halftime) {
                                                return (
                                                    "Halftime"
                                                  )
                                            } else if (item.status.long === 'Finished') {
                                                return (
                                                  "Final"
                                                )
                                            } else if (item.status.long === 'Scheduled') {
                                                let time = item.date['start']
                                                let timeChunk = time.split("T")[1].slice(0,5)
                                                let hour = Number(timeChunk.slice(0,2)) + 4
                                                let startTime = hour.toString() + timeChunk.substring(2)
                                                return `${startTime}PM`
                                            } else {
                                                return (
                                                    `Q${item.periods.current + 1} 15:00`
                                                )
                                            }
                                        }  else {
                                          return (
                                            `Q${item.periods.current} ${item.status.clock}`
                                          )
                                        }
                                    })()}
                        </span>
                    </div>
                    <span className='boxscore--teamname'>{item.teams.visitors.nickname}</span>
                    <img alt='Away Team Logo' src={item.teams.visitors.logo}></img>
                </div>
            ))
        )
    }

    return (
        isLoading ? <Spinner /> :
        <div className='container--body'>
            <Marquee style={{border: '1px solid black', height: '50px'}}
                     pauseOnHover='true'
                     speed='15'>
                <MarqueeData scores={scores} />
            </Marquee>
            <div className='boxscore--all'>
            {scoreboards()}
            </div>
        </div>
    ) 
}

export default Scoreboard
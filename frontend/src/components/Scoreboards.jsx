import { useState } from "react"
import Statlines from "./Statlines"
import { nbaColours } from "../app/constants"

function Scoreboards({scores, stats, colour, colourAway}) {

    //Set state with all playing teams set to false, this will be used to hide/show team statlines

    const nbaHomeTeams = scores.map(item => item.teams.home.nickname)
    const nbaAwayTeams = scores.map(item => item.teams.visitors.nickname) 
    const nbaTeams = nbaHomeTeams.concat(nbaAwayTeams)
    const nbaObject = nbaTeams.reduce((a,v) => ({...a, [v]: false}), {})

    const [show, setShow] = useState(nbaObject)

    return (
        scores.map((item, idx) => (
            <div className="scorecard" key={idx}>
                <div className='boxscore' 
                     //Styles boxscore to have a gradient progression from home team colour to white to away team colour at a 135 degree angle
                     style={{background: `linear-gradient(135deg, ${Object.values(nbaColours.find(el => el[((item.teams.home.name).split(" ").join(""))]))[0][0]}, white, ${Object.values(nbaColours.find(el => el[((item.teams.visitors.name).split(" ").join(""))]))[0][0]})`}} >
                    <img alt='Home Team Logo' src={item.teams.home.logo}></img>
                    <span 
                        className='boxscore--teamname' 
                        onClick={() => setShow(prevState => ({...prevState, [item.teams.home.nickname]: !prevState[item.teams.home.nickname]}))}
                        style={{textDecoration: show[item.teams.home.nickname] && 'underline'}}
                        >
                                    {item.teams.home.nickname}
                    </span>
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
                                                let hourInit = timeChunk.split(":")[0]
                                                let hour;
                                                if(hourInit === '20') {
                                                  hour = 12
                                                }else if (hourInit > 20) {
                                                  hour = Number(timeChunk.slice(0,2)) - 20
                                                }else {
                                                  hour = Number(timeChunk.slice(0,2)) + 4
                                                }
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
                    <span 
                        className='boxscore--teamname'
                        onClick={() => setShow(prevState => ({...prevState, [item.teams.visitors.nickname]: !prevState[item.teams.visitors.nickname]}))}
                        style={{textDecoration: show[item.teams.visitors.nickname] && "underline"}} 
                        >
                            {item.teams.visitors.nickname}
                    </span>
                    <img alt='Away Team Logo' src={item.teams.visitors.logo}></img>
                </div>
                <Statlines 
                    stats={stats} 
                    homeTeam={item.teams.home.nickname} 
                    awayTeam={item.teams.visitors.nickname} 
                    colourAway={colourAway}
                    colour={colour} 
                    show={show}
                />
            </div>
        ))
    )
}

export default Scoreboards
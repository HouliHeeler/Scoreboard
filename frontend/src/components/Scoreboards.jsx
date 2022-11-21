import Statlines from "./Statlines"

function Scoreboards({scores, teamStyle, stats, colourAway}) {
    return (
        scores.map((item, idx) => (
            <div className="scorecard">
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
                <Statlines stats={stats} homeTeam={item.teams.home.nickname} awayTeam={item.teams.visitors.nickname} colourAway={colourAway} />
            </div>
        ))
    )
}

export default Scoreboards
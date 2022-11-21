function Statlines({stats, homeTeam, awayTeam, colourAway, colour, show, homeTeamFull, awayTeamFull}) {

    //Filter out stats by team from array

    const homeStats = stats.filter(game => game.team.nickname === homeTeam)
    const awayStats = stats.filter(game => game.team.nickname === awayTeam)

    //Build statsHeader

    function statsHeader(colour, team) {
        return (
            <div className="player--statline">
                <ul style={{fontWeight: 600, backgroundColor: colour, margin: 0}}>
                    <li style={{paddingLeft: '10px', fontSize: '1rem'}}>{team}</li>
                    <li>Points</li>
                    <li>Rebounds</li>
                    <li>Assists</li>
                    <li>Blocks</li>
                    <li>Steals</li>
                </ul>
            </div>
        )
    } 

    return (
      <section className="statline" style={{boxShadow: `3px 3px ${colourAway}`}}>
          {show[homeTeam] && statsHeader(colour, homeTeam)}
          {homeStats.map((item) => (
          <div 
            key={item.player.id} 
            className='player--statline'
            style={{display: !show[item.team.nickname] && 'none'}}
          >
              <ul>
                  <li>{item.player.firstname} {item.player.lastname}</li>
                  <li>{item.points}</li>
                  <li>{item.totReb}</li>
                  <li>{item.assists}</li>
                  <li>{item.blocks}</li>
                  <li>{item.steals}</li>
              </ul>
          </div>  
          ))}
          {show[awayTeam] && statsHeader(colour, awayTeam)}
          {awayStats.map((item) => (
          <div 
            key={item.player.id} 
            className='player--statline'
            style={{display: !show[item.team.nickname] && 'none'}}
          >
              <ul>
                  <li>{item.player.firstname} {item.player.lastname}</li>
                  <li>{item.points}</li>
                  <li>{item.totReb}</li>
                  <li>{item.assists}</li>
                  <li>{item.blocks}</li>
                  <li>{item.steals}</li>
              </ul>
          </div>  
          ))}
      </section>
    )
}

export default Statlines
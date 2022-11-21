function Statlines({stats, homeTeam, awayTeam, colourAway, colour}) {

    //Filter out stats by team from array

    const homeStats = stats.filter(game => game.team.nickname === homeTeam)
    const awayStats = stats.filter(game => game.team.nickname === awayTeam)

    return (
      <section className="statline" style={{boxShadow: `3px 3px ${colourAway}`}}>
          <div className="player--statline">
            <ul style={{fontWeight: 600, backgroundColor: colour, margin: 0}}>
                <li></li>
                <li>Points</li>
                <li>Rebounds</li>
                <li>Assists</li>
                <li>Blocks</li>
                <li>Steals</li>
            </ul>
          </div>
          {homeStats.map((item) => (
          <div key={item.player.id} className='player--statline' style={{display: 'none'}}>
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
          {awayStats.map((item) => (
          <div key={item.player.id} className='player--statline'>
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
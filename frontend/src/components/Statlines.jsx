function Statlines({stats, homeTeam, awayTeam, colourAway}) {

    //Filter out stats by team from array

    const homeStats = stats.filter(game => game.team.nickname === homeTeam)
    const awayStats = stats.filter(game => game.team.nickname === awayTeam)

    //Box Shadow

    const style={boxShadow: `3px 3px ${colourAway}`}

    return (
      <section className="statline">
          {homeStats.map((item) => (
          <div key={item.player.id} className='player--statline' style={style}>
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
          <div key={item.player.id} className='player--statline' style={style}>
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
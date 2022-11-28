import { useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { getPlayers, reset } from '../features/players/playerSlice'

function MarqueeData({stats}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {players, isError, message} = useSelector((state) => state.players)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getPlayers())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  //Return favourite players and respective teams
  const text = players.map(player => player['text'])
  const playerNames = text.map(player => player.split("-")[0].trim())

  //Filters out favourite player stats from games fetched by getStats
  const individualStats = stats.filter(stats => playerNames.includes(`${stats.player.firstname} ${stats.player.lastname}`))

  function marqueeList() {
      return (
          individualStats.map((item, idx) => (
              <span key={idx} style={{margin: '20px'}}>{item.player.firstname} {item.player.lastname} - {item.points} Point{item.points !== 1 && 's'}, {item.totReb} Rebound{item.totReb !== 1 && 's'}, {item.assists} Assist{item.assists !== 1 && 's'}, {item.steals} Steal{item.steals !== 1 && 's'}, {item.blocks} Block{item.blocks !== 1 && 's'}, {item.turnovers} Turnover{item.turnovers !== 1 && 's'}</span>
          ))
      )
  }

  return (
    individualStats.length === 0 ?
      <>
        <span>Your players have no stats yet!</span>
      </> : 
      <>
      {marqueeList()}
      </>
  )
}

export default MarqueeData
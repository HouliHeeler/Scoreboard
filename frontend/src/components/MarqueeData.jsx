import { useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPlayers, reset } from '../features/players/playerSlice'

function MarqueeData({scores}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const {user} = useSelector((state) => state.auth)
  const {players, isError, message} = useSelector((state) => state.players)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    // if(!user) {
    //   navigate('/login')
    // }

    dispatch(getPlayers())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])

  //Return favourite players and respective teams
  const text = players.map(player => player['text'])
  const playerNames = text.map(player => player.split("-")[0].trim())
  const team = text.map(text => text.split("-")[1].trim())

  //Filters out any games that do not include favourite players, games that haven't started, and gets the gameID's
  const favPlayerGames = scores.filter(game => team.includes(game.teams.visitors["name"]) || team.includes(game.teams.home["name"]))
  const gamesStarted = favPlayerGames.filter(game => game.status.long !== 'Scheduled')

  const [stats, setStats] = useState([])

  //Filters out favourite player stats from games fetched by getStats
  const individualStats = stats.filter(stats => playerNames.includes(`${stats.player.firstname} ${stats.player.lastname}`))

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
          setStats(prevStats => [...prevStats, data.response]);
          console.log('getStats called')
        })
        .catch(() => {
          console.log("error");
        });
  }

  //Sets a ten minute timer between getStats calls to limit API calls
  const [wait, setWait] = useState(false)

  if(gamesStarted.length > 0 || wait === false) {
    gamesStarted.map(game => getStats(game.id))
    setWait(true)
    setInterval(() => {
      setWait(false)
    }, 600000)
  }

  function marqueeList() {
      return (
          individualStats.map((item, idx) => (
              <span key={idx} style={{margin: '20px'}}>{item.player.firstname} {item.player.lastname} - {item.points} Points, {item.totReb} Rebounds, {item.assists} Assists, {item.steals} Steals, {item.blocks} Blocks, {item.turnovers} Turnovers</span>
          ))
      )
  }

  return (
    stats.length === 0 ?
      <>
        <span>Your players have no stats yet!</span>
      </> : 
      <>
      {marqueeList()}
      </>
  )
}

export default MarqueeData
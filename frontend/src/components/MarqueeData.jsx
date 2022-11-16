import { useSelector, useDispatch} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getGoals, reset } from '../features/goals/goalSlice'

function MarqueeData({scores}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {goals, isError, message} = useSelector((state) => state.goals)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  //Return favourite players and respective teams
  const text = goals.map(player => player['text'])
  const playerNames = text.map(player => player.split("-")[0].trim())
  const team = text.map(text => text.split("-")[1].trim())

  //Filters out any games that do not include favourite players and gets the gameID's
  const favPlayerGames = scores.filter(game => team.includes(game.teams.visitors["name"]) || team.includes(game.teams.home["name"]))
  const gamesStarted = favPlayerGames.filter(game => game.status.long !== 'Scheduled')

  const [stats, setStats] = useState([])

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

  if(gamesStarted.length > 0) {
    gamesStarted.map(game => getStats(game.id))
  }

  function marqueeList() {
      return (
          individualStats.map(item => (
              <span style={{margin: '20px'}}>`${item.player.firstname} ${item.player.lastname} ${item.game.points} Points ${item.game.totReb} Rebounds ${item.game.assists} Assists` ${item.game.steals} Steals ${item.game.blocks} Blocks ${item.game.turnovers} Turnovers</span>
          ))
      )
  }

  return (
    <>
    {stats.length === 0 ?
      <span>Your players have no stats yet!</span> : 
      {marqueeList}}
    </>
  )
}

export default MarqueeData
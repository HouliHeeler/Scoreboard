import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import PlayerForm from '../components/PlayerForm'
import PlayerItem from '../components/PlayerItem'
import Spinner from '../components/Spinner'
import { getPlayers, reset } from '../features/players/playerSlice'


function Dashboard({colour}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {players, isLoading, isError, message} = useSelector((state) => state.players)

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

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='container--body'>
      <section className='heading'>
        <h2>Favourite Players</h2>
      </section>
      <PlayerForm colour={colour} />
      <section className='content'>
        {players.length > 0 ? (
          <div className='players'>
            {players.map((player) => (
              <PlayerItem key={player._id} player={player} />
            ))}
          </div>
        ) : (<h3>You Have No Favourite Players</h3>)}
      </section>
    </div>
  )
}

export default Dashboard
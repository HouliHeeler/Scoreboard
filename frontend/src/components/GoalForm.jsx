import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'
import {toast} from 'react-toastify'
import {teamCodes} from '../app/constants'

function GoalForm() {

    const dispatch = useDispatch()

    //Create array of selected favourite players to filter down API list

    const {goals} = useSelector((state) => state.goals)
    const goalsArray = goals.map(item => item['text'])
                            .map(item => item.split(" ")
                                             .reverse()
                                             .join(', '))

    //Populate list of NBA Players for User to select favourite from

    const [nbaPlayers, setNbaPlayers] = useState(() => {
      const saved = localStorage.getItem('players')
      const initialValue = JSON.parse(saved)
      return initialValue || []
    })

    function getNbaPlayers() {
      fetch("https://data.nba.net/prod/v1/2022/players.json")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("ERROR (response not ok)");
      })
      .then((data) => {
        setNbaPlayers(data.league.standard)
        localStorage.setItem("players", JSON.stringify(data.league.standard));
      })
      .catch(() => {
        console.log("error");
      });
    }

    useEffect(() => {
      if(localStorage.getItem('players') === null)
      getNbaPlayers()
    }, [])

    //Select Favourite Player

    const [favouritePlayer, setFavouritePlayer] = useState('Please Select Favourite Player')

    const onChange = (e) => {
      setFavouritePlayer(e.target.value)
  }

    const onSubmit = function(e) {
        e.preventDefault()

        if(favouritePlayer === 'Please Select Favourite Player') {
          toast.error('Be Better Than That')
        }else {
          setFavouritePlayer('Please Select Favourite Player')
          dispatch(createGoal({favouritePlayer}))
        }
    }

    console.log(teamCodes[1610612737])

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <select
                        className='form-control'
                        type="text"
                        id='favouritePlayer'
                        name={favouritePlayer}
                        value={favouritePlayer}
                        placeholder="Select Favourite Player"
                        onChange={onChange}
                    >
                        <option>Please Select Favourite Player</option>
                        {nbaPlayers.filter(name => name.temporaryDisplayName)
                                   .filter(name => !goalsArray.includes(name.temporaryDisplayName))
                                   .map((option, idx) => (
                                      <option key={idx}>{option.firstName} {option.lastName} - {teamCodes[option.teamId]}</option>
                        ))}
                    </select>
                </div>
                <div className='form-group'>
                  <button className='btn btn-block' type='submit'>
                    Add Favourite
                  </button>
                </div>
            </form>
        </section>
    )
}

export default GoalForm
import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'
// import { nbaPlayers } from '../app/constants'

function GoalForm() {

    const dispatch = useDispatch()

    //Populate list of NBA Players for User to select favourite from

    const [nbaPlayers, setNbaPlayers] = useState([])

    function getNbaPlayers() {
        fetch("https://data.nba.net/prod/v1/2022/players.json")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("ERROR (response not ok)");
          })
          .then((data) => {
            setNbaPlayers(data.league.standard);
          })
          .catch(() => {
            console.log("error");
          });
    }

    useEffect(getNbaPlayers, [])

    //Select Favourite Player

    const [favouritePlayer, setFavouritePlayer] = useState('Achiuwa, Precious')

    const onChange = (e) => {
      setFavouritePlayer(e.target.value)
  }

    const onSubmit = function(e) {
        e.preventDefault()

        dispatch(createGoal({favouritePlayer}))
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor='text'>Favourite Players</label>
                    <select
                        className='form-control'
                        type="text"
                        id='favouritePlayer'
                        name={favouritePlayer}
                        value={favouritePlayer}
                        placeholder="Select Favourite Player"
                        onChange={onChange}
                    >
                        {nbaPlayers.filter(name => name.temporaryDisplayName).map((option, idx) => (
                        <option key={idx}>{option.temporaryDisplayName}</option>
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
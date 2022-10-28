import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'
import { nbaPlayers } from '../app/constants'

function GoalForm() {

    const dispatch = useDispatch()

    const [favouritePlayer, setFavouritePlayer] = useState('Ja Morant')

    const onChange = (e) => {
      setFavouritePlayer(e.target.value)
  }

    const onSubmit = function(e) {
        e.preventDefault()

        dispatch(createGoal({favouritePlayer}))
        console.log(favouritePlayer, typeof favouritePlayer)
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
                        {nbaPlayers.map((option, idx) => (
                        <option key={idx}>{option}</option>
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
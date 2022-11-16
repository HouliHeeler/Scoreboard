import {useDispatch} from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'
import {nbaColours} from '../app/constants'

function GoalItem({ goal }) {

    const dispatch = useDispatch()

    //Get colours and names from goal

    const favTeam = goal['text'].split("-")[1].trim().split(" ").join("")
    const playerName = goal['text'].split("-")[0].trim()
    const teamName = goal['text'].split("-")[1].trim()
    const favColours = Object.values(nbaColours.find(el => el[favTeam]))
    const favColourHome = favColours[0][0]
    const favColourAway = favColours[0][1]

    //Style favouritePlayer cards
    const playerStyle = {backgroundColor: favColourHome, boxShadow: `3px 3px ${favColourAway}`}

    return (
      <div className="goal" style={playerStyle}>
        <h2>
            {playerName}
        </h2>
        <h2>
            {teamName}
        </h2>
        <button 
            onClick={() => dispatch(deleteGoal(goal._id))}
            className="close" 
            >
            X
            </button>
      </div>
    )
}

export default GoalItem
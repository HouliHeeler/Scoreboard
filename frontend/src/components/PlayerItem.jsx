import {useDispatch} from 'react-redux'
import {deletePlayer} from '../features/players/playerSlice'
import {nbaColours} from '../app/constants'

function PlayerItem({ player }) {

    const dispatch = useDispatch()

    //Get colours and names from player

    const favTeam = player['text'].split("-")[1].trim().split(" ").join("")
    const playerName = player['text'].split("-")[0].trim()
    const teamName = player['text'].split("-")[1].trim()
    const favColours = Object.values(nbaColours.find(el => el[favTeam]))
    const favColourHome = favColours[0][0]
    const favColourAway = favColours[0][1]

    //Style favouritePlayer cards
    const playerStyle = {backgroundColor: favColourHome, boxShadow: `3px 3px ${favColourAway}`}

    return (
      <div className="player" style={playerStyle}>
        <h2>
            {playerName}
        </h2>
        <h2>
            {teamName}
        </h2>
        <button 
            onClick={() => dispatch(deletePlayer(player._id))}
            className="close" 
            >
            X
        </button>
      </div>
    )
}

export default PlayerItem
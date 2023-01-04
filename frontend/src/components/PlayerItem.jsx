import {useDispatch} from 'react-redux'
import {deletePlayer} from '../features/players/playerSlice'
import {nbaColours} from '../app/constants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSubtract } from '@fortawesome/free-solid-svg-icons'

function PlayerItem({ player }) {

    const dispatch = useDispatch()

    //Get colours and names from player

    const splitText = player['text'].split("-")
    const favTeam = splitText[splitText.length - 1].trim().split(" ").join("")
    let playerName
    if(splitText.length > 2) {
      playerName = (`${splitText[0]}-${splitText[1]}`).trim()
    }else {
      playerName = splitText[0].trim()
    }
    const teamName = splitText[splitText.length - 1].trim()
    const favColours = Object.values(nbaColours.find(el => el[favTeam]))
    const favColourHome = favColours[0][0]

    const playerStyle = {paddingLeft: '10px', backgroundColor: favColourHome, fontSize: '1rem'}

    return (
      <div className="player--statline">
          <ul style={playerStyle}>
              <FontAwesomeIcon icon={faSubtract} 
                               className='close' 
                               onClick={() => dispatch(deletePlayer(player._id))}
                               />
              <li>{playerName}</li>
              <li>{teamName}</li>
          </ul>
      </div>
    )
}

export default PlayerItem
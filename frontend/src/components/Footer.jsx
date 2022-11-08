import {useSelector} from 'react-redux'
import {nbaColours} from '../app/constants'

function Footer() {

  const {user} = useSelector((state) => state.auth)

  //Find colours based on chosen team

  const favTeam = user.favouriteTeam.split(" ").join("")
  const favColours = Object.values(nbaColours.find(el => el[favTeam]))
  const favColourHome = favColours[0][0]

  //Style based on favourite team

  const teamStyle ={ backgroundColor: favColourHome }

  return (
    <div className="footer" style={teamStyle}>Footer</div>
  )
}

export default Footer
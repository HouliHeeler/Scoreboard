import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {nbaColours, nbaTeams} from '../app/constants'
import Dropdown from 'react-dropdown';

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()  
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  //Find colours based on chosen team

  const favTeam = user.favouriteTeam.split(" ").join("")
  const favColours = Object.values(nbaColours.find(el => el[favTeam]))
  const favColourHome = favColours[0][0]

  //Style based on favourite team

  const teamStyle ={ backgroundColor: favColourHome }

  //Dropdown Menu

  const options = [...nbaTeams]
  const defaultOption = user.favouriteTeam;

  return (
    <header className='header' style={teamStyle}>
        <div className='logo'>
            <ul>
                <li>
                    <Link to="/">Scoreboard</Link>
                </li>
                <li>
                    <Link to="/favouriteplayers">Favourite Players</Link>
                </li>
                <li>
                <Link to="/standings">Standings</Link>
                </li>
            </ul>
        </div>
        <ul>
            {user ? 
            (<li>
                <Dropdown options={options} value={defaultOption} placeholder="Select an option" />
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt />Logout
                </button>
            </li>) : 
            (<>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt />Login
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser />Register
                    </Link>
                </li>
            </>)}
        </ul>
    </header>
  )
}

export default Header
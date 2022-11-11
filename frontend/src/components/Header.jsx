import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {nbaTeams} from '../app/constants'
import Dropdown from 'react-dropdown';

function Header({colour, handleChange, team, colourAway}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()  
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const teamStyle = {backgroundColor: colour, color: colourAway}

  //Dropdown Menu

  const options = [...nbaTeams]
  const defaultOption = team

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
                <Dropdown onChange={handleChange} options={options} value={defaultOption} />
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
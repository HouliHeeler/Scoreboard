import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {nbaColours} from '../app/constants'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()  
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const favTeam = user.favouriteTeam.split(" ").join("")
  const favColours = nbaColours.find(el => el[favTeam])
  console.log(favColours.home)

  return (
    <header className='header'>
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
                <button className='btn' onClick={onLogout}>
                    <h4>{user.favouriteTeam}</h4>
                </button>
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
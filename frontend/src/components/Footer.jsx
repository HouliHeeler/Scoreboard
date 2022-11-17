import {ReactComponent as Logo} from '../app/logo/default-monochrome-white.svg'
import {FaSignOutAlt} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

function Footer({colour}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)  

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  //Style based on chosen team

  const teamStyle ={ backgroundColor: colour }

  return (
    <div className={user ? "footer" : "footer--solo"} style={teamStyle}>
      <Logo className='logo' />
      {user &&
        (<button className='btn--footer' onClick={onLogout}>
          <FaSignOutAlt />Logout
        </button>)
      }
      
    </div>
  )
}

export default Footer
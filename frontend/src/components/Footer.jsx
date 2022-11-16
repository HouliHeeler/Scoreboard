import {ReactComponent as Logo} from '../app/logo/default-monochrome-white.svg'

function Footer({colour}) {

  //Style based on chosen team

  const teamStyle ={ backgroundColor: colour }

  return (
    <div className="footer" style={teamStyle}>
      <Logo className='logo' />
    </div>
  )
}

export default Footer
function Footer({colour, colourAway}) {

  //Style based on chosen team

  const teamStyle ={ backgroundColor: colour, color: colourAway }

  return (
    <div className="footer" style={teamStyle}>Footer</div>
  )
}

export default Footer
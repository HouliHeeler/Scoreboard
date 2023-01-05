import {useState} from 'react'

function Standings({colour, colourAway, currentDate}) {

    //Pull standings data from API

    const [standingsData, setStandingsData] = useState(() => {
      const saved = localStorage.getItem('standings')
      const initialValue = JSON.parse(saved)
      return initialValue || []
    })

    //Only call Standings API if there is nothing in localStorage or the date has changed

    const parsedDate = JSON.parse(localStorage.getItem('standingsUpdated'))

    if(standingsData === [] || parsedDate !== currentDate) {
      localStorage.setItem('standingsUpdated', JSON.stringify(currentDate))
      getStandings()
    }

    async function getStandings() {
        await fetch('https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '81f0f8a38bmsh024375d5af83615p170190jsnee4713d76fa2',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("ERROR (response not ok)");
          })
          .then((data) => {
            setStandingsData(data.response);
            localStorage.setItem('standings', JSON.stringify(data.response))
            localStorage.setItem('standingsUpdated', JSON.stringify(currentDate))
          })
          .catch(() => {
            console.log("error");
          });
    }

    // //Set up formatting for standings layout

    const [standingsFormat, setStandingsFormat] = useState(true)

    function conference() {
        setStandingsFormat(false)
    }

    function division() {
        setStandingsFormat(true)
    }

    function conferenceStandings(conference) {
        let conf;
        conference === 'Eastern' ? conf = 'east' : conf = 'west'
        return (
            <section className="standings--division" style={teamStyle}>
                <h2>{conference} Conference</h2>
                <div className='standings--grid'>
                {allStandings(conf, 'conference')}
                </div>
            </section>
        )
    }

    function divisionStandings(conference, divOne, divTwo, divThree) {
        return (
            <section className='conference--container'>
                <h2>{conference} Conference</h2>
                {getDivision(divOne)}
                {getDivision(divTwo)}
                {getDivision(divThree)}
            </section>
        )
    }

    function getDivision(division) {
        return (
            <div className='standings--division' style={teamStyle}>
                <h3>{division} Division</h3>
                <div className="standings--grid">
                {allStandings(division, 'division')}
                </div>
            </div>  
        )
    }

    const headerArray = ['Team', 'Win', 'Loss', 'Pct', 'L10', 'Streak']

    function allStandings(division, filter) {
        return (
            headerArray.map((heading, idx) => (
                <div key={idx} className="standings--column">
                    <div className="standings--header">{heading}</div>
                    {standingsColumn(heading, division, filter)}
                </div>
            ))
        )
    }

    //Build and deploy a process of accessing the Standings API and calling data

    function standingsColumn(header, division, filter) {
        let firstEntry;
        let secondEntry;
        let thirdEntry;
        let winStreak;
        switch (header) {
            case 'Team':
              firstEntry = "team";
              secondEntry = 'name'
              break;
            case 'Win':
              firstEntry = "win";
              secondEntry = 'total'
              break;
            case 'Loss':
              firstEntry = "loss";
              secondEntry = 'total'
              break;
            case 'Pct':
              firstEntry = "win";
              secondEntry = "percentage"  
              break;
            case 'L10':
              firstEntry = "win";
              secondEntry = "lastTen"
              thirdEntry = "loss"
              break;
            case 'Streak':
              firstEntry = "streak";
              winStreak = "winStreak"
              break;
            default:
              firstEntry = "No value found";
          } 
        return (
            <div>
                {standingsData.filter(team => team[filter]["name"] === division.toLowerCase())
                              .sort((a,b) => b['win']['percentage'] - a['win']['percentage'])
                              .map((team, idx) => (
                                <div style={{borderBottom: '1px solid black'}} key={idx}>
                                    {(() => {
                                        if (team[winStreak] === false) {
                                          return (
                                            `L${team[firstEntry]}`
                                          )
                                        } else if (winStreak) {
                                          return (
                                            `W${team[firstEntry]}`
                                          )
                                        } else if (thirdEntry) {
                                          return (
                                            `${team[firstEntry][secondEntry]}-${team[thirdEntry][secondEntry]}`
                                          )
                                        } else if (secondEntry) {
                                          return (
                                            team[firstEntry][secondEntry]
                                          )
                                        } else {
                                          return (
                                            team[firstEntry]
                                          )
                                        }
                                    })()}
                                </div>
                ))}
            </div>
        )
    }

    //Style standings
    const teamStyle ={ backgroundColor: colour, boxShadow: `4px 4px ${colourAway}`}

    return ( 
      <div className='container--body'>
          <div className='standings--header'>
              <h5 onClick={conference}>Conference</h5>
              <h1>Standings</h1>
              <h5 onClick={division}>Division</h5>
          </div>
          {standingsFormat ? <div>
              {divisionStandings('Eastern', 'Atlantic', 'Central', 'Southeast')}
              {divisionStandings('Western', 'Northwest', 'Pacific', 'Southwest')}
          </div> :
          <div>
              {conferenceStandings('Eastern')}
              {conferenceStandings('Western')}    
          </div>}
      </div>
    )
}

export default Standings
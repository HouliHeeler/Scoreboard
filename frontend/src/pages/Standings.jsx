import {useState, useEffect} from 'react'
import Spinner from '../components/Spinner'

function Standings() {

    const [isLoading, setIsLoading] = useState(false)

    //Pull standings data from API

    const [standingsData, setStandingsData] = useState([])

    function getStandings() {
        fetch('https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022', {
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
          })
          .then(setIsLoading(false))
          .catch(() => {
            console.log("error");
          });
    }

    useEffect(getStandings, [])

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
            <section className="standings--division">
                <h2>{conference} Conference</h2>
                <div className='standings--grid'>
                {allStandings(conf, 'conference')}
                </div>
            </section>
        )
    }

    function divisionStandings(conference, divOne, divTwo, divThree) {
        return (
            <section>
                <h2>{conference} Conference</h2>
                {getDivision(divOne)}
                {getDivision(divTwo)}
                {getDivision(divThree)}
            </section>
        )
    }

    function getDivision(division) {
        return (
            <div className='standings--division'>
                <h3>{division} Division</h3>
                <div className="standings--grid">
                {allStandings(division, 'division')}
                </div>
            </div>  
        )
    }

    const headerArray = ['Team', 'Wins', 'Losses', 'Pct', 'Last Ten', 'Streak']

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
            case 'Wins':
              firstEntry = "win";
              secondEntry = 'total'
              break;
            case 'Losses':
              firstEntry = "loss";
              secondEntry = 'total'
              break;
            case 'Pct':
              firstEntry = "win";
              secondEntry = "percentage"  
              break;
            case 'Last Ten':
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
                                <div style={{backgroundColor: idx%2===0 ? '#D3D3D3' : 'none'}} key={idx} className="standings--box">
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

    return (
        isLoading ? <Spinner /> : 
        <>
            <div>
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
        </>
    )
}

export default Standings
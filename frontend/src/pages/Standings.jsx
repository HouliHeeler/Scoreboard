import {useState, useEffect} from 'react'
import Spinner from '../components/Spinner'

function Standings() {

    const [isLoading, setIsLoading] = useState(true)

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

    console.log(standingsData)

    // //Set up formatting for standings layout

    function getConference(conference, divOne, divTwo, divThree) {
        return (
            <section className="standings--conference">
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
                {allStandings(division)}
                </div>
            </div>  
        )
    }

    const headerArray = ['Team', 'Wins', 'Losses', 'Pct', 'Games Back', 'Last Ten', 'Streak']

    function allStandings(division) {
        return (
            headerArray.map(heading => (
                <div key={heading} className="standings--column">
                    <div className="standings--header">{heading}</div>
                    {standingsColumn(heading, division)}
                </div>
            ))
        )
    }

    function standingsColumn(header, division) {
        let firstEntry;
        let secondEntry;
        let thirdEntry;
        let fourthEntry;
        let winOrLoss;
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
            case 'Games Back':
              firstEntry = "gamesBehind";
              break;
            case 'Last Ten':
              firstEntry = "win";
              secondEntry = 'lastTen'
              thirdEntry = 'loss'
              fourthEntry = 'lastTen'
              break;
            case 'Streak':
              firstEntry = "streak";
              winOrLoss = 'winStreak'
              break;
            default:
              firstEntry = "";
          } 
        return (
            <div>
                {standingsData.filter(team => team.division.name === division.toLowerCase()).map((team, idx) => (
                    <div key={idx} className="standings--box">{secondEntry ? team[firstEntry][secondEntry] : team[firstEntry]}</div>
                ))}
            </div>
        )
    }

    return (
        isLoading ? <Spinner /> : 
        <>
            <div>
                <h1>Standings</h1>
                <div>
                    {getConference('Eastern', 'Atlantic', 'Central', 'Southeast')}
                    {getConference('Western', 'Northwest', 'Pacific', 'Southwest')}
                </div>
            </div>
        </>
    )
}

export default Standings
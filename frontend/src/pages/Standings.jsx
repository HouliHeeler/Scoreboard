import {useState, useEffect} from 'react'
import Spinner from '../components/Spinner'

function Standings() {

    // const [isLoading, setIsLoading] = useState(true)

    // //Pull standings data from API

    // const [standingsData, setStandingsData] = useState([])

    // function getStandings() {
    //     fetch('https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022', {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': '81f0f8a38bmsh024375d5af83615p170190jsnee4713d76fa2',
    //             'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    //         }
    //     })
    //       .then((response) => {
    //         if (response.ok) {
    //           return response.json();
    //         }
    //         throw new Error("ERROR (response not ok)");
    //       })
    //       .then((data) => {
    //         setStandingsData(data.response);
    //       })
    //       .then(setIsLoading(false))
    //       .catch(() => {
    //         console.log("error");
    //       });
    // }

    // useEffect(getStandings, [])

    // //Set up formatting for standings layout

    // function getConference(conference, divOne, divTwo, divThree) {
    //     return (
    //         <section>
    //             <h2>{conference} Conference</h2>
    //             {getDivision(divOne)}
    //             {getDivision(divTwo)}
    //             {getDivision(divThree)}
    //         </section>
    //     )
    // }

    // function getDivision(division) {
    //     return (
    //         <div>
    //             <h4>{division} Division</h4>
    //             {standingsData.filter(team => team.division.name === division.toLowerCase()).map((team, idx) => (
    //             <span key={idx}>{team.team.name} {team.win.total} {team.loss.total}</span>
    //             ))}
    //         </div>
    //     )
    // }

    // console.log(standingsData)

    return (
        // isLoading ? <Spinner /> : 
        <>
            <div>
                <h1>Standings</h1>
                {/* {getConference('Eastern', 'Atlantic', 'Central', 'Southeast')} */}
                {/* {getConference('Western', 'Northwest', 'Pacific', 'Southwest')} */}
            </div>
        </>
    )
}

export default Standings
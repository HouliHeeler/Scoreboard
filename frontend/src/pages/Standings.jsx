import {useState, useEffect} from 'react'

function Standings() {

    //Pull standings data from API

    const [standingsData, setStandingsData] = useState({})

    function getStandings() {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '81f0f8a38bmsh024375d5af83615p170190jsnee4713d76fa2',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };
        
        fetch('https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022', options)
            .then(response => response.json())
            .then(response => setStandingsData(response.response))
            .catch(err => console.error(err));
    }

    useEffect(getStandings, [])

    console.log(standingsData)

    return (
        <>
            <div>
                <h1>New Standings</h1>
                <section>
                    <h2>Eastern Conference</h2>
                    <div>
                        <h4>Atlantic Division</h4>
                        {standingsData.filter(team => team.division.name === 'atlantic').map((team, idx) => (
                        <span key={idx}>{team.team.name} {team.win.total} {team.loss.total}</span>
                        ))}
                    </div>
                    <div>
                        <h4>Central Division</h4>
                        {standingsData.filter(team => team.division.name === 'central').map((team, idx) => (
                        <span key={idx}>{team.team.name} {team.win.total} {team.loss.total}</span>
                        ))}
                    </div>
                    <div>
                        <h4>Southeast Division</h4>
                        {standingsData.filter(team => team.division.name === 'southeast').map((team, idx) => (
                        <span key={idx}>{team.team.name} {team.win.total} {team.loss.total}</span>
                        ))}
                    </div>
                </section>
                <section>
                    <h2>Western Conference</h2>
                    <div>
                        <h4>Northwest Division</h4>
                        {standingsData.filter(team => team.division.name === 'northwest').map((team, idx) => (
                        <span key={idx}>{team.team.name} {team.win.total} {team.loss.total}</span>
                        ))}
                    </div>
                    <div>
                        <h4>Pacific Division</h4>
                        {standingsData.filter(team => team.division.name === 'pacific').map((team, idx) => (
                        <span key={idx}>{team.team.name} {team.win.total} {team.loss.total}</span>
                        ))}
                    </div>
                    <div>
                        <h4>Southwest Division</h4>
                        {standingsData.filter(team => team.division.name === 'southwest').map((team, idx) => (
                        <span key={idx}>{team.team.name} {team.win.total} {team.loss.total}</span>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}

export default Standings
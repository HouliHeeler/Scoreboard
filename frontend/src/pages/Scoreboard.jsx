// import {useState, useEffect} from 'react'
import Marquee from 'react-fast-marquee'
// import Spinner from '../components/Spinner'

function Scoreboard() {
    //Return today's date in format required for API call
    // function getDate() {
    //     let newDate = new Date()
    //     let date = newDate.getDate();
    //     let month = newDate.getMonth() + 1;
    //     if(month < 10) {
    //       month = '0' + month
    //     }
    //     let year = newDate.getFullYear();
    //     return `${year}-${month}-${date}`
    // }

    // const currentDate = getDate()

    //Pull live scores from API using current date

    // const [scores, setScores] = useState([])

    // const [isLoading, setIsLoading] = useState(true)

    // function getScores() {
    //     fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${currentDate}`, {
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
    //         setScores(data.response);
    //       })
    //       .then(setIsLoading(false))
    //       .catch(() => {
    //         console.log("error");
    //       });
    // }

    // useEffect(getScores, [currentDate])

    // console.log(scores)

    const nbaScores = [
        {
            teamOne: 'Rockets',
            teamTwo: 'Raptors',
            scoreOne: 121,
            scoreTwo: 109,
            timeLeft: '03:08',
            gameStatus: 'Q3',
        },
        {
            teamOne: 'Sixers',
            teamTwo: 'Lakers',
            scoreOne: 108,
            scoreTwo: 113,
            timeLeft: '01:25',
            gameStatus: 'Q4',
        },
        {
            teamOne: 'Thunder',
            teamTwo: 'Blazers',
            scoreOne: 142,
            scoreTwo: 114,
            timeLeft: '00:00',
            gameStatus: 'Final',
        },
    ]

    function scoreboards() {
        return (
            nbaScores.map(item => (
                <div className='boxscore'>
                    <div className='boxscore--teamOne'>
                        <img alt='Team One Logo' src="https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Hornets_de_Charlotte_logo.svg/1200px-Hornets_de_Charlotte_logo.svg.png"></img>
                        <h3>{item.teamOne}</h3>
                    </div>
                    <div className='boxscore--scoretime'>
                    <span >{item.gameStatus}{item.gameStatus !== 'Final' && `-${item.timeLeft}`}</span>
                        <h3 className='boxscore--score'>{item.scoreOne}-{item.scoreTwo}</h3>
                    </div>
                    <div className='boxscore--teamTwo'>
                        <img alt='Team Two Logo' src="https://upload.wikimedia.org/wikipedia/fr/thumb/f/f3/Hornets_de_Charlotte_logo.svg/1200px-Hornets_de_Charlotte_logo.svg.png"></img>
                        <h3 >{item.teamTwo}</h3>
                    </div>
                </div>
            ))
        )
    }

    return (
        // isLoading ? <Spinner /> :
        <>
            <Marquee 
                style={{border:'2px solid black'}}
                pauseOnHover='true'>
                <span style={{margin:'20px'}}><strong>Ja Morant</strong> - 26 Points 8 Rebounds 11 Assists 2 Steals 1 Block</span>
                <span style={{margin: '20px'}}><strong>Luka Doncic</strong> - 41 Points 12 Rebounds 10 Assists 0 Steals 1 Block</span>
            </Marquee>
            <div className='boxscore--all'>
            {scoreboards()}
            </div>
        </>
    ) 
}

export default Scoreboard
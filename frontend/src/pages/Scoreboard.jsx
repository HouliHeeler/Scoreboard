import {useState, useEffect} from 'react'
import Marquee from 'react-fast-marquee'
import Spinner from '../components/Spinner'

function Scoreboard() {
    //Return today's date in format required for API call
    function getDate() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        if(month < 10) {
          month = '0' + month
        }
        let year = newDate.getFullYear();
        return `${year}-${month}-${date}`
    }

    const [scores, setScores] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    function getScores() {
        fetch(`https://api-nba-v1.p.rapidapi.com/games?date=${getDate}`, {
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
            setScores(data.response);
          })
          .then(setIsLoading(false))
          .catch(() => {
            console.log("error");
          });
    }

    useEffect(getScores, [])

    return (
        isLoading ? <Spinner /> :
        <>
            <Marquee 
                style={{border:'2px solid black'}}
                pauseOnHover='true'>
                <span style={{margin:'20px'}}><strong>Ja Morant</strong> - 26 Points 8 Rebounds 11 Assists 2 Steals 1 Block</span>
                <span style={{margin: '20px'}}><strong>Luka Doncic</strong> - 41 Points 12 Rebounds 10 Assists 0 Steals 1 Block</span>
            </Marquee>
            <div>
                {scores}
            </div>
        </>
    ) 
}

export default Scoreboard
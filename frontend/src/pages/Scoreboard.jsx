import Marquee from 'react-fast-marquee'

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

    return (
        <Marquee 
            style={{border:'2px solid black'}}
            pauseOnHover='true'>
            <span style={{margin:'20px'}}><strong>Ja Morant</strong> - 26 Points 8 Rebounds 11 Assists 2 Steals 1 Block</span>
            <span style={{margin: '20px'}}><strong>Luka Doncic</strong> - 41 Points 12 Rebounds 10 Assists 0 Steals 1 Block</span>
        </Marquee>
    ) 
}

export default Scoreboard
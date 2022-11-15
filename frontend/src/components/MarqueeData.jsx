import { useSelector} from 'react-redux'

function MarqueeData() {

    const {goals} = useSelector((state) => state.goals)

    //Return favourite players and respective teams
    const text = goals.map(player => player['text'])
    // const team = text.map(text => text.split("-")[1].trim())
    const playerAPI = text.map(text => text.split("-")[0].trim().split(" ").reverse().join(", "))

    // const favPlayerGames = scores.filter(game => team.includes(game.teams.visitors["name"]) || team.includes(game.teams.home["name"]))

    // const [stats, setStats] = useState([])

    // function getStats() {

    // }

    function marqueeList() {
        return (
            playerAPI.map(item => (
                <span style={{margin: '20px'}}>{item}</span>
            ))
        )
    }
  return (
    <>
    {marqueeList()}
    </>
  )
}

export default MarqueeData
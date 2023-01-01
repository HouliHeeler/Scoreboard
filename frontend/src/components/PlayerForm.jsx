import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Select from 'react-select'
import {createPlayer} from '../features/players/playerSlice'
import {toast} from 'react-toastify'
import {playerNames} from '../app/constants'

function PlayerForm({colour}) {

    const dispatch = useDispatch()

    //Create array of selected favourite players to filter down API list

    const {players} = useSelector((state) => state.players)
    const playersArray = players.map(item => item['text'])
                            .map(item => item.split("-")[0]
                                             .trim()
                                             .split(" ")
                                             .reverse()
                                             .join(', '))

    //Abandoned because the API was shut down, hard-coded player names into constants.js

    //Populate list of NBA Players for User to select favourite from

    // const [nbaPlayers, setNbaPlayers] = useState(() => {
    //   const saved = localStorage.getItem('players')
    //   const initialValue = JSON.parse(saved)
    //   return initialValue || []
    // })

    // function getNbaPlayers() {
    //   fetch("https://data.nba.net/prod/v1/2022/players.json")
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error("ERROR (response not ok)");
    //   })
    //   .then((data) => {
    //     setNbaPlayers(data.league.standard)
    //     localStorage.setItem("players", JSON.stringify(data.league.standard));
    //   })
    //   .catch(() => {
    //     console.log("error");
    //   });
    // }

    // useEffect(() => {
    //   if(localStorage.getItem('players') === null) {
    //     getNbaPlayers()
    //   }
    // }, [])

    //Select Favourite Player

    const unpickedPlayers = playerNames.filter(name => !playersArray.includes(name.temporaryDisplayName))
    const options = [
      {
       value: "Precious Achiuwa - Toronto Raptors",
       label: "Precious Achiuwa - Toronto Raptors"
      },
      {
       value: "Steven Adams - Memphis Grizzlies",
       label: "Steven Adams - Memphis Grizzlies"
      },
      {
       value: "Bam Adebayo - Miami Heat",
       label: "Bam Adebayo - Miami Heat"
      }]

    const [favouritePlayer, setFavouritePlayer] = useState('Please Select Favourite Player')

    const onChange = (e) => {
      setFavouritePlayer(e.value)
  }

    const onSubmit = function(e) {
        e.preventDefault()

        if(favouritePlayer === 'Please Select Favourite Player') {
          toast.error('Be Better Than That')
        }else {
          setFavouritePlayer('Please Select Favourite Player')
          dispatch(createPlayer({favouritePlayer}))
        }
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                  {/* <select
                        className='form-control'
                        type="text"
                        id='favouritePlayer'
                        name={favouritePlayer}
                        value={favouritePlayer}
                        placeholder="Select Favourite Player"
                        onChange={onChange}
                    >
                        <option>Please Select Favourite Player</option>
                        {nbaPlayers.filter(name => !playersArray.includes(name.temporaryDisplayName))
                                   .map((option, idx) => (
                                      <option key={idx}>{option.firstName} {option.lastName} - {option.teamName}</option>
                        ))}
                    </select> */}
                  <Select options={options} onChange={onChange}/>
                </div>
                <div className='form-group'>
                  <button className='btn btn-block' type='submit' style={{backgroundColor: colour}}>
                    Add Favourite
                  </button>
                </div>
            </form>
        </section>
    )
}

export default PlayerForm
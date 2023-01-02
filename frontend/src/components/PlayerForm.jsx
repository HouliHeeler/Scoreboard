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

    const unpickedPlayers = playerNames.filter(name => !playersArray.includes(name.displayName))
    const options = unpickedPlayers.map(item => ({value: `${item.firstName} ${item.lastName} - ${item.teamName}`, label: `${item.firstName} ${item.lastName} - ${item.teamName}`}))
    console.log(playersArray)
    console.log(unpickedPlayers)
    console.log(options)

    const [favouritePlayer, setFavouritePlayer] = useState('Select...')

    const onChange = (e) => {
      setFavouritePlayer(e.value)
  }

    const onSubmit = function(e) {
        e.preventDefault()

        if(favouritePlayer === 'Select...') {
          toast.error('Be Better Than That')
        }else {
          setFavouritePlayer('Select...')
          dispatch(createPlayer({favouritePlayer}))
        }
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
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
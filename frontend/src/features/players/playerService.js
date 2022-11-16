import axios from 'axios'

const API_URL = '/api/players/'

//Create New Players

const createPlayer = async(playerData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, playerData, config)

    return response.data
}

//Get User Players

const getPlayers = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete User Player

const deletePlayer = async(playerId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + playerId, config)

    return response.data
}

//Export CRUD functions

const playerService = {
    createPlayer,
    getPlayers,
    deletePlayer,
}

export default playerService
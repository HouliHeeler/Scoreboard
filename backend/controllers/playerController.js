const asyncHandler = require('express-async-handler')

const Player = require('../models/playerModel')

// @description  Read Players
// @route        GET /api/players
// @access       Private
const getPlayers = asyncHandler(async(req,res) => {
    const players = await Player.find({
        user: req.user.id,
    })

    res.status(200).json(players)
})

// @description  Set Player
// @route        POST /api/players
// @access       Private
const setPlayer = asyncHandler(async(req,res) => {
    if(!req.body.favouritePlayer) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const player = await Player.create({
        text: req.body.favouritePlayer,
        user: req.user.id,
    })

    res.status(200).json(player)
})

// @description  Update Player
// @route        PUT /api/players/:id
// @access       Private
const updatePlayer = asyncHandler(async(req,res) => {
    const player = await Player.findById(req.params.id)
    
    if(!player) {
        res.status(400)
        throw new Error('Player not found')
    }

    //Check for User
    if(!req.user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    //Ensure player user matches logged in user
    if(player.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    } )

    res.status(200).json(updatedPlayer)
})

// @description  Delete Player
// @route        DELETE /api/players/:id
// @access       Private
const deletePlayer = asyncHandler(async(req,res) => {
    const player = await Player.findById(req.params.id)

    if(!player) {
        res.status(400)
        throw new Error('Player not found')
    }

    //Check for User
    if(!req.user) {
        res.status(401)
        throw new Error('User Not Found')
    }

    //Ensure player user matches logged in user
    if(player.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await player.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getPlayers,
    setPlayer,
    updatePlayer,
    deletePlayer
}
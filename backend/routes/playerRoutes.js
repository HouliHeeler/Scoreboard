const express = require('express')
const router = express.Router()
const { 
    getPlayers,
    setPlayer, 
    updatePlayer, 
    deletePlayer 
} = require('../controllers/playerController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPlayers).post(protect, setPlayer)
router.route('/:id').put(protect, updatePlayer).delete(protect, deletePlayer)

module.exports = router
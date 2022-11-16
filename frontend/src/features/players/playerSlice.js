import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import playerService from './playerService'

const initialState = {
    players: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create New Player

export const createPlayer = createAsyncThunk(
    'players/create',
    async(playerData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await playerService.createPlayer(playerData, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
})

//Get User Players

export const getPlayers = createAsyncThunk(
    'players/getAll',
    async(_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await playerService.getPlayers(token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete User Players

export const deletePlayer = createAsyncThunk(
    'players/delete',
    async(_id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await playerService.deletePlayer(_id, token)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPlayer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPlayer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.players.push(action.payload)
            })
            .addCase(createPlayer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getPlayers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPlayers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.players = action.payload
            })
            .addCase(getPlayers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePlayer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePlayer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.players = state.players.filter((player) => player._id !== action.payload.id)
            })
            .addCase(deletePlayer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = playerSlice.actions
export default playerSlice.reducer
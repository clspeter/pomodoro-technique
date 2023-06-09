import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TimerState {
    session: number
    break: number
    timer: number
}

const initialState: TimerState = {
    session: 25,
    break: 5,
    timer: 25
}

export const timerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.break += 1
        },
        decrement: (state) => {
            state.break -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.break += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = timerSlice.actions

export default timerSlice.reducer
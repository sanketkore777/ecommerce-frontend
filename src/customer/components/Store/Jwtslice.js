import { createSlice } from "@reduxjs/toolkit";
const JwtSlice = createSlice({
    name: 'jwtToken',
    initialState: {
        jwtToken: '',
        userEmail: ''
    },
    reducers: {
        setToken(state, action) {
            return { jwtToken: action.payload[0], userEmail: action.payload[1] }
        },
        removeToken(state, action) {
            return { jwtToken: '', userEmail: '' }
        }
    }
})

export const { setToken, removeToken } = JwtSlice.actions
export default JwtSlice.reducer
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchVal",
    initialState: {
        val: ""
    },
    reducers: {
        setSearch(state, action) {
            console.log(action.payload, "searchhhhhhhhhh")
            return { val: action.payload }
        }
    }
})

export const { setSearch } = searchSlice.actions
export default searchSlice.reducer
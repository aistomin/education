import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Dude Lebowsky'},
    {id: '1', name: 'DaveGray'},
    {id: '2', name: 'Andrej Istomin'}
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { getRepositories } from "../endpoints";

const initState = {
    isLoadingRepositories: false,
    isFailedToLoad:false,
    totalAmount: 0,
    repositories: [],
    currentPage: 0,
}
export const loadRepositoriesWithParams = createAsyncThunk(
    'repositories/loadWithParams',
    async(params, {rejectedWithValue}) => {
        if (params.q.replace(' ', '').length < 1) return initState;
        try {
            const { page } = params;
            const { data } = await getRepositories({per_page: 20, ...params});

            return {
                repositories: data.items,
                totalAmount: data.total_count,
                currentPage: page,
            }
        }
        catch (e) {
            console.log(e);
        }
    }
);

 const repositoriesSlice = createSlice({
     name: 'repositories',
     initialState: initState,
     reducers: {
         reset(state) {
             state = initState;
         }
     },
     extraReducers: (builder) => {
         builder.addCase(loadRepositoriesWithParams.pending, (state, action) => {
            state.isLoadingRepositories = true;
            state.isFailedToLoad = false;

         })
         builder.addCase(loadRepositoriesWithParams.fulfilled, (state, action) => {
             const {repositories, totalAmount, currentPage} = action.payload;
             state.currentPage = currentPage;
             state.isLoadingRepositories = false;
             state.repositories = repositories;
             state.totalAmount = totalAmount;
         })
         builder.addCase(loadRepositoriesWithParams.rejected, (state, action) => {
             state.isLoadingRepositories = false;
             state.isFailedToLoad = true;
         })
     },

 });
export const { reset } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRepositories } from "../endpoints";

const initState = {
  isLoadingRepositories: false,
  isFailedToLoad: false,
  totalAmount: 0,
  repositories: [],
  currentPage: 0,
  errorMessage: '',
};
export const loadRepositoriesWithParams = createAsyncThunk(
  "repositories/loadWithParams",
  async (params, thunkAPI) => {
    if (params.q.replace(" ", "").length < 1) return initState;
    try {
      const { page, q, per_page } = params;
      const response = await getRepositories({ per_page, q,page });
      const {data} = response;
      if (response.status === 200) {
        return {
          repositories: data.items,
              totalAmount: data.total_count,
              currentPage: page
        };
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response?.data?.message || "Unknown error")
    }
  }
);

const repositoriesSlice = createSlice({
  name: "repositories",
  initialState: initState,
  reducers: {
    reset(state) {
      state.repositories = [];
      state.totalAmount = 0;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadRepositoriesWithParams.pending, (state) => {
      state.isLoadingRepositories = true;
      state.isFailedToLoad = false;
    });
    builder.addCase(loadRepositoriesWithParams.fulfilled, (state, action) => {
      const { repositories, totalAmount, currentPage } = action.payload;
      state.currentPage = currentPage;
      state.isLoadingRepositories = false;
      state.repositories = repositories;
      state.totalAmount = totalAmount;
      if (state.errorMessage.length > 0) {
        state.errorMessage = ''
      }
    });
    builder.addCase(loadRepositoriesWithParams.rejected, (state, action) => {
      state.errorMessage = action.payload;
      state.isLoadingRepositories = false;
      state.isFailedToLoad = true;
    });
  },
});
export const { reset } = repositoriesSlice.actions;
export default repositoriesSlice.reducer;

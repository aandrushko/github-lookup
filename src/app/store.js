import { configureStore} from "@reduxjs/toolkit";
import reposReducer from '../features/ReposSlice'

export const store = configureStore({
    reducer: {
        repositories: reposReducer,
    }
});

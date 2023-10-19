import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormSchema } from "../form-schema";

type ImageResponseState = {
    url: string;
    loading: boolean;
    error: boolean;
}

const initialState: ImageResponseState = {
    url: "",
    loading: false,
    error: false,
} 

const matrixSlice = createSlice({
    name: "theMatrix",
    initialState: initialState as ImageResponseState,
    reducers: {
        fetchStart: (state, _action: PayloadAction<FormSchema>) => {
            state.loading = true;
            state.error = false;
        },
        fetchSuccess: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = false;
            state.url = action.payload;
        },
        fetchError: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
});

export const { fetchSuccess, fetchStart, fetchError } = matrixSlice.actions;
export default matrixSlice.reducer;
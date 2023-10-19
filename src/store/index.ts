import { configureStore } from "@reduxjs/toolkit";
import matrixReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import { imageSaga } from "../sagas"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        matrix: matrixReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware) 
});

sagaMiddleware.run(imageSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const action = (type: string) => store.dispatch({ type })

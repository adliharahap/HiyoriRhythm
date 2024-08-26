import { configureStore } from '@reduxjs/toolkit';
import audioReducer from './slices/audioSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
    reducer: {
        audio: audioReducer,
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: { warnAfter: 128 }, serializableCheck: { warnAfter: 128 }}),
});

export default store;
import React, { createContext, useContext, useReducer } from "react";
import { initialState, mainReducer } from "./reducers";
export const StateContext = createContext();

export const StateProvider = props => {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    const value = { state, dispatch, user: props.user };
    return <StateContext.Provider value={value}>{props.children}</StateContext.Provider>;
};

export const useReduceState = () => useContext(StateContext);

export const firebase = require("./rnfirebase").default;
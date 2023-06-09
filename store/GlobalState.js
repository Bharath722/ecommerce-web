import React, { createContext, useReducer, useEffect } from "react"
import reducers from "./Reducers"
import { getData } from "../utils/fetchData"

export const ContextState = createContext()

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    modal: [],
    orders: [],
    users: [],
    categories: [],
  }

  const [state, dispatch] = useReducer(reducers, initialState)
  const { cart, auth } = state

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin) {
      getData("user/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin")
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        })
      })
    }
  }, [])

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartData"))

    if (cartData) dispatch({ type: "ADD_CART", payload: cartData })
  }, [])

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } })

        dispatch({ type: "ADD_ORDERS", payload: res.orders })
      })

      if (auth.user.role === "admin") {
        getData("user", auth.token).then((res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } })

          dispatch({ type: "ADD_USERS", payload: res.users })
        })
      }
    } else {
      dispatch({ type: "ADD_ORDERS", payload: [] })
      dispatch({ type: "ADD_USERS", payload: [] })
    }
  }, [auth.token])

  return (
    <ContextState.Provider value={{ state, dispatch }}>
      {children}
    </ContextState.Provider>
  )
}

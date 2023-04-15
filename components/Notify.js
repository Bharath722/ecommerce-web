import React, { useContext } from "react"
import { ContextState } from "../store/GlobalState"
import Loading from "./Loading"
import Toast from "./Toast"

const Notify = () => {
  const { state, dispatch } = useContext(ContextState)
  const { notify } = state

  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}

      {notify.success && (
        <Toast
          msg={{ msg: notify.success, title: "Success" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-success"
        />
      )}
    </>
  )
}

export default Notify

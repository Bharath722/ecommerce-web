import Head from "next/head"
import React, { useEffect } from "react"
import { useState, useContext } from "react"
import { ContextState } from "../../store/GlobalState"
import { postData } from "../../utils/fetchData"
import { useRouter } from "next/router"

const ItemsManager = () => {
  const initialState = {
    title: "",
    price: 0,
    description: "",
  }
  const [item, setItem] = useState(initialState)
  const { title, price, description } = item

  const { state, dispatch } = useContext(ContextState)
  const { auth } = state

  const router = useRouter()

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setItem({ ...item, [name]: value })
    dispatch({ type: "NOTIFY", payload: {} })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Not authorised" },
      })

    if (!title || !price || !description) {
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please enter all info" },
      })
    }
    dispatch({ type: "NOTIFY", payload: { loading: true } })

    const res = await postData("item", { ...item }, auth.token)
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } })
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } })
  }

  useEffect(() => {
    if (!router || auth.user) return
    if (!auth.user) router.push("/login")
  }, [auth, router])

  return (
    <div className="items_manager">
      <Head>
        <title>Items Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            className="d-block my-4 w-100 p-2"
            onChange={onChangeInput}
          />

          <div className="row">
            <div className="col-sm-6">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={price}
                placeholder="Price"
                className="d-block w-100 p-2"
                onChange={onChangeInput}
              />
            </div>
          </div>

          <textarea
            name="description"
            id="description"
            cols="30"
            rows="4"
            placeholder="Description"
            onChange={onChangeInput}
            className="d-block my-4 w-100 p-2"
            value={description}
          />

          <button type="submit" className="btn btn-info my-2 px-4">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default ItemsManager

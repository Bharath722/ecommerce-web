import Head from "next/head"
import React from "react"
import { useContext, useState, useEffect } from "react"
import { ContextState } from "../store/GlobalState"
import CartItem from "../components/CartItem"
import Link from "next/link"
import { getData, postData } from "../utils/fetchData"
import { useRouter } from "next/router"

const Cart = () => {
  const { state, dispatch } = useContext(ContextState)
  const { cart, auth, orders } = state

  const [total, setTotal] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity
      }, 0)

      setTotal(res)
    }

    getTotal()
  }, [cart])

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("cartData"))
    if (cartLocal && cartLocal.length > 0) {
      let newArr = []
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`item/${item._id}`)
          const { _id, title, images, price, inStock, sold } = res.product
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            })
          }
        }

        dispatch({ type: "ADD_CART", payload: newArr })
      }

      updateCart()
    }
  }, [])

  useEffect(() => {
    if (!router || auth.user) return
    if (!auth.user) router.push("/login")
  }, [auth, router])

  const handlePayment = async () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } })

    postData("order", { cart, total }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } })
      dispatch({ type: "ADD_CART", payload: [] })
      const newOrder = {
        ...res.newOrder,
        user: auth.user,
      }
      dispatch({ type: "ADD_ORDERS", payload: [...orders, newOrder] })
      dispatch({ type: "NOTIFY", payload: { success: res.msg } })
      return router.push("/")
    })
  }

  if (cart.length === 0) return <div className="d-flex mt-4">Empty cart</div>

  return (
    <div className="row mx-auto">
      <Head>
        <title>Cart Page</title>
      </Head>

      <div className="col-md-8 text-secondary table-responsive my-3">
        <h2 className="text-uppercase">Shopping Cart</h2>

        <table className="table my-3">
          <tbody>
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                dispatch={dispatch}
                cart={cart}
              />
            ))}
          </tbody>
        </table>
        <h3>
          Total: <span className="text-danger">₹ {total}</span>
        </h3>
      </div>

      <div className="col-md-4 my-3 text-right text-uppercase text-secondary">
        <Link href={auth.user ? "#!" : "/login"}>
          <a className="btn btn-success my-2" onClick={handlePayment}>
            Checkout
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Cart

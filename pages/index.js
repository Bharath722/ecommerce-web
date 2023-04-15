import Head from "next/head"
import React, { useContext } from "react"
import { useState, useEffect } from "react"
import { getData } from "../utils/fetchData"
import ProductItem from "../components/product/ProductItem"
import { useRouter } from "next/router"
import { ContextState } from "../store/GlobalState"

export const IMG =
  "https://d2d22nphq0yz8t.cloudfront.net/88e6cc4b-eaa1-4053-af65-563d88ba8b26/https://media.croma.com/image/upload/v1664009482/Croma%20Assets/Communication/Mobiles/Images/243461_0_tzq0y4.png/mxw_2736,f_auto"

const Home = (props) => {
  const [items, setItems] = useState(props.items)
  const router = useRouter()

  const { state } = useContext(ContextState)
  const { auth } = state

  useEffect(() => {
    if (!router || auth.user) return
    if (!auth.user) router.push("/login")
  }, [auth, router])

  useEffect(() => {
    setItems(props.items)
  }, [props.items])

  return (
    <div className="home_page">
      <Head>
        <title>Home Page</title>
      </Head>

      <div className="d-flex mt-2">
        {items.length === 0 ? (
          <h2>No Items</h2>
        ) : (
          items.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await getData("item")
  return {
    props: {
      items: res.items,
    },
  }
}

export default Home

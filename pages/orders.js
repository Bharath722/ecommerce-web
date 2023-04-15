import Head from "next/head"
import React from "react"
import { useContext } from "react"
import { ContextState } from "../store/GlobalState"

const Orders = () => {
  const { state } = useContext(ContextState)
  const { auth, orders } = state

  if (!auth.user) return null

  return (
    <div>
      <Head>
        <title>Orders</title>
      </Head>

      <section className="row text-secondary my-3">
        <div className="col-md-8">
          <h3 className="text-uppercase">Orders</h3>

          <div className="my-3 table-responsive">
            <table
              className="table-bordered table-hover w-100 text-uppercase"
              style={{ minWidth: "600px", cursor: "pointer" }}
            >
              <thead className="bg-light font-weight-bold">
                <tr>
                  <td className="p-2">id</td>
                  <td className="p-2">date</td>
                  <td className="p-2">total</td>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="p-2">{order._id}</td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">₹ {order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Orders

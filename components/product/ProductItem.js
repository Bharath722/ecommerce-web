import React, { useContext } from "react"
import { ContextState } from "../../store/GlobalState"
import { addToCart } from "../../store/Actions"
import { IMG } from "../../pages"

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(ContextState)
  const { cart } = state

  return (
    <div className="card mr-4 d-flex" style={{ width: "20rem" }}>
      <img className="card-img-top" src={IMG} alt="image" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-capitalize" title={product.title}>
          {product.title}
        </h5>

        <div className="row justify-content-between mx-0">
          <h6 className="text-danger">₹ {product.price}</h6>
        </div>

        <p
          className="card-text flex-grow-1 text-truncate"
          title={product.description}
        >
          {product.description}
        </p>

        <div className="row justify-content-center align-items-center mx-0">
          <button
            className="btn btn-success"
            onClick={() => dispatch(addToCart(product, cart))}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem

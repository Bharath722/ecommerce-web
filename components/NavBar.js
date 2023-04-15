import React, { useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { ContextState } from "../store/GlobalState"
import Cookie from "js-cookie"

function NavBar() {
  const router = useRouter()
  const { state, dispatch } = useContext(ContextState)
  const { auth, cart } = state

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/user/accessToken" })
    localStorage.removeItem("firstLogin")
    dispatch({ type: "AUTH", payload: {} })
    dispatch({ type: "NOTIFY", payload: { success: "Logged out!" } })
    return router.push("/")
  }

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {auth.user.name}
        </a>

        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link href="/orders">
            <a className="dropdown-item">Orders</a>
          </Link>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link href="/">
        <a className="navbar-brand">Ecommerce</a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul className="navbar-nav p-1">
          <li className="nav-item">
            {!!auth.user && (
              <Link href="/cart">
                <a className="nav-link">
                  <i
                    className="fas fa-shopping-cart position-relative"
                    aria-hidden="true"
                  >
                    <span
                      className="position-absolute"
                      style={{
                        padding: "3px 6px",
                        background: "#28a745bf",
                        borderRadius: "50%",
                        top: "-10px",
                        right: "-10px",
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      {cart.length}
                    </span>
                  </i>
                </a>
              </Link>
            )}
          </li>
          {Object.keys(auth).length === 0 ? (
            <li className="nav-item">
              <Link href="/login">
                <a className={"nav-link"}>
                  <i className="fas fa-user" aria-hidden="true"></i> Login
                </a>
              </Link>
            </li>
          ) : (
            loggedRouter()
          )}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar

import React from "react"

const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100 text-center d-flex align-items-center justify-content-center"
      style={{
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 9,
      }}
    >
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loading

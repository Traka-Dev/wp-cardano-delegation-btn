import React from "react"
import { SendBtn } from "./components/SendBtn"
import { ToastContainer } from "react-toastify"

export const SendBtnRoot = () => (
  <>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ marginTop: "15px", maxWidth: "50vw", width: "400px" }}
    />
    <SendBtn/>
  </>
)

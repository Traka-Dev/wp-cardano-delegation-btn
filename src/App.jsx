import React from "react"
import { DelegationBtn } from "./components/DelegationBtn"
import { ToastContainer } from 'react-toastify';

export const App = () => (
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
    />
    <DelegationBtn />
  </>
)

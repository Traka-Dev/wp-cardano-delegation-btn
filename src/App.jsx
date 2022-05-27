import React from "react"
import { Delegation } from "./components/Delegation"
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
      style={{ marginTop: '15px', maxWidth: '50vw', width: "400px"}} 
    />
    <Delegation />
  </>
)

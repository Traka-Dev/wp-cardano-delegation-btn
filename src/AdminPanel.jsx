import React from "react"
import { Settings } from "./components/Settings"
import { ToastContainer } from "react-toastify"

export const AdminPanel = () => (
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
      style={{ marginTop: '15px' }}    
    />
    <Settings />
  </>
)

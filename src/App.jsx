__webpack_public_path__ = window.resourceBasePath;
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
      style={{ marginTop: '15px', width: '600px' }} 
    />
    <DelegationBtn />
  </>
)

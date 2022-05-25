import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export const DelegationBtn = () => {
  const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/btn-params`

  const handleClick = async () => {
    toast.success("Settings Saved", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })/*
    const getPoolId = await axios.get(url)
    if (
      getPoolId.status === 200 &&
      getPoolId.data.poolId.length > 0 &&
      typeof getPoolId.data.poolId !== "undefined" &&
      getPoolId.data.poolId !== null
    ) {
      const poolId = getPoolId.data.poolId
      // Delegation Proccess
    }*/
  }

  return <button onClick={handleClick}>Tests</button>
}

import React, { useState, useEffect } from "react"
import axios from "axios"

export const DelegationBtn = () => {
  const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/poolId`

  const handleClick = async () => {
    const getPoolId = await axios.get(url)
    if (
      getPoolId.status === 200 &&
      getPoolId.data.poolId.length > 0 &&
      typeof getPoolId.data.poolId !== "undefined" &&
      getPoolId.data.poolId !== null
    ) {
      const poolId = getPoolId.data.poolId
      // Delegation Proccess
    }
  }

  return <button onClick={handleClick}>Tests</button>
}

import React, { useState, useEffect } from "react"
import axios from "axios"
import * as WASM_lib from "@emurgo/cardano-serialization-lib-browser"
import CardanoWalletsApi, { findWallet } from "../utils/cardano-wallets-api"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const DelegationBtn = () => {
  const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/btn-params`
  //console.dir(WASM_lib)
  const handleClick = async () => {
    const getPoolId = await axios.get(url)
    if (
      getPoolId.status === 200 &&
      getPoolId.data.poolId.length > 0 &&
      typeof getPoolId.data.poolId !== "undefined" &&
      getPoolId.data.poolId !== null
    ) {
      const poolId = getPoolId.data.poolId
      const network = getPoolId.data.network
      const walletName = "Nami"
      console.dir(WASM_lib)
      // Delegation Proccess
      //await delegate(poolId, WASM_lib, network, walletName)
    }
  }

  const delegate = async (poolId, WASM_lib, network, walletName) => {
    try {
      const wallet_obj = window.cardano
      if (wallet_obj) {
        const response = await toast.promise(
          Delegation(poolId, wallet_obj, WASM_lib, network, walletName),
          {
            pending: "Building transaction...",
            success: {
              render({ data }) {
                if (data == "You already delegated to this pool!") {
                  return "You already delegated to this pool 👌"
                } else {
                  console.dir(data)
                  return "Delegated 👌"
                }
              },
              // other options
              icon: "🟢",
            },
            error: {
              render({ data }) {
                if (data.message) {
                  return data.message
                }
                return data.info
              },
            },
          }
        )
        console.dir(response)
      } else {
        // NO WALLET
        toast.error(`Wallet ${walletName} not found.`)
      }
    } catch (error) {
      console.dir(error)
    }
  }

  const Delegation = async (
    poolId,
    walletName,
    wallet_obj,
    WASM_lib,
    network
  ) => {
    const compatible = await findWallet(walletName, wallet_obj)
    const wallet = await CardanoWalletsApi(compatible, WASM_lib)
    const wallet_network = await wallet.getNetworkId()
    if (wallet_network.id === network) {
      const resp = await wallet.delegate({
        poolId: poolId,
        metadata: tagTx,
        metadataLabel: "721",
      })
      return resp
    } else {
      throw new Error("Wallet no esta en la red correcta")
    }
  }

  return (
    <>
      <h1>:F</h1>
      <button onClick={handleClick}>Tests</button>
    </>
  )
}

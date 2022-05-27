import React from "react"
import axios from "axios"
import CardanoWalletsApi, { findWallet } from "../utils/cardano-wallets-api"
import { DelegationBtn } from "./DelegationBtn"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Delegation = () => {
  const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/btn-params`

  const handleClick = async walletName => {
    console.dir(walletName)
    const getPoolId = await axios.get(url)
    if (
      getPoolId.status === 200 &&
      getPoolId.data.poolId.length > 0 &&
      typeof getPoolId.data.poolId !== "undefined" &&
      getPoolId.data.poolId !== null
    ) {
      const poolId = getPoolId.data.poolId
      const network = getPoolId.data.network
      const apiKey = getPoolId.data.apiKey
      const WASM_lib = await import("@emurgo/cardano-serialization-lib-browser")
      await delegate(poolId, apiKey, WASM_lib, network, walletName)
    }
  }
  const TransactionLink = (tx, network) => {
    const explorer =
      network == 1
        ? "https://cardanoscan.io/transaction/"
        : "https://testnet.cardanoscan.io/transaction/"

    return (
      <>
        <span>Delegated 👌</span>
        <a href={`${explorer}${tx}`} target="_blank" rel="noreferrer">
          Transaction
        </a>
      </>
    )
  }

  const delegate = async (poolId, apiKey, WASM_lib, network, walletName) => {
    try {
      const wallet_obj = window.cardano
      if (wallet_obj) {
        const response = await toast.promise(
          Delegation(poolId, apiKey, walletName, wallet_obj, WASM_lib, network),
          {
            pending: "Building transaction...",
            success: {
              render({ data }) {
                if (data == "You already delegated to this pool!") {
                  return "You already delegated to this pool 👌"
                } else {
                  return TransactionLink(data, network)
                }
              },
              // other options
              icon: "🟢",
            },
            error: {
              render({ data }) {
                if (data.hasOwnProperty("message")) {
                  return data.message
                } else if (data.hasOwnProperty("info")) {
                  return data.info
                }
                return "Opps! something went wrong!"
              },
            },
          }
        )
        console.log("btn resp", response)
      } else {
        // NO WALLET
        toast.error(`Wallet ${walletName} not found.`)
      }
    } catch (error) {}
  }

  const Delegation = async (
    poolId,
    apiKey,
    walletName,
    wallet_obj,
    WASM_lib,
    network
  ) => {
    const compatible = await findWallet(walletName, wallet_obj)
    const wallet = await CardanoWalletsApi(compatible, apiKey, WASM_lib)
    const wallet_network = await wallet.getNetworkId()
    if (wallet_network.id == network) {
      const resp = await wallet.delegate({
        poolId: poolId,
      })
      return resp
    } else {
      throw new Error("Wallet no esta en la red correcta")
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <DelegationBtn
        onClick={() => handleClick("nami")}
        text="DELEGATE"
        walletName={"nami"}
      />
      <DelegationBtn
        onClick={() => handleClick("eternl")}
        text="DELEGATE"
        walletName={"eternl"}
      />
    </div>
  )
}

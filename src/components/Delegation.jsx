import React from "react"
import axios from "axios"
//import CardanoWalletsApi, { findWallet } from "../utils/cardano-wallets-api"
import { DelegationBtn } from "./DelegationBtn"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export const Delegation = () => {
  const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/btn-params`

  /**
   * When the user clicks on a button, the function will get the poolId, network, and apiKey from the
   * server, then import the WASM_lib, and finally call the delegate function.
   */
  const handleClick = async walletName => {
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
      const WASM_lib = null //await import("@emurgo/cardano-serialization-lib-browser")
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
        <a href={`${explorer}${tx}`} target="_blank" rel="nofollow">
          Transaction
        </a>
      </>
    )
  }

  /**
   * It takes a poolId, apiKey, WASM_lib, network, and walletName as arguments and returns a toast
   * notification with a link to the transaction on the blockchain explorer
   * @returns The response is a promise that resolves to the data returned by the function.
   */
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
      } else {
        // NO WALLET
        toast.error(`Wallet ${walletName} not found.`)
      }
    } catch (error) {}
  }

  /**
   * Delegation is a function that takes a poolId, apiKey, walletName, wallet_obj, WASM_lib, and
   * network as arguments and returns a response.
   * @returns The response is a promise that resolves to an object with the following properties:
   */
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

import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Button from "@mui/material/Button"
import { WalletDialog } from "./WalletDialog"
import { Lucid, Blockfrost } from "lucid-cardano"
import FormControl from "@mui/material/FormControl"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import { styled } from "@mui/system"
import "react-toastify/dist/ReactToastify.css"

export const SendBtn = () => {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(50)

  const send = async (walletProvider, network, apiKey, to) => {
    if (inputValue < 1) throw new Error("You Need to send at least 1 ADA")
    const love = inputValue * 10 ** 6
    try {
      const NETWORK = network == 1 ? "Mainnet" : "Testnet"
      const URL =
        network == 1
          ? "https://cardano-mainnet.blockfrost.io/api/v0"
          : "https://cardano-testnet.blockfrost.io/api/v0"

      const lucid = await Lucid.new(new Blockfrost(URL, apiKey), NETWORK)
      lucid.selectWallet(walletProvider)
      const tx = await lucid
        .newTx()
        .payToAddress(to, { lovelace: love })
        .complete()

      const signedTx = await tx.sign().complete()

      const txHash = await signedTx.submit()

      return txHash
    } catch (error) {
      if (error.hasOwnProperty("info")) throw new Error(error.info)
      if (error.hasOwnProperty("message")) throw new Error(error.message)
      throw new Error(error)
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = async value => {
    setOpen(false)
    //handle send tip
    if (value !== "" && value !== undefined && window.cardano) {
      const wallet_obj = window.cardano
      //check for wallet
      if (wallet_obj.hasOwnProperty(value)) {
        const walletProvider = await wallet_obj[value].enable()
        handleClick(walletProvider)
      } else {
        toast.error(`wallet ${value.toUpperCase()} not found`)
      }
    }
  }

  const handleClick = async walletProvider => {
    try {
      walletNetwork = await walletProvider.getNetworkId()
      const network = 0
      // GetData
      const ApiKey = process.env.TestApiKey
      const PaymentAddress = process.env.address
      if (!PaymentAddress || !ApiKey)
        throw new Error("Config Error, Contact Admin")
      if (network == walletNetwork) {
        const response = await toast.promise(
          send(walletProvider, 0, ApiKey, PaymentAddress),
          {
            pending: "Building transaction...",
            success: {
              render({ data }) {
                return TransactionLink(data, network)
              },
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
        toast.error("Wallet is set in wrong network!")
      }
    } catch (error) {
      if (error.hasOwnProperty("message")) {
        if (error.message === "Config Error, Contact Admin")
          toast.error(error.message)
      }
    }
  }

  const TransactionLink = (tx, network) => {
    const explorer =
      network == 1
        ? "https://cardanoscan.io/transaction/"
        : "https://testnet.cardanoscan.io/transaction/"

    return (
      <>
        <span>Ada Sent 👌</span>
        <a href={`${explorer}${tx}`} target="_blank" rel="nofollow">
          Transaction
        </a>
      </>
    )
  }

  const getPayData = async () => {
    const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/tip-params`
    const data = await axios.get(url)
    if (
      data.status === 200 &&
      data.data.poolId.length > 0 &&
      typeof data.data.poolId !== "undefined" &&
      getPayData.data.poolId !== null
    ) {
      return {
        paymentAddress: getPayData.data.paymentAddress,
        network: getPayData.data.network,
        apiKey: getPayData.data.apiKey,
      }
    } else {
      return { error: "Opps Something Went Wrong!" }
    }
  }

  const handleOnchange = event => {
    event.preventDefault()
    const result = event.target.value.replace(/\D/g, "")
    setInputValue(result)
  }

  const CustomInput = styled(Input)({
    "& .MuiInputBase-input": {
      backgroundColor: "#fff",
      border: "none",
      boxShadow: "none",
      width: "100px",
    },
    "& .MuiInputBase-input:hover, .MuiInputBase-input:active, .MuiInputBase-input:focus":
      {
        backgroundColor: "#fff",
        border: "none",
        boxShadow: "none",
      },
  })

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignCenter: "center",
      }}
    >
      <FormControl variant="standard" focused>
        <InputLabel htmlFor="amountInput">Amount</InputLabel>
        <CustomInput
          id="amountInput"
          value={inputValue}
          onChange={handleOnchange}
          autoFocus
        />
      </FormControl>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Button variant="outlined" onClick={handleClickOpen}>
          {process.env.text}
        </Button>
        <WalletDialog open={open} onClose={handleClose} />
      </div>
    </div>
  )
}

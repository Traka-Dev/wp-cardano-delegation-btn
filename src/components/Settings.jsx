import React, { useState, useEffect } from "react"
import axios from "axios"
import Button from "@mui/material/Button"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Switch from "@mui/material/Switch"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import Tooltip from "@mui/material/Tooltip"

//TODO
// Validations
// Params from wordpress to react
// clean Wallet api

export const Settings = () => {
  const initialState = {
    poolId: "",
    network: 0,
    mainnetApiKey: "",
    testnetApiKey: "",
    checked: false,
  }
  const [formData, setFormData] = useState(initialState)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [loader, setLoader] = useState("Save Settings")

  const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/settings`

  useEffect(() => {
    axios.get(url).then(res => {
      const { poolId, network, mainnetApiKey, testnetApiKey } = res.data
      setFormData({
        poolId,
        network,
        mainnetApiKey,
        testnetApiKey,
        checked: network == 1,
      })
    })
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    // Delete error
    delete formErrors[name]
    //Update input value
    setFormData({ ...formData, [name]: value })
  }

  const StyleMsgError = {
    color: "red",
  }
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }))

  const handleSubmit = e => {
    e.preventDefault()
    console.dir(formData)
    const errors = validate(formData)
    setFormErrors(errors)
    setLoader("Saving...")
    setIsSubmit(true)
  }

  const validate = formData => {
    const errors = {}
    if (formData.poolId.length < 10) {
      //invalid Pool ID
      errors.poolId = "Invalid Pool ID"
    }
    if (formData.network == 1) {
      //Mainnet check
      if (formData.mainnetApiKey.length < 20) {
        errors.mainnetApiKey = "Invalid Mainnet Api Key"
      }
    } else {
      if (formData.testnetApiKey.length < 20) {
        errors.testnetApiKey = "Invalid Testnet Api Key"
      }
    }
    return errors
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      saveOptions()
    } else if (isSubmit) {
      setLoader("Save Settings")
      //Toast Error
      console.log(formErrors)
      toast.error(`Error Settings not saved`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }, [formErrors])

  const saveOptions = () => {
    axios
      .post(
        url,
        { ...formData },
        {
          headers: {
            "content-type": "application/json",
            "X-WP-NONCE": appLocalizer.nonce,
          },
        }
      )
      .then(resp => {
        if (resp.data == "success") {
          toast.success("Settings Saved", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          })
        }
        setLoader("Save Settings")
      })
  }

  const handleCC = async () => {
    let newNetwork = formData.checked ? 0 : 1
    await setFormData({
      ...formData,
      network: newNetwork,
      checked: !formData.checked,
    })
    console.log("sd", newNetwork)
  }

  return (
    <>
      <h2>Delegation Buttons Settings</h2>
      <form
        id="wptrkdbtn-settings-form"
        onSubmit={handleSubmit}
        style={{
          width: "98%",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "60%" }}>
          <TextField
            error={formErrors.hasOwnProperty("poolId")}
            id="poolId"
            name="poolId"
            label="Pool ID"
            variant="standard"
            value={formData.poolId}
            onChange={handleChange}
          />
          {formErrors.hasOwnProperty("poolId") ? (
            <span style={StyleMsgError}>{formErrors.poolId}</span>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "60%",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            onClick={handleCC}
            onMouseEnter={e => {
              // style stage container:
              console.log(";D")
              const container = e.target
              container.style.cursor = "pointer"
            }}
          >
            <Typography>Testnet</Typography>
            <Switch
              checked={formData.checked}
              id="switchSettings"
              onChange={handleChange}
            />
            <Typography>Mainnet</Typography>
          </Stack>
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "60%" }}>
          <Tooltip title="blockfrost mainnet Api Key" arrow placement="top">
            <TextField
              error={formErrors.hasOwnProperty("mainnetApiKey")}
              label={
                <span>
                  Mainnet Api Key{" "}
                  <a href="https://blockfrost.io/" target="__blank">
                    BlockFrost
                  </a>
                </span>
              }
              variant="standard"
              id="mainnetApiKey"
              name="mainnetApiKey"
              value={formData.mainnetApiKey}
              onChange={handleChange}
            />
          </Tooltip>
          {formErrors.hasOwnProperty("mainnetApiKey") ? (
            <span style={StyleMsgError}>{formErrors.mainnetApiKey}</span>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", width: "60%" }}>
          <Tooltip title="blockfrost testnet Api Key" arrow placement="top">
            <TextField
              error={formErrors.hasOwnProperty("testnetApiKey")}
              label={
                <span>
                  Testnet Api Key{" "}
                  <a href="https://blockfrost.io/" target="__blank">
                    BlockFrost
                  </a>
                </span>
              }
              variant="standard"
              id="testnetApiKey"
              name="testnetApiKey"
              value={formData.testnetApiKey}
              onChange={handleChange}
            />
          </Tooltip>
          {formErrors.hasOwnProperty("testnetApiKey") ? (
            <span style={StyleMsgError}>{formErrors.testnetApiKey}</span>
          ) : null}
        </div>

        <Button variant="contained" type="submit">
          {loader}
        </Button>
      </form>
    </>
  )
}

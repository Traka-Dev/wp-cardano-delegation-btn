import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const Settings = () => {
  const initialState = {
    poolId: "",
    network: 0,
    mainnetApiKey: "",
    testnetApiKey: "",
  }
  const [formData, setFormData] = useState(initialState)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [loader, setLoader] = useState("Save Settings")

  const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/settings`

  useEffect(() => {
    axios.get(url).then(res => {
      const { poolId, network, mainnetApiKey, testnetApiKey } = res.data
      setFormData({ poolId, network, mainnetApiKey, testnetApiKey })
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

  const handleSubmit = e => {
    e.preventDefault()
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
    } else if(isSubmit) {
      setLoader("Save Settings")
      //Toast Error
      console.log(formErrors)
      toast.error(`Fail to save`, {
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

  return (
    <>
      <h2>Set your Pool id for your delegation Button</h2>
      <form id="wptrkdbtn-settings-form" onSubmit={handleSubmit}>
        <table className="form-table" role="presentation">
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="poolId">Pool ID</label>
              </th>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    style={
                      formErrors.hasOwnProperty("poolId")
                        ? { border: "2px red solid" }
                        : null
                    }
                    id="poolId"
                    name="poolId"
                    value={formData.poolId}
                    onChange={handleChange}
                  />
                  {formErrors.hasOwnProperty("poolId") ? (
                    <span style={StyleMsgError}>{formErrors.poolId}</span>
                  ) : null}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="network">Network</label>
              </th>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    id="network"
                    name="network"
                    value={formData.network}
                    onChange={handleChange}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="mainnetApiKey">
                  BlockFrost Mainnet Api Key
                </label>
              </th>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    style={
                      formErrors.hasOwnProperty("mainnetApiKey")
                        ? { border: "2px red solid" }
                        : null
                    }
                    id="mainnetApiKey"
                    name="mainnetApiKey"
                    value={formData.mainnetApiKey}
                    onChange={handleChange}
                  />
                  {formErrors.hasOwnProperty("mainnetApiKey") ? (
                    <span style={StyleMsgError}>
                      {formErrors.mainnetApiKey}
                    </span>
                  ) : null}
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                <label htmlFor="testnetApiKey">
                  BlockFrost Testnet Api Key
                </label>
              </th>
              <td>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    style={
                      formErrors.hasOwnProperty("testnetApiKey")
                        ? { border: "2px red solid" }
                        : null
                    }
                    id="testnetApiKey"
                    name="testnetApiKey"
                    value={formData.testnetApiKey}
                    onChange={handleChange}
                  />
                  {formErrors.hasOwnProperty("testnetApiKey") ? (
                    <span style={StyleMsgError}>
                      {formErrors.testnetApiKey}
                    </span>
                  ) : null}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p className="submit">
          <button type="submit" className="button button-primary">
            {loader}
          </button>
        </p>
      </form>
    </>
  )
}

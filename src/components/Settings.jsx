import React, { useState, useEffect } from "react"
import axios from "axios"

export const Settings = () => {
  const [poolId, setPoolId] = useState('')
  const [loader, setLoader] = useState('Save Settings')

  const url = `${appLocalizer.apiUrl}/wptrkdbtn/v1/settings`

  useEffect(() => {
    axios.get(url).then(res => setPoolId(res.data.poolId))
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setLoader('Saving...')
    console.log("URL", appLocalizer)
    axios.post(url, { poolId },{
      headers:{
        'content-type': 'application/json',
        'X-WP-NONCE': appLocalizer.nonce
      }
    }).then((resp) => {
      setLoader('Save Settings')
    })
  }

  return (
    <>
      <h2>Set your Pool id for your delegation Button</h2>
      <form id="wptrkdbtn-settings-form" onSubmit={e => handleSubmit(e)}>
        <table className="form-table" role="presentation">
          <tbody>
            <tr>
              <th scope="row">
                <label htmlFor="poolId">Pool ID</label>
              </th>
              <td>
                <input
                  id="poolId"
                  name="poolId"
                  value={poolId}
                  onChange={e => setPoolId(e.target.value)}
                  className="regular-text"
                />
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

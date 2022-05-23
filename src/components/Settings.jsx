import React, { useState, useEffect } from "react"
import axios from "axios"

export const Settings = () => {
  return (
    <>
    <h2>Welcome!</h2>
      <form id="wptrkdbtn-settings-form">
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
                  value="pool1aqg6fvhcaulvss2ruvpx6ur9vj7pejvdcxv6xp0qlwuwx94evf0"
                  className="regular-text"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <p className="submit">
            <button type="submit" clasname="button button-primary">Save</button>
        </p>
      </form>
    </>
  )
}

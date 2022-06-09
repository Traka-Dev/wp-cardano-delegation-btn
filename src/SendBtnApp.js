__webpack_public_path__ = window.mytrkBasePath + "/dist/"
import React from "react"
import { createRoot } from "react-dom/client"
import { SendBtnRoot } from "./SendBtnRoot"

document.addEventListener("DOMContentLoaded", () => {
  const front = document.getElementById("wptrkdbtn-tipapp")
  if (typeof front !== "undefined" && front !== null) {
    const root = createRoot(front)
    root.render(<SendBtnRoot />)
  }
})

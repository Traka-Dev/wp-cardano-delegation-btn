__webpack_public_path__ = window.mytrkBasePath + "/dist/"
import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

document.addEventListener("DOMContentLoaded", () => {
  const front = document.getElementById("wptrkdbtn-app")
  if (typeof front !== "undefined" && front !== null) {
    const root = createRoot(front)
    root.render(<App />)
  }
})

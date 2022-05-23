import React from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("wptrkdbtn-admin-app")
  if (typeof container !== "undefined" && container !== null) {
    const root = createRoot(container)
    root.render(<App tab="home" />)
  }
})

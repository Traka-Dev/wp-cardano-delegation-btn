import React from "react"
import { createRoot } from "react-dom/client"
import { AdminPanel } from "./AdminPanel"

document.addEventListener("DOMContentLoaded", () => {
  const admin = document.getElementById("wptrkdbtn-admin-app")
  if (typeof admin !== "undefined" && admin !== null) {
    const root = createRoot(admin)
    root.render(<AdminPanel />)
  }
})

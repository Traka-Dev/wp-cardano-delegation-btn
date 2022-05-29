import React from "react"
import namiIcon from "../assets/nami.png"
import eternlIcon from "../assets/eternl.png"

/* A function that returns a Delegation Button. */
export const DelegationBtn = ({ text, onClick, inLineStyle, walletName }) => {
  const icon = (
    <div style={{ width: "20%" }}>
      <img style={{height: "100%", width: "100%"}} src={walletName === "nami" ? namiIcon : eternlIcon} />
    </div>
  )

  let styles = {
    display: "flex",

    width: "200px",
    height: "50px",
    maxWidth: "50%",
    background: "black",
    color: "white",
    borderRadius: "10px",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  }

  if (typeof inLineStyle !== "undefined") styles = inLineStyle

  return (
    <button style={styles} onClick={onClick}>
      {icon}
      <div
        style={{
          display: "flex",
          height: "30px",
          overflow: "hidden",
          alignItems: "center",
          paddingLeft: "20px",
        }}
      >
        {text}
      </div>
    </button>
  )
}

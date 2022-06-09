import React from "react"
import Avatar from "@mui/material/Avatar"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import ListItemText from "@mui/material/ListItemText"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"

import namiIcon from "../assets/nami.png"
import eternlIcon from "../assets/eternl.png"
1
const wallets = [
  { iconSrc: namiIcon, name: "nami" },
  { iconSrc: eternlIcon, name: "eternl" },
]

export const WalletDialog = props => {
  const { onClose, selectedWallet, open } = props

  const handleClose = () => {
    onClose(selectedWallet)
  }

  const handleListItemClick = value => {
    onClose(value)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select your wallet</DialogTitle>
      <List sx={{ pt: 0 }}>
        {wallets.map(wallet => (
          <ListItem
            button
            onClick={() => handleListItemClick(wallet.name)}
            key={wallet.name}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "black" }}>
                <img src={wallet.iconSrc} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={wallet.name.toUpperCase()} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
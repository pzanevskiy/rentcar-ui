import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { OrderState } from "../../types/OrderState";

export const AdminOrderActions = (props: {
  status: string,
  orderId: string,
  onClick: (orderId: string, status: string) => void
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (e: any) => {
    setAnchorEl(null)
  }

  const handleUpdate = (e: any) => {
    console.log(e.target.textContent)
    debugger
    props.onClick(props.orderId, e.target.textContent)
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Actions
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {Object.keys(OrderState).map((type: string) =>
          (<MenuItem key={type} value={type} onClick={(e: any) => handleUpdate(e)}>{type}</MenuItem>))}
      </Menu>
    </div >
  )
}
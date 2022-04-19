import { Button } from "@mui/material"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'

export const DeleteButton = (props: { onClick: () => void }) => {
  return (
    <>
      <Button size="small" onClick={props.onClick}>
        <ClearRoundedIcon fontSize='medium' />Delete
      </Button>
    </>
  )
}
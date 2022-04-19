import { Button } from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded'

export const AddButton = (props: { onClick: () => void }) => {
  return (
    <>
      <Button size="small" onClick={props.onClick}>
        <AddRoundedIcon fontSize='medium' />Add
      </Button>
    </>
  )
}
import { Chip } from "@mui/material"
import ErrorIcon from '@mui/icons-material/Error'
import { useNavigate } from "react-router-dom"

export const PenaltyChip = (props: { hasPenalties: boolean }) => {
  const navigate = useNavigate()
  return (
    <>
      {props.hasPenalties &&
        <Chip
          label={"Penalty"}
          onClick={() => {
            navigate("/penalties")
          }} color="error" icon={<ErrorIcon />} />}
    </>
  )
}
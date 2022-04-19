import { Box, Typography } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear'

export const NoData = (props: {message: string}) => {
  return(
    <div>
      <Box sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
        <ClearIcon sx={{ color: 'red', fontSize: 150 }} />
        <Typography>Sorry!</Typography>
        <Typography>{props.message}</Typography>
      </Box>
    </div>
  )
}
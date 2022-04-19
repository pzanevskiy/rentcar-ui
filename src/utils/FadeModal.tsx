import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { ReactNode, useState } from "react";

export const handleOpen = (value: boolean) => value = true
export const handleClose = (value: boolean) => value = false

export const FadeModal = (props: { element: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const handleO = () => handleOpen(open)
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {props.element}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
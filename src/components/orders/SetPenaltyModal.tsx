import { Button, Dialog, DialogContent, DialogTitle, Grid, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Enhancement, PenaltyInfo, PrePenaltyOrderInfo } from "../../api"
import { addPenalty } from "../../api/responses"
import { EnhancementDetails } from "../enhancements/EnhancementDetails"

const defaultPenaltyInfo: PenaltyInfo = {
  expirationCost: 0,
  additionalCost: 0,
  description: ""
}

export const SetPenaltyModal = (props: {
  open: boolean,
  onOpen?: () => void,
  onClose: () => void,
  prePenaltyInfo?: PrePenaltyOrderInfo
}) => {

  const [penaltyInfo, setPenaltyInfo] = useState<PenaltyInfo>(defaultPenaltyInfo)

  useEffect(() => {
    if (props.open) {
      let expirationCostOneDay = props.prePenaltyInfo?.car.price

      if (props.prePenaltyInfo!.enhancements.length > 0) {
        expirationCostOneDay = props.prePenaltyInfo?.enhancements
          .reduce((price: number, enh: Enhancement) => {
            return price + enh.price!
          }, props.prePenaltyInfo.car.price!)

      }

      const totalExpirationCost: number =
        parseFloat((expirationCostOneDay! * props.prePenaltyInfo?.expirationDiff!).toFixed(2))

      setPenaltyInfo({ ...penaltyInfo, expirationCost: totalExpirationCost, orderId: props.prePenaltyInfo?.orderId })

    }
  }, [props.open])

  const addPenaltyInfo = () => {
    addPenalty(penaltyInfo)
      .then((res: any) => {
        handleClose()
      })
  }

  const handleClose = () => {
    setPenaltyInfo(defaultPenaltyInfo)
    props.onClose()
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} fullWidth={true} maxWidth='md'>
        <DialogTitle>Penalty</DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <List disablePadding dense>
                <ListItem key="car">
                  <ListItemText
                    primary={`${props.prePenaltyInfo?.car.brand} ${props.prePenaltyInfo?.car.model}`}
                    secondary={`Price - ${props.prePenaltyInfo?.car.price}$`} />
                </ListItem>
              </List>
              <EnhancementDetails enhancements={props.prePenaltyInfo?.enhancements!} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} m={1}>
                <TextField
                  id="outlined-read-only-input"
                  label="Expiration cost"
                  value={penaltyInfo?.expirationCost}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} m={1}>
                <TextField
                  id="outlined-number-input"
                  label="Additional cost"
                  type="number"
                  value={penaltyInfo?.additionalCost}
                  onChange={(e: any) => setPenaltyInfo({ ...penaltyInfo, additionalCost: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} m={1}>
                <TextField
                  id="outlined-text-input"
                  label="Description"
                  value={penaltyInfo?.description}
                  onChange={(e: any) => setPenaltyInfo({ ...penaltyInfo, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} m={1}>
                <Button onClick={addPenaltyInfo}>Add penalty</Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}
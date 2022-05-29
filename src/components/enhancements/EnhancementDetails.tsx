import { List, ListItem, ListItemText, Typography } from "@mui/material"
import { Enhancement } from "../../api"

export const EnhancementDetails = (props: { enhancements: Enhancement[] }) => {
  return (
    <List disablePadding dense>
      {props.enhancements.length > 0 ? props.enhancements.map((e: Enhancement) => (
        <ListItem key={e.enhancementId}>
          <ListItemText primary={e.description} secondary={`Price - ${e.price}$`} />
        </ListItem>
      )) : (<ListItem><ListItemText primary={"No extras"}/></ListItem>)}
    </List>
  )
}
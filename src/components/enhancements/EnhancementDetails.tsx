import { List, ListItem, Typography } from "@mui/material"
import { Enhancement } from "../../api"

export const EnhancementDetails = (props: { enhancements: Enhancement[] }) => {
  return (
    <List>
      {props.enhancements.length > 0 ? props.enhancements.map((e: Enhancement) => (
        <ListItem key={e.enhancementId}>{e.description}</ListItem>
      )) : (<Typography>No enhancements</Typography>)}
    </List>
  )
}
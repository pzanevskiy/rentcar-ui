import { InputLabel, Select, OutlinedInput, Box, Chip, MenuItem, FormControl } from "@mui/material"
import { useState, useEffect } from "react"
import { Enhancement, getEnhancements } from "../../api"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}
export const Enhancements = (props: {
  enhancements: Enhancement[],
  selectedEnhancements: Enhancement[],
  handleChange: (e: any) => void
}) => {
  // const [enhancements, setEnhancements] = useState<Enhancement[]>([])
  // const [selectedEnh, setSelectedEnh] = useState<Enhancement[]>([])

  // useEffect(() => {
  //   getEnhancementsList()
  // }, [])

  // const getEnhancementsList = () => {
  //   getEnhancements()
  //     .then((res: any) => {
  //       setEnhancements(res)
  //     })
  // }

  // const handleChange = (value: any) => {
  //   const description = value.find((obj: any) => typeof obj === 'string')
  //   const enhancement: Enhancement = enhancements.find((e: Enhancement) => e?.description == description)!

  //   if (selectedEnh.find((e: Enhancement) => e?.description == description)) {
  //     const fiteredSelection = selectedEnh.filter(x => x.description != description)
  //     setSelectedEnh([...fiteredSelection])

  //   } else {
  //     setSelectedEnh([...selectedEnh, enhancement])

  //   }
  // }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select extras</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.selectedEnhancements}
          onChange={(e) => props.handleChange(e.target.value)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value?.enhancementId} label={value?.description} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.enhancements.map((enh: Enhancement) => (
            <MenuItem
              key={enh.enhancementId}
              value={enh.description}
            >
              {enh.description} - {enh.price}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
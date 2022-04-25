import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { deleteModel, getModelsByBrandId } from "../../api"
import { Model } from "../../api/responseModels"
import { addModel } from "../../api/responses"
import { NoData } from "../../utils/NoData"
import { AddButton } from "../buttons/AddButton"
import { DeleteButton } from "../buttons/DeleteButton"
import {
  Box, Modal, TextField,
  Typography, Fade, Button
} from "@mui/material"
import Backdrop from '@mui/material/Backdrop'

export const Models = (props: { brandId: string }) => {
  const [models, setModels] = useState<Model[]>([])
  const [selectedModel, setSelectedModel] = useState<any>([])
  const { enqueueSnackbar } = useSnackbar()
  const [modelName, setModel] = useState<string>('')

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    console.log(`from models - '${props.brandId}'`);

    getModelsList()
  }, [props.brandId])

  const getModelsList = () => {
    if (props.brandId != '') {
      getModelsByBrandId(props.brandId)
        .then((res: any) => {
          setModels(res)
        })
    } else {
      setModels([])
    }

  }
  const CustomNoRowsOverlay = () => {
    return (<><NoData message={`No models available`} /></>)
  }
  const add = () => {
    const model: Model = {
      modelName: modelName,
      brandId: props.brandId
    }
    addModel(model).then((r: any) => {
      getModelsList()
    })
  }
  const CustomToolBar = () => {
    const remove = () => {
      if (selectedModel.length > 0) {
        selectedModel.map((id: string) =>
          deleteModel(id)
            .then((res: any) => {
              enqueueSnackbar('Deleted', {
                variant: 'success',
              })
              getModelsList()
            }))
      } else {
        enqueueSnackbar('No models selected', {
          variant: 'warning',
        })
      }
    }

    const add = () => {
      handleOpen()
    }
    return (
      <GridToolbarContainer>
        <AddButton onClick={add} />
        <DeleteButton onClick={remove} />
      </GridToolbarContainer>
    )
  }
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'id',
      width: 100,
    },
    {
      field: 'model',
      headerName: 'model',
      width: 100
    },
  ]
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add model
            </Typography>
            <TextField id="model" label="Model" variant="outlined"
              onChange={(e: any) => setModel(e.target.value)} />
            <Button onClick={add}>Add</Button>
          </Box>
        </Fade>
      </Modal>
      <div style={{ height: 475 }}>
        <DataGrid
          columns={columns}
          rows={models?.map((model: Model) => ({ id: model.modelId, model: model.modelName }))}
          density="compact"
          checkboxSelection
          components={{ Toolbar: CustomToolBar, NoRowsOverlay: CustomNoRowsOverlay }}
          onSelectionModelChange={(i) => {
            setSelectedModel(i)
            console.log(selectedModel);

          }}
          pageSize={10}
          rowsPerPageOptions={[5, 10]} />
      </div>
    </div>
  )
}

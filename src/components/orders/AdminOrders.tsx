import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from "@mui/x-data-grid"
import dayjs from "dayjs"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { AdminOrder, DetailedOrder, getAdminOrdersAll, getOrderById, getOrderDetailedCost, PrePenaltyOrderInfo, updateOrderStatus } from "../../api"
import { OrderState } from "../../types/OrderState"
import { NoData } from "../../utils/NoData"
import { DeleteButton } from "../buttons/DeleteButton"
import { AdminOrderActions } from "./AdminOrderActions"
import { OrderItem } from "./OrdetItem"
import { SetPenaltyModal } from "./SetPenaltyModal"
import { StatusChip } from "./StatusChip"

const CustomNoRowsOverlay = () => {
  return (<NoData message={`No orders available`} />)
}

export const AdminOrders = () => {
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([])
  const [selectedOrders, setSelectedOrders] = useState<any>([])
  const [detailedOrder, setDetailedOrder] = useState<DetailedOrder>()
  const [open, setOpen] = useState(false)

  const [prePenaltyInfo, setPrePenaltyInfo] = useState<PrePenaltyOrderInfo>()
  const [penaltyOpen, setPenaltyOpen] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const handleOpen = (orderId: string) => {
    getDetailedOrder(orderId)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handlePenaltyOpen = (orderId: string, expirationDiff: number) => {
    getOrderDetailedCost(orderId)
      .then((res: PrePenaltyOrderInfo) => {
        setPrePenaltyInfo({ ...res, expirationDiff: expirationDiff })
        setPenaltyOpen(true)
      })
  }

  const handlePenaltyClose = () => {
    getAdminOrdersAllList()
    setPenaltyOpen(false)
  }

  useEffect(() => {
    getAdminOrdersAllList()
  }, [])

  const getDetailedOrder = (orderId: string) => {
    getOrderById(orderId)
      .then((res: DetailedOrder) => {
        setDetailedOrder(res)
        setOpen(true)
      })
      .catch(e => {
        console.log({ ...e })
      })
  }

  const getAdminOrdersAllList = () => {
    getAdminOrdersAll()
      .then((res: AdminOrder[]) => {
        setAdminOrders(res)
      })
      .catch(e => {
        console.log({ ...e })
      })
  }

  const updateStatusModal = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status)
      .then((r: any) => {
        enqueueSnackbar(`Status of the order has been updated to '${status}'`, { variant: 'info' })
        getAdminOrdersAllList()
        getDetailedOrder(orderId)
      })
      .catch((error: any) => {
        enqueueSnackbar('Update status error! Try again later.', { variant: 'error' })
        console.log({ ...error })
      })
  }

  const updateStatus = (orderId: string, status: string) => {
    updateOrderStatus(orderId, status)
      .then((r: any) => {
        enqueueSnackbar(`Status of the order has been updated to '${status}'`, { variant: 'info' })
        getAdminOrdersAllList()
      })
      .catch((error: any) => {
        enqueueSnackbar('Update status error! Try again later.', { variant: 'error' })
        console.log({ ...error })
      })
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      width: 100,
      renderCell: (val) => {
        return (
          <Tooltip title={val.row['id']}><Typography variant="body2">{val.row['id']}</Typography></Tooltip>
        )
      }
    },
    {
      field: 'username',
      headerName: 'User',
      width: 100,
      renderCell: (val) => {
        return (
          <Tooltip title={val.row['username']}><Typography variant="body2">{val.row['username']}</Typography></Tooltip>
        )
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 100,
      renderCell: (val) => {
        return (
          <Tooltip title={val.row['email']}><Typography variant="body2">{val.row['email']}</Typography></Tooltip>
        )
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (val) => {
        return (
          <StatusChip orderState={val.row['status']} />
        )
      }
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      width: 150,
      renderCell: (val) => {
        return (
          <Tooltip title={`${val.row['dateStart']} - ${val.row['dateEnd']}`}>
            <Typography variant="body2">{val.row['dateCreated']}</Typography>
          </Tooltip>
        )
      }
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 100,
      renderCell: (val) => {
        return (<Typography variant="body2">{val.row['duration']}d</Typography>)
      }
    },
    {
      field: 'totalAmount',
      headerName: 'Total',
      width: 75,
      renderCell: (val) => {
        return (<Typography variant="body2">{val.row['totalAmount']}$</Typography>)
      }
    },
    {
      field: 'expirationDiff',
      headerName: 'Expired',
      width: 100,
      renderCell: (val) => {
        return (<Typography variant="body2">{val.row['expirationDiff']}d</Typography>)
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (val) => {
        return (
          <AdminOrderActions status={val.row['status']} orderId={val.row['id']} onClick={updateStatus} />
        )
      }
    },
    {
      field: 'details',
      headerName: 'View detailed',
      width: 120,
      renderCell: (val) => {
        return (
          <Button variant='text' onClick={() => handleOpen(val.row['id'])}>View detailed</Button>
        )
      }
    },
    {
      field: 'penalty',
      headerName: 'Set penalty',
      width: 120,
      renderCell: (val) => {
        if (val.row['expirationDiff'] > 0 && !val.row['hasPenalties']) {
          return (
            <Button variant='text' onClick={() => handlePenaltyOpen(val.row['id'], val.row['expirationDiff'])}>Set penalty</Button>
          )
        }
      }
    }
  ]

  const CustomToolBar = () => {

    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <DeleteButton onClick={() => console.log('del')} />
      </GridToolbarContainer>
    )
  }

  const getDayDiff = (end: any, start: any) => {
    const endDate = dayjs(end)
    const startDate = dayjs(start)
    const diff = endDate.diff(startDate, 'days', true)
    const dayDiff: number = Math.ceil(diff)
    return dayDiff
  }

  const renderExpiration = (end: Date, start: Date, status: string) => {
    const diff = getDayDiff(end, start)
    if ((status === OrderState.Completed || status === OrderState.InProgress) && diff > 0) {
      return diff
    }
    else {
      return 0
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md'>
        <DialogTitle>Order</DialogTitle>
        <DialogContent>
          <OrderItem order={detailedOrder!} onStatusUpdate={updateStatusModal} />
        </DialogContent>
      </Dialog>
      <SetPenaltyModal open={penaltyOpen} onClose={handlePenaltyClose} prePenaltyInfo={prePenaltyInfo} />
      <div style={{ height: '700px', width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={adminOrders?.map((o: AdminOrder) => ({
            id: o.order.orderId,
            username: `${o.user.firstName} ${o.user.lastName}`,
            email: o.user.email,
            dateCreated: dayjs(o.order.dateTimeCreated).format("DD.MM.YYYY HH:mm"),
            dateStart: dayjs(o.order.startDate).format("DD.MM.YYYY HH:mm"),
            dateEnd: dayjs(o.order.endDate).format("DD.MM.YYYY HH:mm"),
            duration: getDayDiff(o.order.endDate, o.order.startDate),
            totalAmount: o.order.totalAmount,
            expirationDiff: renderExpiration(o.order.dateTimeFinished!, o.order.endDate!, o.order.statusName!),
            status: o.order.statusName,
            hasPenalties: o.order.hasPenalties
          }))}
          pageSize={10}
          density="comfortable"
          disableSelectionOnClick
          checkboxSelection
          components={{ Toolbar: CustomToolBar, NoRowsOverlay: CustomNoRowsOverlay }}
          onSelectionModelChange={(i) => { setSelectedOrders(i) }} />
      </div>
    </div>
  )
}
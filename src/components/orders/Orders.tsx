import {
  Button,
  CircularProgress,
  FormControl, Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper, Select, Stack, Typography
} from "@mui/material"
import { compareAsc, compareDesc } from "date-fns/esm"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"
import { DetailedOrder, getUserOrders, updateOrderStatus } from "../../api"
import { OrderFilterOptions } from "../../types/OrderFilterOptions"
import { OrderState } from "../../types/OrderState"
import { EnhancementDetails } from "../enhancements/EnhancementDetails"
import { CarImage } from "../rentCars/CarImage"
import { CarInfo } from "../rentCars/CarInfo"
import { OrderActions } from "./OrderActions"
import { OrderDetailedInfo } from "./OrderDatailedInfo"
import { OrderItem } from "./OrdetItem"
import { StatusChip } from "./StatusChip"

const ITEMS_PER_PAGE: number = 3

const defaultOrderFilterOptions: OrderFilterOptions = {
  date: 'desc',
  orderState: '',
  price: ''
}

export const Orders = () => {
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(0)
  const [pagedOrders, setPagedOrders] = useState<DetailedOrder[]>([])
  const [orders, setOrders] = useState<DetailedOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<DetailedOrder[]>([])
  const [orderFilterOptions, setOrderFilterOptions] = useState<OrderFilterOptions>(defaultOrderFilterOptions)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    getUserOrdersList()

  }, [])

  useEffect(() => {
    getPaged()

  }, [page, filteredOrders])

  useEffect(() => {
    if (orders.length > 0) {
      const fOrders = filterOrders()
      if (fOrders.length > 0) {
        setPageCount(Math.ceil(fOrders.length / ITEMS_PER_PAGE))
        getPaged()
      }
    }

  }, [orderFilterOptions, orders])


  const getPaged = () => {
    if (page === 1 && page !== pageCount) {
      setPagedOrders(filteredOrders.slice(0, 0 + ITEMS_PER_PAGE))
    }
    if (page === pageCount) {
      setPagedOrders(filteredOrders.slice((page - 1) * ITEMS_PER_PAGE, orders.length))
    }
    if (page !== 1 && page !== pageCount) {
      setPagedOrders(filteredOrders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE))
    }
  }

  const getUserOrdersList = () => {
    getUserOrders()
      .then((res: DetailedOrder[]) => {
        setOrders(res)
        setPageCount(Math.ceil(res?.length / ITEMS_PER_PAGE))
        setIsLoaded(true)
      })

      .catch((error: any) => {
        setIsLoaded(true)
        enqueueSnackbar('Load orders error! Try again later.', { variant: 'error' })
        console.log({ ...error })
      })
  }

  const updateStatus = (orderId: string, statusName: string) => {
    updateOrderStatus(orderId, statusName)
      .then((r: any) => {
        enqueueSnackbar(`Status of the order has been updated to '${statusName}'`, { variant: 'info' })
        getUserOrdersList()
      })
      .catch((error: any) => {
        enqueueSnackbar('Update status error! Try again later.', { variant: 'error' })
        console.log({ ...error })
      })
  }

  const filterOrders = () => {
    let filteredOrdersInternal: DetailedOrder[] = orders

    if (orderFilterOptions.orderState !== '') {
      filteredOrdersInternal = filteredOrdersInternal
        .filter(v => v.statusName === orderFilterOptions.orderState)
    }

    filteredOrdersInternal = filteredOrdersInternal
      .sort((a, b) => orderFilterOptions.date == 'asc' ?
        compareAsc(new Date(a.dateTimeCreated!), new Date(b.dateTimeCreated!)) :
        compareDesc(new Date(a.dateTimeCreated!), new Date(b.dateTimeCreated!))
      )

    if (orderFilterOptions.price !== '') {
      filteredOrdersInternal = filteredOrdersInternal
        .sort((a, b) => orderFilterOptions.price === 'low' ?
          a.totalAmount - b.totalAmount :
          b.totalAmount - a.totalAmount
        )
    }

    setFilteredOrders(filteredOrdersInternal)

    return filteredOrdersInternal
  }

  return (
    <div>
      <Grid container p={2} spacing={1}>
        <Grid item xs={12} sm={12} md={3}>
          <Typography variant="h5">Filter your orders</Typography>
          <Grid item xs={12} my={1}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter-name"
                value={orderFilterOptions.orderState}
                onChange={(e: any) => { setOrderFilterOptions({ ...orderFilterOptions, orderState: e.target.value }) }}
                input={<OutlinedInput label="Status" />}
              >
                {Object.keys(OrderState).map((type: string) => (<MenuItem key={type} value={type}>{type}</MenuItem>))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} my={1}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="sortDate-label">Sort by date</InputLabel>
              <Select
                label='Sort by date'
                labelId="sortDate-label"
                id="sortDate"
                value={orderFilterOptions.date}
                onChange={(e: any) => setOrderFilterOptions({ ...orderFilterOptions, date: e.target.value })}
              >
                <MenuItem key={'desc'} value={'desc'}>Descending</MenuItem>
                <MenuItem key={'asc'} value={'asc'}>Ascending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} my={1}>
            <FormControl sx={{ width: '100%' }}>
              <InputLabel id="sortPrice-label">Sort by price</InputLabel>
              <Select
                label='Sort by price'
                labelId="sortPrice-label"
                id="sortPrice"
                value={orderFilterOptions.price}
                onChange={(e: any) => setOrderFilterOptions({ ...orderFilterOptions, price: e.target.value })}
              >
                <MenuItem key={'low'} value={'low'}>Lowest first</MenuItem>
                <MenuItem key={'high'} value={'high'}>Highest first</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Button onClick={() => { setOrderFilterOptions(defaultOrderFilterOptions) }}>Reset</Button>
        </Grid>
        {isLoaded ?
          <Grid item xs={12} sm={12} md={9}>
            {filteredOrders.length > ITEMS_PER_PAGE &&
              <Pagination
                variant="outlined"
                showFirstButton={page !== 1 && page <= pageCount}
                showLastButton={page >= 1 && page !== pageCount}
                color="primary"
                page={page}
                count={pageCount}
                onChange={(e: any, num: number) => setPage(num)}
              />}
            <Stack spacing={1} p={1}>
              {pagedOrders.length > 0 ? pagedOrders?.map((o: DetailedOrder) => (
                <OrderItem order={o} onStatusUpdate={updateStatus} />
              ))
                : <Typography variant="h4">No orders</Typography>}
            </Stack>
          </Grid>
          : (<CircularProgress />)
        }
      </Grid>
    </div >
  )
}
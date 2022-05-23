import {
  Container, Grid,
  Pagination,
  Paper, Stack, Typography
} from "@mui/material"
import { compareAsc, compareDesc } from "date-fns/esm"
import { useEffect, useState } from "react"
import { DetailedOrder, getUserOrders, updateOrderStatus } from "../../api"
import { OrderFilterOptions } from "../../types/OrderFilterOptions"
import { EnhancementDetails } from "../enhancements/EnhancementDetails"
import { CarInfo } from "../rentCars/CarInfo"
import { OrderActions } from "./OrderActions"

const ITEMS_PER_PAGE: number = 3

const defaultOrderFilterOptions: OrderFilterOptions = {
  date: 'desc',
}

export const Orders = () => {
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(0)
  const [pagedOrders, setPagedOrders] = useState<DetailedOrder[]>([])
  const [orders, setOrders] = useState<DetailedOrder[]>([])
  const [filteredOrders, serFilteredOrders] = useState<DetailedOrder[]>([])
  const [orderFilterOptions, setOrderFilterOptions] = useState<OrderFilterOptions>(defaultOrderFilterOptions)

  useEffect(() => {
    getUserOrdersList()
  }, [])

  
  
  useEffect(() => {
    if (page === 1 && page !== pageCount) {
      setPagedOrders(filteredOrders.slice(0, 0 + ITEMS_PER_PAGE))
    }
    if (page === pageCount) {
      setPagedOrders(filteredOrders.slice((page - 1) * ITEMS_PER_PAGE, orders.length))
    }
    if (page !== 1 && page !== pageCount) {
      setPagedOrders(filteredOrders.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE))
    }
  }, [page, filteredOrders])

  useEffect(()=>{
    filterOrders()

  }, [orders, orderFilterOptions])

  const getUserOrdersList = () => {
    getUserOrders()
      .then((res: DetailedOrder[]) => {
        setOrders(res)
        setPageCount(Math.ceil(res?.length / ITEMS_PER_PAGE))
      })
      .catch((error: any) => {
        console.log({ ...error })
      })
  }

  const updateStatus = (orderId: string, statusName: string) => {
    updateOrderStatus(orderId, statusName)
      .then((r: any) => {
        getUserOrdersList()
      })
      .catch((error: any) => {
        console.log({ ...error })
      })
  }

  const filterOrders = () => {
    console.log(orderFilterOptions.date);
    
    let filteredOrdersInternal: DetailedOrder[] = orders
      .sort((a, b) => orderFilterOptions.date == 'asc' ?
        compareAsc(new Date(a.startDate!), new Date(b.startDate!)) :
        compareDesc(new Date(a.startDate!), new Date(b.startDate!))
      )

    if (orderFilterOptions.price !== undefined) {
      filteredOrdersInternal = filteredOrdersInternal
        .sort((a, b) => orderFilterOptions.price === 'low' ?
          a.totalAmount - b.totalAmount :
          b.totalAmount - a.totalAmount
        )
    }

    serFilteredOrders(filteredOrdersInternal)
  }

  return (
    <div>
      <Container sx={{ mt: 1 }}>

        <Pagination
          variant="outlined"
          showFirstButton={page !== 1 && page <= pageCount}
          showLastButton={page >= 1 && page !== pageCount}
          color="primary"
          page={page}
          count={pageCount}
          onChange={(e: any, num: number) => setPage(num)}
        />
        <Stack spacing={1} p={1}>
          {pagedOrders?.map((o: DetailedOrder) => (
            <Paper key={o.orderId} elevation={3}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography>Order id = {o.orderId}</Typography>
                  <Typography>Total amount - {o.totalAmount}</Typography>
                  <Typography>Status - {o.statusName}</Typography>
                  <Typography>Pick up location - {o.pickUpLocation}</Typography>
                  <Typography>Return location - {o.returnLocation}</Typography>
                  <Typography>{new Date(o.startDate!).toLocaleString()}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CarInfo car={o.car} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <EnhancementDetails enhancements={o.enhancements} />
                </Grid>
                <Grid item xs={12}>
                  <OrderActions status={o.statusName} orderId={o.orderId} onClick={updateStatus} />
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>
      </Container>
    </div>
  )
}
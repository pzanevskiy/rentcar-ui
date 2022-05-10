import {
  Container, Grid,
  Pagination,
  Paper, Stack, Typography
} from "@mui/material"
import usePagination from "@mui/material/usePagination/usePagination"
import { useEffect, useState } from "react"
import { DetailedOrder, getUserOrders, Order } from "../../api"
import { CarInfo } from "../rentCars/CarInfo"

const perPage: number = 3

export const Orders = () => {
  const [page, setPage] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(0)
  const [pagedOrders, setPagedOrders] = useState<DetailedOrder[]>([])
  const [orders, setOrders] = useState<DetailedOrder[]>([])

  useEffect(() => {
    getUserOrdersList()
  }, [])

  useEffect(() => {
    if (page === 1 && page !== pageCount) {
      setPagedOrders(orders.slice(0, 0 + perPage))
    }
    if (page === pageCount) {
      setPagedOrders(orders.slice((page - 1) * perPage, orders.length))
    }
    if (page !== 1 && page !== pageCount) {
      setPagedOrders(orders.slice((page - 1) * perPage, page * perPage))
    }
  }, [page, orders])

  const getUserOrdersList = () => {
    getUserOrders()
      .then((res: DetailedOrder[]) => {
        setOrders(res)

        setPageCount(Math.ceil(res?.length / perPage))
        console.log(pageCount);

      })
      .catch((error: any) => {
        console.log({ ...error })
      })
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CarInfo car={o.car} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  {JSON.stringify(o.enhancements)}
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>
      </Container>
    </div>
  )
}
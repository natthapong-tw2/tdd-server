import Big from "big.js"
import { Dayjs } from "dayjs"

export type Expense = {
  fromAccount: string
  note?: string
  amount: Big
  date: Dayjs
}

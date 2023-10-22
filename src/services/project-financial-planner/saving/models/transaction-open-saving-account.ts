import { TransactionType } from "../../models/transaction-type"
import { Dayjs } from "dayjs"
import Big from "big.js"

export type TransactionOpenSavingAccount = {
  type: TransactionType.OpenSavingAccount
  info: {
    name: string
    openAccountDate: Dayjs
    initialAmount: Big
    interestRatePerYear: Big
    interestDate: {
      day: number
      month: number
    }
  }
}

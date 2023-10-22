import { AccountType } from "../../models/account-type"
import { Dayjs } from "dayjs"
import Big from "big.js"

export type SavingAccount = {
  accountType: AccountType.Saving
  name: string
  openAccountDate: Dayjs
  initialAmount: Big
  interestRatePerYear: Big
  interestDate: {
    day: number
    month: number
  }
}

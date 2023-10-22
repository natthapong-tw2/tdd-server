import { AccountType } from "../../models/account-type"
import Big from "big.js"
import dayjs from "dayjs"
import { SavingAccount } from "../models/saving-account"
import { TransactionOpenSavingAccount } from "../models/transaction-open-saving-account"
import { TransactionType } from "../../models/transaction-type"

export const savingAccount: SavingAccount = {
  accountType: AccountType.Saving,
  name: "SCB Main",
  openAccountDate: dayjs("2023-01-01"),
  initialAmount: Big(1000),
  interestRatePerYear: Big("1.1"),
  interestDate: {
    day: 1,
    month: 1,
  },
}
export const transactionOpenSavingAccount = (
  name: string
): TransactionOpenSavingAccount => ({
  type: TransactionType.OpenSavingAccount,
  info: {
    name,
    openAccountDate: dayjs("2023-01-01"),
    initialAmount: Big(1000),
    interestRatePerYear: Big("1.1"),
    interestDate: {
      day: 1,
      month: 1,
    },
  },
})

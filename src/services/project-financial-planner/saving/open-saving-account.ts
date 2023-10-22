import { TransactionOpenSavingAccount } from "./models/transaction-open-saving-account"
import { SavingAccount } from "./models/saving-account"
import { AccountType } from "../models/account-type"

export const openSavingAccount = (
  transactionOpenSavingAccount: TransactionOpenSavingAccount
): SavingAccount => {
  const {
    name,
    openAccountDate,
    initialAmount,
    interestRatePerYear,
    interestDate,
  } = transactionOpenSavingAccount.info
  return {
    accountType: AccountType.Saving,
    name,
    openAccountDate,
    initialAmount,
    interestRatePerYear,
    interestDate,
  }
}

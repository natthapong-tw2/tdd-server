import { TransactionOpenLoanAccount } from "../loan/models/transaction-open-loan-account"
import { TransactionOpenSavingAccount } from "../saving/models/transaction-open-saving-account"

export type Transaction = OpenAccountTransaction

export type OpenAccountTransaction =
  | TransactionOpenLoanAccount
  | TransactionOpenSavingAccount

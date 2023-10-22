import { openLoanAccount } from "./loan/open-loan-account"
import { OpenAccountTransaction } from "./models/transaction"
import { TransactionType } from "./models/transaction-type"
import { openSavingAccount } from "./saving/open-saving-account"

export const openAccount = (openAccountTransaction: OpenAccountTransaction) => {
  if (openAccountTransaction.type === TransactionType.OpenLoanAccount)
    return openLoanAccount(openAccountTransaction)
  return openSavingAccount(openAccountTransaction)
}

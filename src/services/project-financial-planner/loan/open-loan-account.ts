import { LoanAccount, TransactionOpenLoanAccount } from "./models"
import { loanAccount } from "./__mocks__/mocks"

export const openLoanAccount = (
  openLoanAccountTransaction: TransactionOpenLoanAccount
): LoanAccount => {
  return loanAccount
}

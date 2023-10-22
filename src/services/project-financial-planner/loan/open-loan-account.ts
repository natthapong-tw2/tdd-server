import { LoanAccount, TransactionOpenLoanAccount } from "./models"
import { AccountType } from "../account-type"

type OpenLoanAccountResult = {
  account: LoanAccount
}

export const openLoanAccount = (
  openLoanAccountTransaction: TransactionOpenLoanAccount
): OpenLoanAccountResult => {
  return {
    account: {
      accountType: AccountType.Loan,
      name: openLoanAccountTransaction.info.name,
      beginLoanDate: openLoanAccountTransaction.info.beginLoanDate,
      payday: openLoanAccountTransaction.info.payday,
      loanAmount: openLoanAccountTransaction.info.loanAmount,
      interestRatePerYear: openLoanAccountTransaction.info.interestRatePerYear,
      paymentPlan: openLoanAccountTransaction.info.paymentPlan,
    },
  }
}

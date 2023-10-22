import { LoanAccount, TransactionOpenLoanAccount } from "./models"
import { AccountType } from "../account-type"
import { Expense } from "../../project-financial-planner"

type OpenLoanAccountResult = {
  account: LoanAccount
  expenses: Expense[]
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
    expenses: openLoanAccountTransaction.targets.map((target) => ({
      fromAccount: openLoanAccountTransaction.info.name,
      receiverName: target.receiverName,
      amount: target.amount,
      date: target.date,
      note: target.note,
    })),
  }
}

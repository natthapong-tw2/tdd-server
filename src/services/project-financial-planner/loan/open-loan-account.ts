import { LoanAccount, TransactionOpenLoanAccount } from "./models"
import { AccountType } from "../account-type"
import { Expense } from "../../project-financial-planner"
import Big from "big.js"

type OpenLoanAccountResult = {
  account: LoanAccount
  expenses: Expense[]
}

export const openLoanAccount = (
  openLoanAccountTransaction: TransactionOpenLoanAccount
): OpenLoanAccountResult => {
  const loanAmount = openLoanAccountTransaction.info.loanAmount
  const targetSummary = openLoanAccountTransaction.targets.reduce(
    (previous, current) => {
      return previous.add(current.amount)
    },
    Big(0)
  )
  if (!targetSummary.eq(loanAmount)) {
    throw new Error("Summary of loan target is not equal to loan amount")
  }
  return {
    account: {
      accountType: AccountType.Loan,
      name: openLoanAccountTransaction.info.name,
      beginLoanDate: openLoanAccountTransaction.info.beginLoanDate,
      payday: openLoanAccountTransaction.info.payday,
      loanAmount,
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

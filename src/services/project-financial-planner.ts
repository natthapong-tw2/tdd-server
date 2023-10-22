import { AccountType } from "./project-financial-planner/account-type"
import dayjs from "dayjs"
import Big from "big.js"
import { Transaction } from "./project-financial-planner/transaction"
import { LoanPaymentPlanType } from "./project-financial-planner/loan/models"
import { TransactionType } from "./project-financial-planner/transaction-type"

export type IProjectFinancialPlanner = {
  accounts: () => any[]
  monthlyStatements: () => {
    loans: any[]
  }
}

export const ProjectFinancialPlanner = (
  transactions: Transaction[]
): IProjectFinancialPlanner => {
  const accounts = transactions
    .filter(({ type }) => type === TransactionType.OpenLoanAccount)
    .map((openAccountTransaction) => ({
      accountType: AccountType.Loan,
      name: "Co-op",
      beginLoanDate: dayjs("2023-01-01"),
      payday: 3,
      loanAmount: Big(100),
      interestRatePerYear: Big(5),
      paymentPlan: {
        type: LoanPaymentPlanType.FixPrinciple,
        amountPerMonth: Big(100),
      },
    }))

  return {
    accounts: () => accounts,
    monthlyStatements: () => ({
      loans: accounts.map((loanInfo) => ({
        name: loanInfo.name,
        statements: [
          {
            month: 1,
            loanAmount: {
              before: Big(100),
              after: Big(0),
            },
            interestRate: loanInfo.loanAmount
              .mul(loanInfo.interestRatePerYear)
              .div(10)
              .div(12),
            totalPaidInterest: loanInfo.loanAmount
              .mul(loanInfo.interestRatePerYear)
              .div(10)
              .div(12),
          },
        ],
      })),
    }),
  }
}

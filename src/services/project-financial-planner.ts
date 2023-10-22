import Big from "big.js"
import { Transaction } from "./project-financial-planner/models/transaction"
import {
  OpenAccountTransactions,
  TransactionType,
} from "./project-financial-planner/models/transaction-type"
import { openLoanAccount } from "./project-financial-planner/loan/open-loan-account"
import { Expense } from "./project-financial-planner/models/expense"
import { Dayjs } from "dayjs"

export type IProjectFinancialPlanner = {
  accounts: () => any[]
  addTransactions: (transactions: Transaction[]) => IProjectFinancialPlanner
  transactions: () => Transaction[]
  expenses: () => Expense[]
  statements: (statementDate: Dayjs) => {
    loans: any[]
  }
}

export const ProjectFinancialPlanner = (
  transactions: Transaction[]
): IProjectFinancialPlanner => {
  const openAccountResults = transactions
    .filter(({ type }) => OpenAccountTransactions.includes(type))
    .map(openLoanAccount)

  const accounts = openAccountResults.map(
    (openLoanAccountResult) => openLoanAccountResult.account
  )

  return {
    accounts: () => accounts,
    addTransactions: (newTransactions: Transaction[]) =>
      ProjectFinancialPlanner([...transactions, ...newTransactions]),
    transactions: () => transactions,
    expenses: () => openAccountResults.map(({ expenses }) => expenses).flat(),
    statements: (statementDate: Dayjs) => ({
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

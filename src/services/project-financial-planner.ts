import Big from "big.js"
import { Transaction } from "./project-financial-planner/models/transaction"
import { TransactionType } from "./project-financial-planner/models/transaction-type"
import { openLoanAccount } from "./project-financial-planner/loan/open-loan-account"
import { Expense } from "./project-financial-planner/models/expense"

export type IProjectFinancialPlanner = {
  accounts: () => any[]
  addTransactions: (transactions: Transaction[]) => IProjectFinancialPlanner
  transactions: () => Transaction[]
  expenses: () => Expense[]
  statements: () => {
    loans: any[]
  }
}

export const ProjectFinancialPlanner = (
  transactions: Transaction[]
): IProjectFinancialPlanner => {
  const accounts = transactions
    .filter(({ type }) => type === TransactionType.OpenLoanAccount)
    .map(openLoanAccount)
    .map((openLoanAccountResult) => openLoanAccountResult.account)

  return {
    accounts: () => accounts,
    addTransactions: (newTransactions: Transaction[]) =>
      ProjectFinancialPlanner([...transactions, ...newTransactions]),
    transactions: () => transactions,
    expenses: () => [],
    statements: () => ({
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

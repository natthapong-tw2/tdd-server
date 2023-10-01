import {
  AccountType,
  ProjectConfiguration,
} from "./project-financial-planner/models"
import dayjs from "dayjs"
import Big from "big.js"
import { Transaction } from "./project-financial-planner/transaction"
import { LoanPaymentPlanType } from "./project-financial-planner/loan/models"
import { TransactionType } from "./project-financial-planner/transaction-type"

export const ProjectFinancialPlanner = (transactions: Transaction[]) => {
  const configuration: ProjectConfiguration = {
    accounts: [
      {
        name: "Co-op",
        beginLoanDate: dayjs("2023-01-01"),
        payday: 3,
        loanAmount: Big(100),
        interestRatePerYear: Big(5),
        paymentPlan: {
          type: LoanPaymentPlanType.FixPrinciple,
          amountPerMonth: Big(100),
        },
      },
    ],
  }

  const accounts = transactions
    .filter(({ type }) => type === TransactionType.OpenLoanAccount)
    .map((openAccountTransaction) => ({
      accountType: AccountType.Loan,
      name: "Co-op",
      beginLoanDate: dayjs("2023-01-01"),
      payday: 3,
      loanAmount: Big(100),
      interestRatePerYear: 5,
      paymentPlan: {
        type: LoanPaymentPlanType.FixPrinciple,
        amountPerMonth: 100,
      },
    }))

  return {
    accounts: () => accounts,
    monthlyStatements: () => ({
      loans: configuration.accounts.map((loanInfo) => ({
        name: loanInfo.name,
        statements: [
          {
            month: 1,
            loanAmount: {
              before: 100,
              after: 0,
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

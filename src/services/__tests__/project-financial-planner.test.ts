import { describe, it, expect } from "vitest"
import { ProjectFinancialPlanner } from "../project-financial-planner"
import {
  AccountType,
  LoanPaymentPlanType,
  Transaction,
  TransactionType,
} from "../project-financial-planner/models"
import dayjs from "dayjs"
import Big from "big.js"

describe("ProjectFinancialPanner", () => {
  const transactions: Transaction[] = [
    {
      type: TransactionType.OpenLoanAccount,
      info: {
        name: "Co-op",
        beginLoanDate: dayjs("2023-01-01"),
        payday: 3,
        loanAmount: Big(100),
        interestRatePerYear: 5,
        paymentPlan: {
          type: LoanPaymentPlanType.FixPrinciple,
          amountPerMonth: 100,
        },
      },
      date: dayjs("2023-01-01"),
    },
  ]

  const projectFinancialPlanner = ProjectFinancialPlanner(transactions)

  describe("accounts", () => {
    it("should calculate loan account based on create loan account transaction correctly", () => {
      expect(projectFinancialPlanner.accounts()).toEqual([
        {
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
        },
      ])
    })
  })

  describe("monthlyStatements", () => {
    it("should be able to init", () => {
      expect(projectFinancialPlanner.monthlyStatements()).toEqual({
        loans: [
          {
            name: "Co-op",
            statements: [
              {
                month: 1,
                loanAmount: {
                  before: 100,
                  after: 0,
                },
                interestRate: Big(100).mul(5).div(10).div(12),
                totalPaidInterest: Big(100).mul(5).div(10).div(12),
              },
            ],
          },
        ],
      })
    })
  })
})

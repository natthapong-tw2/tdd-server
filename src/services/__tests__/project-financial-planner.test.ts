import { describe, expect, it } from "vitest"
import { ProjectFinancialPlanner } from "../project-financial-planner"
import Big from "big.js"
import { Transaction } from "../project-financial-planner/transaction"
import {
  loanAccount,
  transactionOpenLoanAccount,
} from "../project-financial-planner/loan/__mocks__/mocks"

describe("ProjectFinancialPanner", () => {
  const transactions: Transaction[] = [transactionOpenLoanAccount]

  const projectFinancialPlanner = ProjectFinancialPlanner(transactions)

  describe("accounts", () => {
    it("should calculate loan account based on create loan account transaction correctly", () => {
      expect(projectFinancialPlanner.accounts()).toEqual([loanAccount])
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
                  before: Big(100),
                  after: Big(0),
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

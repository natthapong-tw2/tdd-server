import { describe, expect, it } from "vitest"
import { ProjectFinancialPlanner } from "../project-financial-planner"
import Big from "big.js"
import { Transaction } from "../project-financial-planner/models/transaction"
import {
  loanAccount,
  transactionOpenLoanAccount,
} from "../project-financial-planner/loan/__mocks__/mocks"
import { openLoanAccount } from "../project-financial-planner/loan/open-loan-account"

describe("ProjectFinancialPanner", () => {
  const transactions: Transaction[] = [transactionOpenLoanAccount("Co-op")]

  const projectFinancialPlanner = ProjectFinancialPlanner(transactions)

  describe("addTransactions", () => {
    it("should return new financial planner with new transaction", () => {
      const actual = projectFinancialPlanner.addTransactions([
        transactionOpenLoanAccount("Co-op2"),
      ])

      expect(actual.transactions()).toEqual(
        ProjectFinancialPlanner([
          transactionOpenLoanAccount("Co-op"),
          transactionOpenLoanAccount("Co-op2"),
        ]).transactions()
      )
    })
  })

  describe("accounts", () => {
    it("should calculate loan account based on create loan account transaction correctly", () => {
      expect(projectFinancialPlanner.accounts()).toEqual([loanAccount])
    })
  })

  describe("expenses", () => {
    it("should calculate expense from loan transaction", () => {
      const expenses = projectFinancialPlanner.expenses()

      expect(expenses).toEqual(
        openLoanAccount(transactionOpenLoanAccount("Co-op")).expenses
      )
    })
  })

  describe("statements", () => {
    it("should be able to init", () => {
      expect(projectFinancialPlanner.statements()).toEqual({
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

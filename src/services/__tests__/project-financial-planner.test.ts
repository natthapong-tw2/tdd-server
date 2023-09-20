import { describe, it, expect } from "vitest"
import {
  LoanPaymentPlanType,
  ProjectFinancialPlanner,
} from "../project-financial-planner"

describe("ProjectFinancialPanner", () => {
  describe("monthlyStatements", () => {
    it("should be able to init", () => {
      const projectFinancialPlanner = ProjectFinancialPlanner({
        loanInfo: {
          loanAmount: 100,
          interestRatePerYear: 5,
          paymentPlan: {
            type: LoanPaymentPlanType.FixPrincipal,
            amountPerMonth: 100,
          },
        },
      })

      expect(projectFinancialPlanner.monthlyStatements()).toEqual([
        {
          month: 1,
          loanRemainingAmount: 100,
          loanAfterDeduction: 0,
          interestRate: (100 * 5) / 10 / 12,
          totalPaidInterest: (100 * 5) / 10 / 12,
        },
      ])
    })
  })
})

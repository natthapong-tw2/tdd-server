import { describe, it, expect } from "vitest"
import { ProjectFinancialPlanner } from "../project-financial-planner"
import {
  LoanPaymentPlanType,
  ProjectConfiguration,
} from "../project-financial-planner/models"

describe("ProjectFinancialPanner", () => {
  const configuration: ProjectConfiguration = {
    loanInfo: {
      loanAmount: 100,
      interestRatePerYear: 5,
      paymentPlan: {
        type: LoanPaymentPlanType.FixPrincipal,
        amountPerMonth: 100,
      },
    },
  }

  describe("monthlyStatements", () => {
    it("should be able to init", () => {
      const projectFinancialPlanner = ProjectFinancialPlanner(configuration)

      expect(projectFinancialPlanner.monthlyStatements()).toEqual([
        {
          month: 1,
          loanAmount: {
            before: 100,
            after: 0,
          },
          interestRate: (100 * 5) / 10 / 12,
          totalPaidInterest: (100 * 5) / 10 / 12,
        },
      ])
    })
  })
})

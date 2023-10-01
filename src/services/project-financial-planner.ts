import { ProjectConfiguration } from "./project-financial-planner/models"

export const ProjectFinancialPlanner = (
  configuration: ProjectConfiguration
) => ({
  monthlyStatements: () => ({
    loans: configuration.loans.map((loanInfo) => ({
      name: loanInfo.name,
      statements: [
        {
          month: 1,
          loanAmount: {
            before: 100,
            after: 0,
          },
          interestRate:
            (loanInfo.loanAmount * loanInfo.interestRatePerYear) / 10 / 12,
          totalPaidInterest:
            (loanInfo.loanAmount * loanInfo.interestRatePerYear) / 10 / 12,
        },
      ],
    })),
  }),
})

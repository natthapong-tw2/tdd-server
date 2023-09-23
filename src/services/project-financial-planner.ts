import { ProjectConfiguration } from "./project-financial-planner/models"

export const ProjectFinancialPlanner = (
  configuration: ProjectConfiguration
) => ({
  monthlyStatements: () => [
    {
      month: 1,
      loanAmount: {
        before: 100,
        after: 0,
      },
      interestRate:
        (configuration.loanInfo.loanAmount *
          configuration.loanInfo.interestRatePerYear) /
        10 /
        12,
      totalPaidInterest:
        (configuration.loanInfo.loanAmount *
          configuration.loanInfo.interestRatePerYear) /
        10 /
        12,
    },
  ],
})

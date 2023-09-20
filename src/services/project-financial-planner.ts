type ProjectConfiguration = {
  loanInfo: {
    loanAmount: 100
    interestRatePerYear: 5
    paymentPlan: PaymentPlan
  }
}

export enum LoanPaymentPlanType {
  FixPrincipal = "fix-principal",
}

export type PaymentPlan = FixPrincipalPlan

export type FixPrincipalPlan = {
  type: LoanPaymentPlanType.FixPrincipal
  amountPerMonth: number
}

export const ProjectFinancialPlanner = (
  configuration: ProjectConfiguration
) => ({
  monthlyStatements: () => [
    {
      month: 1,
      loanRemainingAmount: 100,
      loanAfterDeduction: 0,
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

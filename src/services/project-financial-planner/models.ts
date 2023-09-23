export type ProjectConfiguration = {
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

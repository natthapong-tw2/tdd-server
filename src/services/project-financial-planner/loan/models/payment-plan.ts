import Big from "big.js"

export enum LoanPaymentPlanType {
  FixPrinciple = "fix-principle",
}

export type FixPrinciplePlan = {
  type: LoanPaymentPlanType.FixPrinciple
  amountPerMonth: Big
}

export type PaymentPlan = FixPrinciplePlan

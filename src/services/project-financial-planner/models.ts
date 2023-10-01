import { Dayjs } from "dayjs"

export type LoanInfo = {
  name: "Co-op"
  beginLoanDate: Dayjs
  payday: number
  loanAmount: 100
  interestRatePerYear: 5
  paymentPlan: PaymentPlan
}

export type ProjectConfiguration = {
  loans: LoanInfo[]
}

export enum LoanPaymentPlanType {
  FixPrincipal = "fix-principal",
}

export type PaymentPlan = FixPrincipalPlan
export type FixPrincipalPlan = {
  type: LoanPaymentPlanType.FixPrincipal
  amountPerMonth: number
}

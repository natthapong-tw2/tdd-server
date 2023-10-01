import { Dayjs } from "dayjs"
import Big from "big.js"

export type LoanInfo = {
  name: string
  beginLoanDate: Dayjs
  payday: number
  loanAmount: Big
  interestRatePerYear: 5
  paymentPlan: PaymentPlan
}

export type ProjectConfiguration = {
  loans: LoanInfo[]
}

export enum LoanPaymentPlanType {
  FixPrinciple = "fix-principle",
}

export type PaymentPlan = FixPrinciplePlan
export type FixPrinciplePlan = {
  type: LoanPaymentPlanType.FixPrinciple
  amountPerMonth: number
}

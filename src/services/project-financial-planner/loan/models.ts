import { Dayjs } from "dayjs"
import Big from "big.js"
import { TransactionType } from "../transaction-type"

export enum LoanPaymentPlanType {
  FixPrinciple = "fix-principle",
}

export type TransactionOpenLoanAccount = {
  type: TransactionType.OpenLoanAccount
  info: {
    name: "Co-op"
    beginLoanDate: Dayjs
    payday: number
    loanAmount: Big
    interestRatePerYear: Big
    paymentPlan: {
      type: LoanPaymentPlanType
      amountPerMonth: Big
    }
  }
  date: Dayjs
}

export type FixPrinciplePlan = {
  type: LoanPaymentPlanType.FixPrinciple
  amountPerMonth: Big
}

export type PaymentPlan = FixPrinciplePlan

export type LoanInfo = {
  name: string
  beginLoanDate: Dayjs
  payday: number
  loanAmount: Big
  interestRatePerYear: Big
  paymentPlan: PaymentPlan
}

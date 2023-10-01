import dayjs, { Dayjs } from "dayjs"
import Big from "big.js"

export type LoanInfo = {
  name: string
  beginLoanDate: Dayjs
  payday: number
  loanAmount: Big
  interestRatePerYear: Big
  paymentPlan: PaymentPlan
}

export type ProjectConfiguration = {
  loans: LoanInfo[]
}

export enum LoanPaymentPlanType {
  FixPrinciple = "fix-principle",
}

export enum AccountType {
  Loan = "loan",
}

export type PaymentPlan = FixPrinciplePlan
export type FixPrinciplePlan = {
  type: LoanPaymentPlanType.FixPrinciple
  amountPerMonth: number
}

export enum TransactionType {
  OpenLoanAccount = "open-loan-account",
}

export type Transaction = TransactionOpenLoanAccount

export type TransactionOpenLoanAccount = {
  type: TransactionType.OpenLoanAccount
  info: {
    name: "Co-op"
    beginLoanDate: Dayjs
    payday: number
    loanAmount: Big
    interestRatePerYear: number
    paymentPlan: {
      type: LoanPaymentPlanType
      amountPerMonth: number
    }
  }
  date: Dayjs
}

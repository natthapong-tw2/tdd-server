import { Dayjs } from "dayjs"
import Big from "big.js"
import { TransactionType } from "../transaction-type"
import { AccountType } from "../account-type"

export enum LoanPaymentPlanType {
  FixPrinciple = "fix-principle",
}

export type Target = {
  name: string
  amount: Big
  date: Dayjs
  note?: string
}

export type TransactionOpenLoanAccount = {
  type: TransactionType.OpenLoanAccount
  info: {
    name: string
    beginLoanDate: Dayjs
    payday: number
    loanAmount: Big
    interestRatePerYear: Big
    paymentPlan: {
      type: LoanPaymentPlanType
      amountPerMonth: Big
    }
  }
  targets: Target[]
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

export type LoanAccount = {
  accountType: AccountType.Loan
  name: string
  beginLoanDate: Dayjs
  payday: number
  loanAmount: Big
  interestRatePerYear: Big
  paymentPlan: PaymentPlan
}

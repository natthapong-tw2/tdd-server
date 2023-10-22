import { TransactionType } from "../../models/transaction-type"
import { Dayjs } from "dayjs"
import Big from "big.js"
import { LoanPaymentPlanType } from "./payment-plan"

export type Target = {
  receiverName: string
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

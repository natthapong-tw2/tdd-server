import { AccountType } from "../../models/account-type"
import { Dayjs } from "dayjs"
import Big from "big.js"
import { PaymentPlan } from "./payment-plan"

export type LoanAccount = {
  accountType: AccountType.Loan
  name: string
  beginLoanDate: Dayjs
  payday: number
  loanAmount: Big
  interestRatePerYear: Big
  paymentPlan: PaymentPlan
}

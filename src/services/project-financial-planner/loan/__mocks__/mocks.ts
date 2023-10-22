import { TransactionType } from "../../transaction-type"
import dayjs from "dayjs"
import Big from "big.js"
import {
  LoanAccount,
  LoanPaymentPlanType,
  TransactionOpenLoanAccount,
} from "../models"
import { AccountType } from "../../account-type"

export const transactionOpenLoanAccount: TransactionOpenLoanAccount = {
  type: TransactionType.OpenLoanAccount,
  info: {
    name: "Co-op",
    beginLoanDate: dayjs("2023-01-01"),
    payday: 3,
    loanAmount: Big(100),
    interestRatePerYear: Big(5),
    paymentPlan: {
      type: LoanPaymentPlanType.FixPrinciple,
      amountPerMonth: Big(100),
    },
  },
  date: dayjs("2023-01-01"),
}

export const loanAccount: LoanAccount = {
  accountType: AccountType.Loan,
  name: "Co-op",
  beginLoanDate: dayjs("2023-01-01"),
  payday: 3,
  loanAmount: Big(100),
  interestRatePerYear: Big(5),
  paymentPlan: {
    type: LoanPaymentPlanType.FixPrinciple,
    amountPerMonth: Big(100),
  },
}

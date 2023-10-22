import { describe, it, expect } from "vitest"
import { openLoanAccount } from "../open-loan-account"
import { TransactionType } from "../../transaction-type"
import dayjs from "dayjs"
import Big from "big.js"
import { LoanPaymentPlanType } from "../models"
import { AccountType } from "../../account-type"

describe("openLoanAccount", () => {
  it("should return initial loan account from transaction", () => {
    const actual = openLoanAccount({
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
      targets: [
        {
          amount: Big(100),
          date: dayjs("2023-01-01"),
          name: "Pa Dang",
          note: "Previous landlord",
        },
      ],
      date: dayjs("2023-01-01"),
    })

    expect(actual.account).toEqual({
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
    })
  })
})

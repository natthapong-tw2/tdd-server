import { describe, it, expect } from "vitest"
import { openLoanAccount } from "../open-loan-account"
import { loanAccount, transactionOpenLoanAccount } from "../__mocks__/mocks"
import Big from "big.js"
import dayjs from "dayjs"

describe("openLoanAccount", () => {
  it("should throw error when loan target is not equal to loan amount", () => {
    const transaction = transactionOpenLoanAccount("Co-op")
    expect(() =>
      openLoanAccount({
        ...transaction,
        targets: [{ ...transaction.targets[0], amount: Big(10) }],
      })
    ).toThrow(new Error("Summary of loan target is not equal to loan amount"))
  })

  it("should return initial loan account from transaction", () => {
    const actual = openLoanAccount(transactionOpenLoanAccount("Co-op"))

    expect(actual.account).toEqual(loanAccount)
  })

  it("should return initial expenses from transaction", () => {
    const actual = openLoanAccount(transactionOpenLoanAccount("Co-op"))

    expect(actual.expenses).toEqual([
      {
        fromAccount: "Co-op",
        receiverName: "Pa Dang",
        amount: Big(100),
        date: dayjs("2023-01-01"),
        note: "Previous landlord",
      },
    ])
  })
})

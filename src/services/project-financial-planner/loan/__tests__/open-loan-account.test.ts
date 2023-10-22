import { describe, it, expect } from "vitest"
import { loanAccount, transactionOpenLoanAccount } from "../__mocks__/mocks"
import { openLoanAccount } from "../open-loan-account"

describe("openLoanAccount", () => {
  it("should return initial loan account from transaction", () => {
    const actual = openLoanAccount(transactionOpenLoanAccount)

    expect(actual).toEqual(loanAccount)
  })
})

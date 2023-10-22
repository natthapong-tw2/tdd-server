import { describe, it, expect } from "vitest"
import { transactionOpenLoanAccount } from "../loan/__mocks__/loan"
import { openLoanAccount } from "../loan/open-loan-account"
import { openAccount } from "../open-account"
import { transactionOpenSavingAccount } from "../saving/__mocks__/saving"
import { openSavingAccount } from "../saving/open-saving-account"

describe("openAccount", () => {
  it("should open loan account when accept open loan account transaction", () => {
    const transaction = transactionOpenLoanAccount("Co-op")
    const actual = openAccount(transaction)

    expect(actual).toEqual(openLoanAccount(transaction))
  })

  it("should open saving account when accept open saving account transaction", () => {
    const transaction = transactionOpenSavingAccount("Scb Main")
    const actual = openAccount(transaction)

    expect(actual).toEqual(openSavingAccount(transaction))
  })
})

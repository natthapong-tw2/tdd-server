import { describe, it, expect } from "vitest"
import { openSavingAccount } from "../open-saving-account"
import {
  savingAccount,
  transactionOpenSavingAccount,
} from "../__mocks__/saving"

describe("openSavingAccount", () => {
  it("should return initial saving account from transaction", () => {
    const actual = openSavingAccount(transactionOpenSavingAccount("SCB Main"))

    expect(actual).toEqual(savingAccount)
  })
})

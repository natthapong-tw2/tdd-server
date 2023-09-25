import { describe, it, expect } from "vitest"
import { LoanPaymentPlanType, ProjectConfiguration } from "../models"
import {
  calculateInterest,
  calculateMonthly,
  nextPaymentDate,
  numberOfDaysOfYear,
  Thb,
} from "../operations"
import Big from "big.js"
import dayjs from "dayjs"

describe("Operations", () => {
  const configuration: ProjectConfiguration = {
    loanInfo: {
      beginLoanDate: dayjs("2023-01-01"),
      payday: 1,
      loanAmount: 100,
      interestRatePerYear: 5,
      paymentPlan: {
        type: LoanPaymentPlanType.FixPrincipal,
        amountPerMonth: 100,
      },
    },
  }
  describe("calculateMonthly", () => {
    it("should calculate for first month", () => {
      const actual = calculateMonthly([], configuration)

      expect(actual).toEqual([
        {
          month: 1,
          payDate: dayjs("2023-02-01"),
          loanAmount: {
            before: Thb(Big(100)),
            after: Thb(Big(0)),
          },
          interest: Big(123),
          totalPaidInterest: Big(123),
        },
      ])
    })
  })

  describe("calculateInterest", () => {
    it("should calculate interest correctly", () => {
      const lastPaymentDate = dayjs("2023-01-15")
      const currentDate = dayjs("2023-02-15")
      const interestRate = Big(5)
      const principal = Big(36500)
      const actual = calculateInterest({
        lastPaymentDate,
        currentDate,
        interestRate,
        principal,
      })

      const expected = principal
        .mul(interestRate)
        .mul(currentDate.diff(lastPaymentDate, "days"))
        .div(100)
        .div(numberOfDaysOfYear(lastPaymentDate))

      expect(actual).toEqual(expected)
    })
  })

  describe("numberOfDaysOfYear", () => {
    it("should tell number of days non leap year", () => {
      const actual = numberOfDaysOfYear(dayjs("2023-01-23"))

      expect(actual).toEqual(365)
    })

    it("should tell number of days leap year", () => {
      const actual = numberOfDaysOfYear(dayjs("2024-01-23"))

      expect(actual).toEqual(366)
    })
  })

  describe("nextPaymentDate", () => {
    it("should return next month if date is the same as payday", () => {
      const refDate = dayjs("2023-01-01")
      const actual = nextPaymentDate(refDate, 1)

      expect(actual).toEqual(dayjs("2023-02-01"))
    })

    it("should return next day if ref date before payday in the same month", () => {
      const refDate = dayjs("2023-01-01")
      const actual = nextPaymentDate(refDate, 2)

      expect(actual).toEqual(dayjs("2023-01-02"))
    })

    it("should return next 2 days if ref date 2 days before pay day for 2 days", () => {
      const refDate = dayjs("2023-01-01")
      const actual = nextPaymentDate(refDate, 3)

      expect(actual).toEqual(dayjs("2023-01-03"))
    })

    it("should return next month pay date if ref date after payday and next month payday", () => {
      const refDate = dayjs("2023-01-04")
      const actual = nextPaymentDate(refDate, 3)

      expect(actual).toEqual(dayjs("2023-02-03"))
    })
  })
})

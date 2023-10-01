import { describe, it, expect } from "vitest"
import { LoanPaymentPlanType, ProjectConfiguration } from "../models"
import {
  beginOfNextYear,
  calculateInterest,
  calculateMonthly,
  endOfYear,
  interestRateCondition,
  nextPaymentDate,
  numberOfDaysOfYear,
  Thb,
} from "../operations"
import Big from "big.js"
import dayjs from "dayjs"

describe("Operations", () => {
  const configuration: ProjectConfiguration = {
    loans: [
      {
        name: "Co-op",
        beginLoanDate: dayjs("2023-01-01"),
        payday: 1,
        loanAmount: Big(100),
        interestRatePerYear: 5,
        paymentPlan: {
          type: LoanPaymentPlanType.FixPrinciple,
          amountPerMonth: 100,
        },
      },
    ],
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
    it("should calculate interest same year correctly", () => {
      const lastPaymentDate = dayjs("2023-01-15")
      const currentDate = dayjs("2023-02-15")
      const interestRate = Big(5)
      const principle = Big(36500)
      const actual = calculateInterest({
        lastPaymentDate,
        currentDate,
        interestRate,
        principle,
      })

      const expected = principle
        .mul(interestRate)
        .mul(currentDate.diff(lastPaymentDate, "days"))
        .div(100)
        .div(numberOfDaysOfYear(lastPaymentDate))

      console.log({ expected })
      expect(actual).toEqual(expected)
    })

    it("should calculate interest with different year correctly", () => {
      const lastPaymentDate = dayjs("2022-12-15")
      const currentDate = dayjs("2023-01-15")

      const actual = calculateInterest({
        lastPaymentDate,
        currentDate,
        interestRate: Big(5),
        principle: Big(36500),
      })

      expect(actual).toEqual(Big("155"))
    })

    it("should calculate interest with across leap year", () => {
      const lastPaymentDate = dayjs("2023-12-15")
      const currentDate = dayjs("2024-01-15")
      const principle = Big(36500)
      const interestRate = Big(5)

      const actual = calculateInterest({
        lastPaymentDate,
        currentDate,
        interestRate,
        principle,
      })

      const interestCondition = interestRateCondition(
        lastPaymentDate,
        currentDate
      )
      const totalInterest = interestCondition.reduce((total, current) => {
        const { duration, daysInYear } = current

        const currentYearInterest = principle
          .mul(interestRate)
          .mul(duration)
          .div(100)
          .div(daysInYear)
        return total.add(currentYearInterest)
      }, Big(0))

      expect(actual).toEqual(totalInterest)
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

    it("should return next year if ref date is last month of the year", () => {
      const refDate = dayjs("2023-12-04")
      const actual = nextPaymentDate(refDate, 3)

      expect(actual).toEqual(dayjs("2024-01-03"))
    })
  })

  describe("interestRateCondition", () => {
    it("should throw error when beginDate is after endDate", () => {
      expect(() =>
        interestRateCondition(dayjs("2023-01-01"), dayjs("2022-01-02"))
      ).toThrow("Begin date must before end date")
    })
    it("should return 1 condition when both dates are from same year", () => {
      const beginDate = dayjs("2023-01-03")
      const endDate = dayjs("2023-01-05")
      const actual = interestRateCondition(beginDate, endDate)

      expect(actual).toEqual([
        { duration: 2, daysInYear: numberOfDaysOfYear(beginDate) },
      ])
    })

    it("should return 2 conditions when both dates are from different years", () => {
      const beginDate = dayjs("2023-12-28")
      const endDate = dayjs("2024-01-03")
      const actual = interestRateCondition(beginDate, endDate)

      expect(actual).toEqual([
        { duration: 3, daysInYear: numberOfDaysOfYear(beginDate) },
        { duration: 3, daysInYear: numberOfDaysOfYear(endDate) },
      ])
    })

    it("should return 3 conditions when both dates are from different years", () => {
      const beginDate = dayjs("2023-12-28")
      const endDate = dayjs("2025-01-03")
      const actual = interestRateCondition(beginDate, endDate)

      expect(actual).toEqual([
        { duration: 3, daysInYear: numberOfDaysOfYear(beginDate) },
        { duration: 366, daysInYear: numberOfDaysOfYear(dayjs("2024-01-01")) },
        { duration: 3, daysInYear: numberOfDaysOfYear(endDate) },
      ])
    })

    describe("dateSet experiment", () => {
      it("should calculate end date of year correctly", () => {
        const refDate = dayjs("2023-12-28")
        const endOfYearDate = endOfYear(refDate)

        expect(endOfYearDate).toEqual(dayjs("2023-12-31"))
      })

      it("should calculate begin of next year correctly", () => {
        const refDate = dayjs("2023-12-28")
        const actual = beginOfNextYear(refDate)

        expect(actual).toEqual(dayjs("2024-01-01"))
      })

      it("should be true if the same year", () => {
        const refDate = dayjs("2023-12-28")
        const refDate2 = dayjs("2023-12-28")

        expect(refDate.get("years")).toEqual(refDate2.get("years"))
      })
    })
  })
})

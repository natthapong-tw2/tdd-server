import { ProjectConfiguration } from "./models"
import Big from "big.js"
import dayjs, { Dayjs } from "dayjs"

export enum Currency {
  Thb = "thb",
}

type Money = {
  amount: Big
  currency: Currency
}

type DaysInYear = 365 | 366

export const Thb = (amount: Big): Money => ({
  amount,
  currency: Currency.Thb,
})

type MonthlyStatement = {
  month: number
  payDate: Dayjs
  loanAmount: {
    before: Money
    after: Money
  }
  interest: Big
  totalPaidInterest: Big
}

export const calculateMonthly = (
  previousMonths: MonthlyStatement[],
  configuration: ProjectConfiguration
): MonthlyStatement[] => [
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
]

type InterestCalculationInput = {
  lastPaymentDate: Dayjs
  currentDate: Dayjs
  interestRate: Big
  principal: Big
}

export const calculateInterest = ({
  lastPaymentDate,
  currentDate,
  interestRate,
  principal,
}: InterestCalculationInput): Big => {
  return interestRateCondition(lastPaymentDate, currentDate).reduce(
    (total, current) => {
      const { duration, daysInYear } = current
      return total.add(
        principal.mul(interestRate).mul(duration).div(100).div(daysInYear)
      )
    },
    Big(0)
  )
}

export const numberOfDaysOfYear = (day: Dayjs): DaysInYear => {
  const thisYear = day.get("year")
  const beginDateNextYear = dayjs(`${thisYear + 1}-01-01`)
  const beginDateThisYear = dayjs(`${thisYear}-01-01`)
  return beginDateNextYear.diff(beginDateThisYear, "days") === 365 ? 365 : 366
}

export const nextPaymentDate = (refDate: Dayjs, payday: number) => {
  if (refDate.date() < payday) {
    return refDate.set("dates", payday)
  }
  if (refDate.date() > payday) {
    return refDate.set("dates", payday).set("months", refDate.get("months") + 1)
  }
  return refDate.set("months", refDate.get("months") + 1)
}

export const interestRateCondition = (
  beginDate: Dayjs,
  endDate: Dayjs,
  includeFirstDayOfYear: boolean = false
): { duration: number; daysInYear: DaysInYear }[] => {
  if (beginDate.isAfter(endDate)) {
    throw new Error("Begin date must before end date")
  }
  const isSameYear = beginDate.get("years") === endDate.get("years")
  if (isSameYear) {
    return [
      {
        duration:
          endDate.diff(beginDate, "days") + (includeFirstDayOfYear ? 1 : 0),
        daysInYear: numberOfDaysOfYear(beginDate),
      },
    ]
  }

  return [
    {
      duration:
        endOfYear(beginDate).diff(beginDate, "days") +
        (includeFirstDayOfYear ? 1 : 0),
      daysInYear: numberOfDaysOfYear(beginDate),
    },
    ...interestRateCondition(beginOfNextYear(beginDate), endDate, true),
  ]
}

export const endOfYear = (refDate: Dayjs) =>
  dayjs(`${refDate.get("years")}-12-31`)

export const beginOfNextYear = (refDate: Dayjs) =>
  dayjs(`${refDate.get("years") + 1}-01-01`)

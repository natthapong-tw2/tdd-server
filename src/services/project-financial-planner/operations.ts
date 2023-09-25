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
}: InterestCalculationInput): Big =>
  principal
    .mul(interestRate)
    .mul(currentDate.diff(lastPaymentDate, "days"))
    .div(100)
    .div(numberOfDaysOfYear(lastPaymentDate))

export const numberOfDaysOfYear = (day: Dayjs): number => {
  const thisYear = day.get("year")
  const beginDateNextYear = dayjs(`${thisYear + 1}-01-01`)
  const beginDateThisYear = dayjs(`${thisYear}-01-01`)
  return beginDateNextYear.diff(beginDateThisYear, "days")
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

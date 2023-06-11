import { Range } from "./models/range"
import { IncomeOptions } from "./models/income-options"
import { RangeApplicator } from "./range-applicator"

type IBenefitCalculator = IncomeOptions & {
  calculateTotalIncomePerYear: () => Range
  calculateTax: (taxCalculator: (income: number) => number) => Range
}

export const BenefitCalculator = (options: IncomeOptions): IBenefitCalculator => {
  const { bonusMultiplierRange, monthlySalary } = options

  const calculateTotalIncomePerYear = () =>
    RangeApplicator(bonusMultiplierRange || { min: 0, max: 0 })
      .map((bonusInMonth) => bonusInMonth + 12)
      .map((totalMonth) => totalMonth * monthlySalary)

  return {
    ...options,
    calculateTotalIncomePerYear: () => calculateTotalIncomePerYear().get(),
    calculateTax: (taxCalculator: (income: number) => number): Range =>
      calculateTotalIncomePerYear().map(taxCalculator).get(),
  }
}

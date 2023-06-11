import { BenefitCalculator } from "../benefit-calculator"
import { describe, it, expect, vi } from "vitest"

describe("BenefitCalculator", () => {
  const monthlySalary = 10000
  const bonusMultiplierRange = {
    min: 3,
    max: 5,
  }

  it("should be able to refer back to options", () => {
    const actual = BenefitCalculator({
      monthlySalary,
    })

    expect(actual.monthlySalary).toEqual(monthlySalary)
  })

  it("should allow with bonus options", () => {
    const actual = BenefitCalculator({
      monthlySalary,
      bonusMultiplierRange,
    })

    expect(actual.bonusMultiplierRange).toEqual(bonusMultiplierRange)
  })

  it("should be able to calculate total income per year", async () => {
    const actual = BenefitCalculator({
      monthlySalary,
    }).calculateTotalIncomePerYear()

    expect(actual).toEqual({
      min: 120000,
      max: 120000,
    })
  })

  it("should be able to calculate total income with bonus", () => {
    const actual = BenefitCalculator({
      monthlySalary,
      bonusMultiplierRange,
    }).calculateTotalIncomePerYear()

    expect(actual).toEqual({
      min: 150000,
      max: 170000,
    })
  })

  it("should be able to calculate tax", () => {
    const taxCalculator = vi.fn().mockReturnValue(1000)

    const actual = BenefitCalculator({
      monthlySalary,
      bonusMultiplierRange,
    }).calculateTax(taxCalculator)

    expect(actual).toEqual({
      min: 1000,
      max: 1000,
    })
  })
})

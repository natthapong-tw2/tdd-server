import {TaxCalculator, TaxLadder} from "../tax-calculator"
import {describe, it, expect} from "vitest";

describe("TaxCalculator", () => {
  const taxLadders: TaxLadder[] = [
    { ceiling: 150000, rate: 0 },
    { ceiling: 300000, rate: 5 },
    { ceiling: 500000, rate: 10 },
    { ceiling: 750000, rate: 15 },
    { ceiling: 1000000, rate: 20 },
    { ceiling: 2000000, rate: 25 },
    { ceiling: 5000000, rate: 30 },
  ]

  const taxCalculator = TaxCalculator({ taxLadders, maxRate: 35 })

  describe("withIncome", () => {
    it("should return 0 when income is less than 150000", () => {
      const actual = taxCalculator.withIncome(60000)

      expect(actual).toEqual(0)
    })

    it("should return 7500 when income is 300000", () => {
      const actual = taxCalculator.withIncome(300000)

      expect(actual).toEqual(7500)
    })

    it("should return 27500 when income is 500000", () => {
      const actual = taxCalculator.withIncome(500000)

      expect(actual).toEqual(27500)
    })

    it("should help me calculate", () => {
      const currentMonthlyIncome = 10000

      const calculateExpectSalaryFactor = (currentMonthlyIncome: number) => {
        const providentFund = currentMonthlyIncome * 0.15
        const currentMonthlyIncomeWithProvidentFund = currentMonthlyIncome + providentFund

        const monthlyIncome = currentMonthlyIncomeWithProvidentFund * 1.3;
        const annualIncome = monthlyIncome*12;
        const tax = taxCalculator.withIncome(annualIncome)

        return {
          tax,
          afterTax: annualIncome - tax,
          monthlyIncome,
          annualIncome,
          currentMonthlyIncomeWithProvidentFund
        };
      }

      const result = calculateExpectSalaryFactor(currentMonthlyIncome)
      console.log(result)
    })
  })
})
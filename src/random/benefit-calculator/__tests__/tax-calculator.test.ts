import {TaxCalculator, TaxLadder} from "../tax-calculator"

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
  })
})
export type TaxLadder = {
  ceiling: number
  rate: number
}

export type CalculatedTaxLadder = TaxLadder & { start: number }

export type TaxCalculatorOptions = {
  taxLadders: TaxLadder[]
  maxRate: number
}

export const TaxCalculator = (options: TaxCalculatorOptions) => {
  const highToLowCalculatedTaxLadder = options.taxLadders
    .reduce((calculated: CalculatedTaxLadder[], current) => {
      const previous = calculated.length == 0 ? undefined : calculated[calculated.length - 1]
      return [
        ...calculated,
        previous === undefined ? { ...current, start: 0 } : { ...current, start: previous.ceiling },
      ]
    }, [] as CalculatedTaxLadder[])
    .reverse()

  return {
    withIncome: (income: number) => {
      const { ceiling: topLadderCeiling } = highToLowCalculatedTaxLadder[0]
      const exceedLadderIncome = income > topLadderCeiling ? income - topLadderCeiling : 0
      const maxRateTaxAmount = (exceedLadderIncome * options.maxRate) / 100
      const remainingIncomeAfterMaxRate = income - exceedLadderIncome

      return highToLowCalculatedTaxLadder.reduce(
        (accumulated, currentLadder) => {
          const { remainingIncome, accumulatedTax } = accumulated
          const { start, rate } = currentLadder
          const taxAbleAmount = remainingIncome > start ? remainingIncome - start : 0
          return {
            remainingIncome: remainingIncome - taxAbleAmount,
            accumulatedTax: accumulatedTax + (taxAbleAmount * rate) / 100,
          }
        },
        { remainingIncome: remainingIncomeAfterMaxRate, accumulatedTax: maxRateTaxAmount }
      ).accumulatedTax
    },
  }
}

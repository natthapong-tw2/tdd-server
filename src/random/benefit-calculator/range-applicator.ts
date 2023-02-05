import {Range} from "./models/range"

export type IRangeApplicator = {
  map: (calculator: (input: number) => number) => IRangeApplicator,
  get: () => Range
}

export const RangeApplicator = (benefitRange: Range): IRangeApplicator => ({
  map: (calculator: (input: number) => number) => RangeApplicator({
    min: calculator(benefitRange.min),
    max: calculator(benefitRange.max),
  }),
  get: () => benefitRange
})
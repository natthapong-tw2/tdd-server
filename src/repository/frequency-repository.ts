import { Frequency } from "../models/frequency"

export const FrequencyRepository = (): IFrequencyRepository => ({
  getWeeklyFrequency: () => ({
    times: 10,
    period: "week",
  }),
  getMonthlyFrequency: () => ({
    times: 10,
    period: "month",
  }),
})

export type IFrequencyRepository = {
  getWeeklyFrequency: () => Frequency
  getMonthlyFrequency: () => Frequency
}

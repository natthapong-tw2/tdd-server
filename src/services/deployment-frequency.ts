import { IFrequencyRepository } from "../repository/frequency-repository"
import { Frequency } from "../models/frequency"

export const getFrequency = (
  frequencyRepository: IFrequencyRepository,
  period: any
): Frequency => {
  return period === "week"
    ? frequencyRepository.getWeeklyFrequency()
    : frequencyRepository.getMonthlyFrequency()
}

import { LoanInfo } from "./loan/models"

export type ProjectConfiguration = {
  accounts: LoanInfo[]
}

export enum AccountType {
  Loan = "loan",
}

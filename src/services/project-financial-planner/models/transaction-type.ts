export enum TransactionType {
  OpenLoanAccount = "open-loan-account",
  OpenSavingAccount = "open-saving-account",
}

export const OpenAccountTransactions: TransactionType[] = [
  TransactionType.OpenLoanAccount,
  TransactionType.OpenSavingAccount,
]

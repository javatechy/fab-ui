/**
 * Common Response mapper class for all backend responses.
 */
export class CustomResponse {

  constructor(public user?: User, public users?: User[], public balance?: Balance, public status?: string,
              public error?: Error, public transactions?: Transaction[]) {
  }
}

export interface User {
  role?: string;
  balance?: Number;
  userName?: string;
  password?: string;
  userId?: string;
  createdOn ?: FDate;
  updatedOn ?: FDate;
}

export interface Transaction {
  transactionId?: string;
  oldBalance?: Number;
  newBalance?: string;
  walletBalance?: string;
  userId?: string;
  transactionType ?: string;
  transactionAmount?: number;
  createdOn ?: FDate;
}

export interface FDate {
  hour?: Number;
  minute?: Number;
  second?: Number;
  dayOfMonth?: Number;
  year?: Number;
  monthValue?: Number;
}

export interface Balance {
  balance?: Number;
}

export interface Error {
  status?: string;
  message?: string;
}


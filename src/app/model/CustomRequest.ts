/**
 * Common Request for all HTTP calls
 */
export class CustomRequest {
  constructor(public userName?: string, public password?: string, public amount?: number,
              public transactionType?: string, public userId?: number) {
  }
}

/**
 * Price class
 * This class represents a Price object
 */

export class Price {
  constructor(currency, amount, decimals) {
    this.currency = currency;
    this.amount = amount;
    this.decimals = decimals;
  }
}

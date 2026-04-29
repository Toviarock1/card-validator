export class CardService {
  public validateCardNumber(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\D/g, "");

    let sum = 0;
    let isSecond = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let d = parseInt(digits[i], 10);

      if (isSecond) {
        d *= 2;
        if (d > 9) d -= 9;
      }

      sum += d;
      isSecond = !isSecond;
    }

    return sum % 10 === 0;
  }

  public getCardType(cardNumber: string): string {
    if (cardNumber.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(cardNumber)) return "Mastercard";
    return "Unknown";
  }
}

export const cardService = new CardService();

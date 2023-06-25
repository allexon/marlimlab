export default function fnUsdToBrCoin(value: string): string {
    const number = parseFloat(value);
    if (isNaN(number)) {
      return "";
    }
    return number.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
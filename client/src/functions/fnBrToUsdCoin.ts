export default function fnBrToUsdCoin(value: string): string {
    const number = parseFloat(value);
    if (isNaN(number)) {
      return "";
    }
    return number.toLocaleString("en-US", {
      //style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
export default function currencyFormat(number, currency = "VND") {
  const amount = number ?? 0;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

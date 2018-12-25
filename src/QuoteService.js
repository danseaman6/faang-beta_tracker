import wretch from "wretch";

export const getStockQuote = () => {
  return wretch(
    `https://api.iextrading.com/1.0/stock/market/batch?symbols=fb,aapl,amzn,nflx,goog,spy&types=quote`
  )
    .get()
    .json();
};

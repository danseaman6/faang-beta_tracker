import wretch from "wretch";

const API_KEY = "LN4ETII6SQ67LZXH";

export const getStockQuote = ticker => {
  return wretch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${API_KEY}`
  )
    .get()
    .json();
};

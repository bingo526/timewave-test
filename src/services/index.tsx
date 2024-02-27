export const getPrice = async () => {
  const response = await fetch(
    "https://app.astroport.fi/api/trpc/charts.prices?input=%7B%22json%22%3A%7B%22tokens%22%3A%5B%22ibc%2FC4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9%22%2C%22untrn%22%5D%2C%22chainId%22%3A%22neutron-1%22%2C%22dateRange%22%3A%22D7%22%7D%7D"
  );
  const data = await response.json();
  return data;
};

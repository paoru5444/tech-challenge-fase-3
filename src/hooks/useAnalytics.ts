import { useCallback, useState } from "react";
import { monthNames } from "../screens/transactions/constants";
import { Transaction, TransactionType } from "../screens/transactions/models";
import useTransactions from "./useTransactions";

const getMonths = (transactions: Transaction[]) => {
  const months = transactions.map((transaction) => {
    return transaction.date.split("-")[1];
  });

  const monthsSet = new Set(months);

  return Array.from(monthsSet);
};

export default function useAnalytics() {
  const { getTransactions } = useTransactions();

  const [chartData, setChartData] = useState([]);

  const getCharData = useCallback(
    async (type: TransactionType) => {
      const transactions = await getTransactions();

      const months = getMonths(transactions);

      const item = months.sort().map((month) => {
        const count = transactions.reduce((acc, item) => {
          const itemMonth = item.date.split("-")[1];
          const itemAmount = parseFloat(item.amount);
          const hasMatchCategory = item.type === type;

          if (
            itemMonth === month &&
            !!itemAmount &&
            (hasMatchCategory || type === "all")
          ) {
            return acc + itemAmount;
          }

          return acc;
        }, 0);

        return {
          label: monthNames[parseInt(month) - 1],
          value: count,
        };
      });

      setChartData([...item]);
    },
    [getTransactions],
  );

  return {
    chartData,
    getCharData,
  };
}

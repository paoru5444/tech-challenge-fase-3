import { useMemo } from "react";
import { monthNames } from "../screens/transactions/constants";
import { Transaction } from "../screens/transactions/models";

const getMonths = (transactions: Transaction[]) => {
  const months = transactions.map((transaction) => {
    return transaction.date.split("-")[1];
  });

  const monthsSet = new Set(months);

  return Array.from(monthsSet);
};

export default function useAnalytics({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const chartData = useMemo(() => {
    const months = getMonths(transactions);

    const item = months.sort().map((month) => {
      const count = transactions.reduce((acc, item) => {
        const itemMonth = item.date.split("-")[1];
        const itemAmount = parseFloat(item.amount);

        if (itemMonth === month && !!itemAmount) {
          return acc + itemAmount;
        }

        return acc;
      }, 0);

      return {
        label: monthNames[parseInt(month) - 1],
        value: count,
      };
    });

    return item;
  }, [transactions]);

  return {
    chartData,
  };
}

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

type ChartData =
  | {
      label: string;
      value: number;
    }
  | [];

export default function useAnalytics() {
  const { getTransactions } = useTransactions();

  const [chartData, setChartData] = useState<ChartData[]>([]);

  const getCharData = useCallback(
    async (type: TransactionType) => {
      try {
        const transactions = await getTransactions();

        if (!transactions) {
          throw new Error("Erro ao buscar transactions");
        }

        const months = getMonths(transactions);

        const item: ChartData[] =
          months.sort().map((month) => {
            const count = transactions.reduce(
              (acc: number, item: Transaction) => {
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
              },
              0,
            );

            return {
              label: monthNames[parseInt(month) - 1],
              value: count,
            };
          }) || [];

        setChartData([...item]);
      } catch (error) {
        console.log("Error: ", error);
      }
    },
    [getTransactions],
  );

  return {
    chartData,
    getCharData,
  };
}

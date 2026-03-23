import { useMemo } from "react";
import { Transaction } from "../screens/transactions/models";

const useBalance = ({ transactions }: { transactions: Transaction[] }) => {
  const totalBalance = useMemo(() => {
    return transactions.reduce((acc, item) => {
      if (!item.amount) {
        return acc;
      }

      if (item.type !== "deposit") {
        return acc - parseFloat(item.amount);
      }

      return acc + parseFloat(item.amount);
    }, 0);
  }, [transactions]).toFixed(2);

  return { totalBalance };
};

export default useBalance;

import useBalance from "@/src/hooks/useBalance";
import useTransactions from "@/src/hooks/useTransactions";
import React, { useEffect } from "react";
import { useTransactionsContext } from "../../transactions/context/transactionsContext";
import Home from "../components/home";
import { goToTransactionsForm, openTypesBottomSheet } from "../navigation";

export default function HomeScreen() {
  const { transactions, getTransactions, lastTransactions } = useTransactions();
  const { totalBalance } = useBalance({ transactions });
  const { selectedType, chartData, fetchChartData } = useTransactionsContext();

  useEffect(() => {
    fetchChartData(selectedType);
    getTransactions();
  }, []);

  return (
    <Home
      goToTransactionsForm={goToTransactionsForm}
      totalBalance={totalBalance}
      chartData={chartData}
      openTypesBottomSheet={openTypesBottomSheet}
      selectedType={selectedType}
      lastTransactions={lastTransactions}
    />
  );
}

import useAnalytics from "@/src/hooks/useAnalytics";
import React, { createContext, useContext, useState } from "react";
import { CategoryType, TransactionType } from "../models";

interface TransactionsContextType {
  selectedCategory: { key: string; value: string };
  selectedDate: string;
  handleSelectedCategory: (category: CategoryType) => void;
  handleSelectedDate: (date: string) => void;
  selectedType: TransactionType;
  handleSelectedType: (type: TransactionType) => void;
  chartData: any;
  fetchChartData: (type: TransactionType) => void;
  resetDate: () => void;
  resetCategory: () => void;
}

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export function useTransactionsContext() {
  const context = useContext(TransactionsContext);

  if (context === null) {
    throw new Error(
      "useTransactionsContext must be used within a TransactionsProvider",
    );
  }

  return context;
}

export function TransactionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState({
    key: "",
    value: "",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState(TransactionType.ALL);
  const { chartData, getCharData } = useAnalytics();

  function fetchChartData(type: TransactionType) {
    getCharData(type);
  }

  function handleSelectedCategory(category: CategoryType) {
    setSelectedCategory(category);
  }

  function handleSelectedDate(date: string) {
    setSelectedDate(date);
  }

  function handleSelectedType(type: TransactionType) {
    fetchChartData(type);
    setSelectedType(type);
  }

  function resetDate() {
    setSelectedDate(new Date());
  }

  function resetCategory() {
    setSelectedCategory({
      key: "",
      value: "",
    });
  }

  return (
    <TransactionsContext.Provider
      value={{
        selectedCategory,
        handleSelectedCategory,
        selectedDate,
        handleSelectedDate,
        selectedType,
        handleSelectedType,
        chartData,
        fetchChartData,
        resetDate,
        resetCategory,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

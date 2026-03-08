import React, { createContext, useContext, useState } from "react";
import { CategoryType } from "../models";

interface TransactionsContextType {
  selectedCategory: { key: string; value: string };
  selectedDate: string;
  handleSelectedCategory: (category: CategoryType) => void;
  handleSelectedDate: (date: string) => void;
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

  const [selectedDate, setSelectedDate] = useState("");

  function handleSelectedCategory(category: CategoryType) {
    setSelectedCategory(category);
  }

  function handleSelectedDate(date: string) {
    setSelectedDate(date);
  }

  return (
    <TransactionsContext.Provider
      value={{
        selectedCategory,
        handleSelectedCategory,
        selectedDate,
        handleSelectedDate,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

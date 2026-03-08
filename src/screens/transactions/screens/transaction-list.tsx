import useTransactions, { Transaction } from "@/src/hooks/useTransactions";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import TransactionsListComponent from "../components/transaction-list";
import { FORM_MODE, TransactionType } from "../models";

export default function TransactionsListScreen() {
  const { filterTransactions, transactions } = useTransactions();
  const [search, setSearch] = useState("");
  const [type, setType] = useState(TransactionType.ALL);
  const { category, month, year } = useLocalSearchParams();

  useEffect(() => {
    filterTransactions({ category, month, year });
  }, [category, month, year]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleActiveTransactionFilter = (value: TransactionType) => {
    setType(value);
  };

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    return transactions.filter((transaction) => {
      const matchSearch = transaction.description
        .toLowerCase()
        .includes(normalizedSearch);

      const matchType =
        type === TransactionType.ALL ? true : transaction.type === type;

      return matchSearch && matchType;
    });
  }, [transactions, search, type]);

  const onPressTransaction = (item: Transaction) => {
    router.push({
      pathname: "/transactions/form",
      params: {
        ...item,
        mode: FORM_MODE.VIEW,
      },
    });
  };

  return (
    <TransactionsListComponent
      search={search}
      handleSearchChange={handleSearchChange}
      transactions={filteredTransactions}
      handleActiveTransactionFilter={handleActiveTransactionFilter}
      onPressTransaction={onPressTransaction}
    />
  );
}

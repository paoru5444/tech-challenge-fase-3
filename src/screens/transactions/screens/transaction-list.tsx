import useTransactions, { Transaction } from "@/src/hooks/useTransactions";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import TransactionsListComponent from "../components/transaction-list";
import { TRANSACTIONS_PER_PAGE } from "../constants";
import { FORM_MODE, TransactionType } from "../models";

export default function TransactionsListScreen() {
  const { filterTransactions, transactions, perScroll, setPerScroll, loading } =
    useTransactions();
  const [search, setSearch] = useState("");
  const [type, setType] = useState(TransactionType.ALL);
  const { category, month, year } = useLocalSearchParams();
  const [badgeActive, setBadgeActive] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    filterTransactions({ category, month, year });
  }, [category, month, year, perScroll]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleActiveTransactionFilter = (value: TransactionType) => {
    setBadgeActive(value);
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
        categoryKey: item.category.key,
        categoryValue: item.category.value,
        mode: FORM_MODE.VIEW,
      },
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    try {
      filterTransactions({ category, month, year });
    } finally {
      setRefreshing(false);
    }
  }, [category, month, year]);

  const onEndReached = () => {
    if (perScroll > transactions.length && transactions.length !== 0) return;

    setPerScroll((prev: number) => prev + TRANSACTIONS_PER_PAGE);
  };

  return (
    <TransactionsListComponent
      search={search}
      handleSearchChange={handleSearchChange}
      transactions={filteredTransactions}
      handleActiveTransactionFilter={handleActiveTransactionFilter}
      onPressTransaction={onPressTransaction}
      type={type}
      setBadgeActive={setBadgeActive}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      loading={loading}
    />
  );
}

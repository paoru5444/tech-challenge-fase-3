import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { db } from "../firebase/config";
import { FormDataProps, Transaction } from "../screens/transactions/models";

const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionMonths, setTransactionMonths] = useState([]);
  const [transactionYears, setTransactionYears] = useState([]);

  const transactionRef = user
    ? collection(db, "users", user?.uid ?? "", "transactions")
    : null;

  const getTransactions = async () => {
    if (!transactionRef) return;

    try {
      const response = await getDocs(query(transactionRef));
      const docs = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(docs);

      return docs;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const addTransactions = async (data: any) => {
    if (!transactionRef) return;

    try {
      const response = await addDoc(transactionRef, {
        ...data,
        // date: Timestamp.fromDate(new Date(data.date)),
      });

      await getTransactions();

      console.log("Transferência adicionada com sucesso: ", response);
    } catch (error) {
      console.log(
        error instanceof Error
          ? error.message
          : "Failed to add category: " + error,
      );
    }
  };

  const deleteTransaction = async (transactionId: string) => {
    await deleteDoc(
      doc(db, "users", user?.uid ?? "", "transactions", transactionId),
    );
    await getTransactions();
  };

  const updateTransaction = async (
    transactionId: string,
    transaction: FormDataProps,
  ) => {
    await updateDoc(
      doc(db, "users", user?.uid ?? "", "transactions", transactionId),
      transaction,
    );
    await getTransactions();
  };

  const getTransactionsYearsAndMonths = async () => {
    try {
      const months = [];
      const years = [];

      const transactionList = await getTransactions();

      transactionList?.forEach((transaction) => {
        const month = transaction.date.split("-")[1];
        const year = transaction.date.split("-")[0];

        months.push(month);
        years.push(year);
      });

      const orderedMonths = Array.from(new Set([...months].sort()));
      const orderedYears = Array.from(new Set([...years].sort()));

      setTransactionMonths(orderedMonths);
      setTransactionYears(orderedYears);
    } catch (error) {}
  };

  const filterTransactions = async ({
    year,
    month,
    category,
  }: {
    year: string;
    month: string;
    category: string;
  }) => {
    const queries = [];

    if (year && month) {
      const monthPadded = String(month).padStart(2, "0");
      const start = `${year}-${monthPadded}-01`;
      const end = `${year}-${monthPadded}-31`;
      queries.push(where("date", ">=", start));
      queries.push(where("date", "<=", end));
    } else if (year) {
      const start = `${year}-01-01`;
      const end = `${year}-12-31`;
      queries.push(where("date", ">=", start));
      queries.push(where("date", "<=", end));
    }

    if (category) {
      queries.push(where("category.key", "==", category));
    }

    const response = await getDocs(
      query(
        transactionRef,
        ...queries,
        // where("date", ">=", Timestamp.fromDate(start)),
        // where("date", "<=", Timestamp.fromDate(end)),
        // where("category.key", "==", category),
        // orderBy("date", "desc"),
      ),
    );
    const docs = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTransactions(docs);
  };

  return {
    getTransactions,
    addTransactions,
    transactions,
    deleteTransaction,
    updateTransaction,
    getTransactionsYearsAndMonths,
    transactionMonths,
    transactionYears,
    filterTransactions,
  };
};

export default useTransactions;

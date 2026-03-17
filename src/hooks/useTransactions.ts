import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { db } from "../firebase/config";
import { TRANSACTIONS_PER_PAGE } from "../screens/transactions/constants";
import { FormDataProps, Transaction } from "../screens/transactions/models";
import { useUpload } from "./useUploadFile";

const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionMonths, setTransactionMonths] = useState([]);
  const [transactionYears, setTransactionYears] = useState([]);
  const [perScroll, setPerScroll] = useState(TRANSACTIONS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const { uploadFile } = useUpload();

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

  const addTransactions = async (data: any, file: any, blob: any) => {
    if (!transactionRef) return;

    const transactionDoc = doc(transactionRef);

    try {
      const transactionId = transactionDoc?.id;

      const payload = { ...data };

      if (file && blob) {
        const { url } = await uploadFile({ transactionId, file, blob });

        payload.fileUrl = url;
        payload.fileName = file?.name;
      }

      const response = await setDoc(transactionDoc, {
        ...payload,
        // date: Timestamp.fromDate(new Date(data.date)),
      });

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
  };

  const updateTransaction = async (
    transactionId: string,
    transaction: FormDataProps,
  ) => {
    await updateDoc(
      doc(db, "users", user?.uid ?? "", "transactions", transactionId),
      transaction,
    );
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
    year?: string;
    month?: string;
    category?: string;
  }) => {
    try {
      setLoading(true);

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
        query(transactionRef, limit(perScroll), ...queries),
      );
      const docs = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(docs);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
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
    perScroll,
    setPerScroll,
    setLoading,
    loading,
  };
};

export default useTransactions;

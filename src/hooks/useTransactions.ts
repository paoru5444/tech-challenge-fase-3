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
import { useMemo, useState } from "react";
import { useAuth } from "../context/auth.context";
import { db } from "../firebase/config";
import { TRANSACTIONS_PER_PAGE } from "../screens/transactions/constants";
import { FormDataProps, Transaction } from "../screens/transactions/models";
import { useUpload } from "./useUploadFile";

const useTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionMonths, setTransactionMonths] = useState<string[] | []>([]);
  const [transactionYears, setTransactionYears] = useState<string[] | []>([]);
  const [perScroll, setPerScroll] = useState(TRANSACTIONS_PER_PAGE);
  const [loading, setLoading] = useState(true);

  const { uploadFile } = useUpload();

  const transactionRef = user
    ? collection(db, "users", user?.uid ?? "", "transactions")
    : null;

  const getTransactions = async (): Promise<Transaction[] | undefined> => {
    if (!transactionRef) return;

    setLoading(true);

    try {
      const response = await getDocs(query(transactionRef));
      const docs: Transaction[] = response.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Transaction, "id">),
      }));
      setTransactions(docs);
      setLoading(false);
      return docs;
    } catch (error) {
      setLoading(false);
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
        const uploadedFile = await uploadFile({ transactionId, file, blob });

        payload.fileUrl = uploadedFile?.url;
        payload.fileName = file?.name;
      }

      const response = await setDoc(transactionDoc, {
        ...payload,
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

  const deleteTransaction = async (transactionId?: string) => {
    try {
      if (!transactionId) {
        throw new Error("TransactionId recebido é inválido");
      }

      await deleteDoc(
        doc(db, "users", user?.uid ?? "", "transactions", transactionId),
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const updateTransaction = async (
    transactionId?: string,
    transaction?: FormDataProps,
    file?: any,
    blob?: any,
  ) => {
    try {
      if (!transactionId || !transaction) {
        throw new Error("TransactionId ou Transação recebidos são inválidos");
      }

      const payload = { ...transaction };

      if (file && blob) {
        const uploadedFile = await uploadFile({ transactionId, file, blob });

        payload.fileUrl = uploadedFile?.url;
        payload.fileName = file?.name;
      }

      await updateDoc(
        doc(db, "users", user?.uid ?? "", "transactions", transactionId),
        { ...payload },
      );
    } catch (error) {}
  };

  const getTransactionsYearsAndMonths = async () => {
    try {
      const months: string[] = [];
      const years: string[] = [];

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
    } catch (error) {
      console.log("Error: ", error);
    }
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

      if (!transactionRef) {
        setLoading(false);
        throw new Error("Falha ao configurar o transactionRef");
      }

      const response = await getDocs(
        query(transactionRef, limit(perScroll), ...queries),
      );
      const docs: Transaction[] = response.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Transaction, "id">),
      }));

      setTransactions([...docs]);
      setLoading(false);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const lastTransactions = useMemo(() => {
    return transactions.slice(0, 3);
  }, [transactions]);

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
    lastTransactions,
  };
};

export default useTransactions;

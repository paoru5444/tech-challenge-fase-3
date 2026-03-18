import useTransactions from "@/src/hooks/useTransactions";
import { useUpload } from "@/src/hooks/useUploadFile";
import { formInSchema } from "@/src/schemas/transaction-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import TransactionForm from "../components/transaction-form";
import { FORM_TYPES } from "../constants";
import { useTransactionsContext } from "../context/transactionsContext";
import {
  FormDataProps,
  onCreateTransaction,
  onUpdateTransaction,
  TransactionFormScreenLocalSearchParams,
} from "../models";

export default function TransactionFormScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const { getFile, file, blob } = useUpload();
  const { selectedCategory, selectedDate } = useTransactionsContext();
  const { addTransactions, deleteTransaction, updateTransaction } =
    useTransactions();
  const localSearchParams =
    useLocalSearchParams<TransactionFormScreenLocalSearchParams>();

  const type = localSearchParams.type ?? "deposit";
  const isReadOnly = localSearchParams?.mode === "view";

  const formType = FORM_TYPES[type];

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormDataProps>({
    resolver: zodResolver(formInSchema),
    defaultValues: {
      amount: localSearchParams?.amount || "",
      description: localSearchParams?.description || "",
      date: localSearchParams?.date || "",
      category: {
        key: localSearchParams?.categoryKey || "",
        value: localSearchParams?.categoryValue || "",
      },
    },
  });

  useEffect(() => {
    const category = !selectedCategory.key
      ? {
          key: localSearchParams?.categoryKey || "",
          value: localSearchParams?.categoryValue || "",
        }
      : selectedCategory;

    const date = selectedDate || localSearchParams?.date || "";

    setValue("category", category);
    setValue("date", date);
  }, [
    localSearchParams?.categoryKey,
    localSearchParams?.categoryValue,
    localSearchParams?.date,
    selectedCategory,
    selectedDate,
  ]);

  const onCreate = (data: onCreateTransaction) => {
    Keyboard.dismiss();
    console.log("onCreate data: ", data);

    addTransactions(
      {
        ...data,
        type: localSearchParams.type,
      },
      file,
      blob,
    );

    router.replace("/transactions/list");
  };

  const onDelete = () => {
    deleteTransaction(localSearchParams.id);
    router.replace("/transactions/list");
  };

  const onUpdate = (data: onUpdateTransaction) => {
    Keyboard.dismiss();
    updateTransaction(localSearchParams.id, data);
    router.replace("/transactions/list");
  };

  const openCategoryBottomSheet = () => {
    router.push("/categories-bottom-sheet");
  };

  const openCalendarBottomSheet = () => {
    router.push("/calendar-bottom-sheet");
  };

  const handleGetFile = () => {
    getFile();
  };

  const pageTitle = {
    create: "Registrar nova\n" + formType.navbarLabel,
    update: "Atualizar\n" + formType.navbarLabel,
  };

  return (
    <TransactionForm
      localSearchParams={localSearchParams}
      onCreate={handleSubmit(onCreate)}
      onUpdate={handleSubmit(onUpdate)}
      onDelete={onDelete}
      formType={formType}
      openCategoryBottomSheet={openCategoryBottomSheet}
      openCalendarBottomSheet={openCalendarBottomSheet}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      control={control}
      errors={errors}
      setValue={setValue}
      isSubmitting={isSubmitting}
      pageTitle={pageTitle[isEditing ? "update" : "create"]}
      handleGetFile={handleGetFile}
      file={file}
      isReadOnly={isReadOnly}
    />
  );
}

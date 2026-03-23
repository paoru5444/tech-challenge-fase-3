import useTransactions from "@/src/hooks/useTransactions";
import { useUpload } from "@/src/hooks/useUploadFile";
import { formInSchema } from "@/src/schemas/transaction-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
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
  const { selectedCategory, selectedDate, resetDate, resetCategory } =
    useTransactionsContext();
  const { addTransactions, deleteTransaction, updateTransaction } =
    useTransactions();
  const localSearchParams =
    useLocalSearchParams<TransactionFormScreenLocalSearchParams>();
  const [isReadOnly, setIsReadOnly] = useState(localSearchParams?.mode === "view");

  const type = localSearchParams.type ?? "deposit";

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

    addTransactions(
      {
        ...data,
        type: localSearchParams.type,
      },
      file,
      blob,
    );

    resetCategory();
    resetDate();

    router.replace("/(app)/(tabs)");
  };

  const onDelete = () => {
    deleteTransaction(localSearchParams.id);
    router.replace("/(app)/(tabs)/transactions-list");
  };

  const onUpdate = (data: onUpdateTransaction) => {
    Keyboard.dismiss();
    updateTransaction(localSearchParams.id, data);
    router.replace("/(app)/(tabs)/transactions-list");
  };

  const openCategoryBottomSheet = () => {
    resetCategory();
    router.push("/categories-bottom-sheet");
  };

  const openCalendarBottomSheet = () => {
    resetDate();
    router.push("/calendar-bottom-sheet");
  };

  const handleGetFile = () => {
    getFile();
  };

  const pageTitleOptions = {
    create: "Registrar nova\n" + formType.navbarLabel,
    update: "Atualizar\n" + formType.navbarLabel,
    view: "Detalhes da\n" + formType.navbarLabel,
  };

  const pageTitle = useMemo(() => {
    console.log("isReadOnly: ", isReadOnly);
    if (isReadOnly) {
      return pageTitleOptions["view"];
    } else if (isEditing) {
      return pageTitleOptions["update"];
    } else {
      return pageTitleOptions["create"];
    }
  }, [isEditing, isReadOnly, pageTitleOptions]);

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
      setIsReadOnly={setIsReadOnly}
      control={control}
      errors={errors}
      setValue={setValue}
      isSubmitting={isSubmitting}
      pageTitle={pageTitle}
      handleGetFile={handleGetFile}
      file={file}
      isReadOnly={isReadOnly}
    />
  );
}

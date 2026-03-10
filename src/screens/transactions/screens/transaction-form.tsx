import useTransactions from "@/src/hooks/useTransactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import * as z from "zod";
import TransactionForm from "../components/transaction-form";
import { FORM_TYPES } from "../constants";
import { useTransactionsContext } from "../context/transactionsContext";
import { CategoryType, CurrentForm, FormDataProps } from "../models";

export const formInSchema = z.object({
  amount: z.string().min(1, "O valor deve ser preenchido"),
  description: z
    .string()
    .min(1, "Descrição deve ser preenchda")
    .max(20, "Limite de caracteres excedido"),
  date: z.string().min(1, "Selecione uma data"),
  category: z.object({
    key: z.string().min(1, "Selecione uma categoria"),
    value: z.string().min(1, "Selecione uma categoria"),
  }),
});

export type FormData = z.infer<typeof formInSchema>;

export default function TransactionFormScreen() {
  const { selectedCategory, selectedDate } = useTransactionsContext();
  const {
    addTransactions,
    deleteTransaction,
    updateTransaction,
    filterTransactions,
  } = useTransactions();
  const currentForm = useLocalSearchParams<CurrentForm>();
  const formType = FORM_TYPES[currentForm.type];
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormDataProps>({
    amount: currentForm?.amount || "",
    description: currentForm?.description || "",
    date: currentForm?.date || "",
    category: currentForm?.category || { key: "", value: "" },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formInSchema),
    defaultValues: {
      amount: currentForm?.amount || "",
      description: currentForm?.description || "",
      date: currentForm?.date || "",
      category: {
        key: currentForm?.categoryKey || "",
        value: currentForm?.categoryValue || "",
      },
    },
  });

  const handleInputChange = (key: string, value: string | CategoryType) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    console.log("currentForm: ", currentForm);
    const category = !selectedCategory.key
      ? {
          key: currentForm?.categoryKey || "",
          value: currentForm?.categoryValue || "",
        }
      : selectedCategory;

    console.log("category: ", category);

    console.log("selectedCategory: ", selectedCategory);
    setValue("category", category);
    setValue("date", selectedDate || currentForm?.date);
  }, [selectedCategory, selectedDate]);

  const onCreate = (data) => {
    Keyboard.dismiss();

    addTransactions({
      ...data,
      type: currentForm.type,
    });

    router.replace("/transactions/list");
  };

  const onDelete = () => {
    deleteTransaction(currentForm.id);
    router.replace("/transactions/list");
  };

  const onUpdate = (data) => {
    Keyboard.dismiss();
    console.log("data: ", data);
    updateTransaction(currentForm.id, data);
    router.replace("/transactions/list");
  };

  const openCategoryBottomSheet = () => {
    router.push("/categories-bottom-sheet");
  };

  const openCalendarBottomSheet = () => {
    router.push("/calendar-bottom-sheet");
  };

  const pageTitle = {
    create: "Registrar nova\n" + formType.navbarLabel,
    update: "Atualizar\n" + formType.navbarLabel,
  };

  return (
    <TransactionForm
      handleInputChange={handleInputChange}
      formData={formData}
      currentForm={currentForm}
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
    />
  );
}

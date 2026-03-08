import useTransactions from "@/src/hooks/useTransactions";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import TransactionForm from "../components/transaction-form";
import { FORM_TYPES } from "../constants";
import { useTransactionsContext } from "../context/transactionsContext";
import { CategoryType, CurrentForm, FormDataProps } from "../models";

export default function TransactionFormScreen() {
  const { selectedCategory, selectedDate } = useTransactionsContext();
  const { addTransactions, deleteTransaction, updateTransaction } =
    useTransactions();
  const currentForm = useLocalSearchParams<CurrentForm>();
  const formType = FORM_TYPES[currentForm.type];
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormDataProps>({
    amount: currentForm?.amount || "",
    description: currentForm?.description || "",
    date: currentForm?.date || "",
    category: currentForm?.category || { key: "", value: "" },
  });

  const handleInputChange = (key: string, value: string | CategoryType) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    handleInputChange("category", selectedCategory);
    handleInputChange("date", selectedDate);
  }, [selectedCategory, selectedDate]);

  const onCreate = () => {
    addTransactions({
      ...formData,
      category: selectedCategory,
      type: currentForm.type,
    });
  };

  const onDelete = () => {
    deleteTransaction(currentForm.id);
  };

  const onUpdate = () => {
    updateTransaction(currentForm.id, formData);
  };

  const openCategoryBottomSheet = () => {
    router.push("/categories-bottom-sheet");
  };

  const openCalendarBottomSheet = () => {
    router.push("/calendar-bottom-sheet");
  };

  return (
    <TransactionForm
      handleInputChange={handleInputChange}
      formData={formData}
      currentForm={currentForm}
      onCreate={onCreate}
      onUpdate={onUpdate}
      onDelete={onDelete}
      formType={formType}
      openCategoryBottomSheet={openCategoryBottomSheet}
      openCalendarBottomSheet={openCalendarBottomSheet}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
    />
  );
}

import Navbar from "@/src/components/shared/navbar";
import Button from "@/src/components/ui/button";
import { View } from "react-native";

import { router } from "expo-router";
import React from "react";
import { INPUT_FIELDS } from "../constants";
import { FORM_MODE, TransactionFormProps } from "../models";
import TrasactionForm from "./form";

export default function TransactionForm({
  handleInputChange,
  currentForm,
  formData,
  onCreate,
  onUpdate,
  onDelete,
  formType,
  openCategoryBottomSheet,
  openCalendarBottomSheet,
  isEditing,
  setIsEditing,
}: TransactionFormProps) {
  return (
    <View
      style={{ justifyContent: "space-between", flex: 1, paddingBottom: 40 }}
    >
      <Navbar title={formType.navbarLabel} />

      <TrasactionForm
        fields={INPUT_FIELDS}
        handleInputChange={handleInputChange}
        headerImage={formType.image}
        disableFields={currentForm.mode === FORM_MODE.VIEW && !isEditing}
        formData={formData}
        openCategoryBottomSheet={openCategoryBottomSheet}
        openCalendarBottomSheet={openCalendarBottomSheet}
      />

      {currentForm.mode === FORM_MODE.CREATE && (
        <View style={{ paddingHorizontal: 16 }}>
          <Button
            onPress={() => {
              onCreate();
              router.back();
            }}
            label={formType.actionLabel}
          />
        </View>
      )}

      {currentForm.mode === FORM_MODE.UPDATE && (
        <View style={{ paddingHorizontal: 16 }}>
          <Button
            onPress={() => {
              onUpdate();
              router.back();
            }}
            label={formType.actionLabel}
          />
        </View>
      )}

      {currentForm.mode === FORM_MODE.VIEW && (
        <View style={{ paddingHorizontal: 16, gap: 8 }}>
          <Button
            onPress={() => {
              if (!isEditing) {
                setIsEditing(true);
              } else {
                onUpdate();
                router.back();
              }
            }}
            label={"Update"}
          />

          <Button
            onPress={() => {
              if (isEditing) {
                setIsEditing(false);
              } else {
                onDelete();
                router.back();
              }
            }}
            label={isEditing ? "Cancelar" : "Delete"}
            style={{ backgroundColor: "red" }}
          />
        </View>
      )}
    </View>
  );
}

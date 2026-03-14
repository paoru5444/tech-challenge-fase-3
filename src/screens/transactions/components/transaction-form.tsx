import Navbar from "@/src/components/shared/navbar";
import Button from "@/src/components/ui/button";
import { View } from "react-native";

import ElipsesBackground from "@/src/components/shared/elipses-background";
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
  control,
  errors,
  setValue,
  isSubmitting,
  pageTitle,
  handleGetFile,
  file,
  isReadOnly,
}: TransactionFormProps) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        flex: 1,
        paddingBottom: 40,
        paddingHorizontal: 22,
        backgroundColor: "#FDFDFD",
        // gap: 32,
      }}
    >
      <ElipsesBackground />

      <Navbar />

      <TrasactionForm
        fields={INPUT_FIELDS}
        handleInputChange={handleInputChange}
        headerImage={formType.image}
        pageTitle={pageTitle}
        disableFields={currentForm.mode === FORM_MODE.VIEW && !isEditing}
        formData={formData}
        openCategoryBottomSheet={openCategoryBottomSheet}
        openCalendarBottomSheet={openCalendarBottomSheet}
        control={control}
        errors={errors}
        setValue={setValue}
        isEditing={isEditing}
        handleGetFile={handleGetFile}
        file={file}
        isReadOnly={isReadOnly}
        currentForm={currentForm}
      />

      {currentForm.mode === FORM_MODE.CREATE && (
        <Button onPress={onCreate} label={"Salvar"} disabled={isSubmitting} />
      )}

      {currentForm.mode === FORM_MODE.UPDATE && (
        <Button
          onPress={() => {
            onUpdate();
            router.back();
          }}
          label={"Salvar"}
          disabled={isSubmitting}
        />
      )}

      {currentForm.mode === FORM_MODE.VIEW && (
        <View style={{ gap: 8 }}>
          <Button
            onPress={() => {
              if (!isEditing) {
                setIsEditing(true);
              } else {
                onUpdate();
              }
            }}
            label={isEditing ? "Salvar" : "Atualizar"}
            disabled={isSubmitting}
          />

          <Button
            onPress={() => {
              if (isEditing) {
                setIsEditing(false);
              } else {
                onDelete();
              }
            }}
            label={isEditing ? "Cancelar" : "Deletar"}
            style={{ backgroundColor: "red" }}
            disabled={isSubmitting}
          />
        </View>
      )}
    </View>
  );
}

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
  localSearchParams,
  onCreate,
  onUpdate,
  onDelete,
  formType,
  openCategoryBottomSheet,
  openCalendarBottomSheet,
  isEditing,
  setIsEditing,
  setIsReadOnly,
  control,
  errors,
  isSubmitting,
  pageTitle,
  handleGetFile,
  file,
  isReadOnly,
  loading,
}: TransactionFormProps) {
  return (
    <View
      style={{
        justifyContent: "space-between",
        flex: 1,
        paddingBottom: 40,
        paddingHorizontal: 22,
        backgroundColor: "#FDFDFD",
      }}
    >
      <ElipsesBackground />

      <Navbar />

      <TrasactionForm
        fields={INPUT_FIELDS}
        headerImage={formType.image}
        pageTitle={pageTitle}
        disableFields={localSearchParams?.mode === FORM_MODE.VIEW && !isEditing}
        openCategoryBottomSheet={openCategoryBottomSheet}
        openCalendarBottomSheet={openCalendarBottomSheet}
        control={control}
        errors={errors}
        handleGetFile={handleGetFile}
        file={file}
        isReadOnly={isReadOnly}
        isEditing={isEditing}
        localSearchParams={localSearchParams}
      />

      {localSearchParams?.mode === FORM_MODE.CREATE && (
        <Button
          onPress={onCreate}
          label={"Salvar"}
          disabled={isSubmitting || loading}
          isLoading={loading}
        />
      )}

      {localSearchParams?.mode === FORM_MODE.UPDATE && (
        <Button
          onPress={() => {
            onUpdate();
            router.back();
          }}
          label={"Salvar"}
          disabled={isSubmitting || loading}
          isLoading={loading}
        />
      )}

      {localSearchParams?.mode === FORM_MODE.VIEW && (
        <View style={{ gap: 8 }}>
          <Button
            onPress={() => {
              if (!isEditing) {
                setIsEditing(true);
                setIsReadOnly(false);
              } else {
                onUpdate();
              }
            }}
            label={isEditing ? "Salvar" : "Atualizar"}
            disabled={isSubmitting || loading}
            isLoading={loading}
          />

          <Button
            onPress={() => {
              if (isEditing) {
                setIsEditing(false);
                setIsReadOnly(true);
              } else {
                onDelete();
              }
            }}
            label={isEditing ? "Cancelar" : "Deletar"}
            style={{ backgroundColor: "#F06480" }}
            disabled={isSubmitting || loading}
            isLoading={loading}
          />
        </View>
      )}
    </View>
  );
}
